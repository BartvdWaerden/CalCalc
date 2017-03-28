import getRadio from './module.getRadio';

const calories = (function () {
  /**
   * Set variables which are available within the entire 'scope' of the
   * module.
   */

  let settings;
  let weight;
  let length;
  let age;
  let gender;
  let training;
  let pal;
  let form;


  /**
   * Set default settings
   *
   * @type {Object}
   */

  const defaults = {

    // Amount of calories per type of macro.
    calsPerGram: {
      fat: 9,
      protein: 4,
      carbs: 4,
    },

    // Value for calculating fiber intake (14-16 gram per 1000kcal).
    fiber: 0.014,

    // Classes and attributes available in the form.
    classes: {
      weight: 'input[name=weight]',
      length: 'input[name=length]',
      age: 'input[name=age]',
      training: '.training',
      rest: '.rest',
      fat: '.fat',
      protein: '.protein',
      carbs: '.carbs',
      fiber: '.fiber',
    },

  };


  /**
   * Calculate resting metabolic rate (BMR) with the Harris & Benedict
   * formula.
   *
   * @return {number} BMR in calories needed per day for a male or female.
   */

  const harrisBenedict = function () {
    let value;
    weight = parseFloat(document.querySelector(settings.classes.weight).value);
    length = parseFloat(document.querySelector(settings.classes.length).value);
    age = parseInt(document.querySelector(settings.classes.age).value, 10);
    gender = getRadio.value('calories', 'gender');

    if (gender === 'male') {
      value = 88.362 + (13.397 * weight) + ((4.799 * length) - (5.677 * age));
    } else if (gender === 'female') {
      value = 447.593 + (9.247 * weight) + ((3.098 * length) - (4.33 * age));
    }

    return value;
  };


  /**
   * Calculate total amount of calories per day based on BMR including
   * daily activity (PAL-values).
   *
   * @return {number} amount of calories needed including daily activities.
   */

  const bmrPlusPal = function () {
    pal = getRadio.value('calories', 'pal');

    const value = harrisBenedict() * pal;
    return value;
  };


  /**
   * Calculate amount of calories needed on a rest and training day based on
   * type of training (burning 'fat' or building 'muscle').
   *
   * @return {object} amount of calories needed on a 'training' and 'rest'
   * day.
   */

  const typeOfTraining = function () {
    let trainingDay;
    let restDay;
    training = getRadio.value('calories', 'training');
    gender = getRadio.value('calories', 'gender');

    if (training === 'fat') {
      if (gender === 'male') {
        trainingDay = bmrPlusPal() - (bmrPlusPal() * 0.18);
        restDay = bmrPlusPal() - (bmrPlusPal() * 0.22);
      } else if (gender === 'female') {
        trainingDay = bmrPlusPal() - (bmrPlusPal() * 0.18);
        restDay = bmrPlusPal() - (bmrPlusPal() * 0.22);
      }
    } else if (training === 'muscle') {
      if (gender === 'male') {
        trainingDay = bmrPlusPal() * 1.2;
        restDay = bmrPlusPal() * 1.1;
      } else if (gender === 'female') {
        trainingDay = bmrPlusPal() * 1.1;
        restDay = bmrPlusPal() * 1.05;
      }
    }

    return {
      trainingDay,
      restDay,
    };
  };


  /**
   * Calculate grams needed on a 'training' and 'rest' day per macro (fat,
   * protein, carbs, fiber) based on total amount of calories calculated in
   * the 'typeOfTraining" method.
   *
   * @return {object} amount of grams needed per macro on a 'training' and
   * 'rest' day.
   */

  const macronutrients = function () {
    const cals = typeOfTraining();
    const caloriesTraining = Math.round(cals.trainingDay);
    const caloriesRest = Math.round(cals.restDay);

    const fat = {
      training: Math.round((caloriesTraining * 0.3) / settings.calsPerGram.fat),
      rest: Math.round((caloriesRest * 0.3) / settings.calsPerGram.fat),
    };

    const protein = Math.round(weight * 2.2);

    const carbs = {
      training: Math.round((caloriesTraining -
        ((fat.training * settings.calsPerGram.fat) + (protein * settings.calsPerGram.protein))) /
        settings.calsPerGram.carbs),
      rest: Math.round((caloriesRest -
        ((fat.rest * settings.calsPerGram.fat) + (protein * settings.calsPerGram.protein))) /
        settings.calsPerGram.carbs),
    };

    const fiber = {
      training: Math.round(caloriesTraining * settings.fiber),
      rest: Math.round(caloriesRest * settings.fiber),
    };

    return {
      caloriesTraining,
      caloriesRest,
      carbs,
      protein,
      fat,
      fiber,
    };
  };


  /**
   * Bind results calculated in 'macros' to DOM elements
   */

  const appendData = function () {
    const macros = macronutrients();
    const caloriesTraining = document.querySelector(settings.classes.training);
    const caloriesRest = document.querySelector(settings.classes.rest);
    const carbs = document.querySelector(settings.classes.carbs);
    const protein = document.querySelector(settings.classes.protein);
    const fat = document.querySelector(settings.classes.fat);
    const fiber = document.querySelector(settings.classes.fiber);

    // Bind results to DOM
    caloriesTraining.innerHTML = macros.caloriesTraining;
    caloriesRest.innerHTML = macros.caloriesRest;
    carbs.innerHTML = `carbs training: ${macros.carbs.training} rest: ${macros.carbs.rest}`;
    protein.innerHTML = macros.protein;
    fat.innerHTML = `fat training: ${macros.fat.training} rest: ${macros.fat.rest}`;
    fiber.innerHTML = `fiber training: ${macros.fiber.training} rest: ${macros.fiber.rest}`;
  };


  /**
   * Setup
   */

  const setup = function () {
    form = document.querySelector('form[name=calories]');
  };


  /**
   * Bind events
   */

  const bindEvents = function () {
    const events = ['keyup', 'change', 'click'];

    for (let i = 0; i < events.length; i += 1) {
      form.addEventListener(events[i], appendData, false);
    }

    macronutrients();
  };


  /**
   * Init the module
   */

  const init = function (options) {
    // Setup settings.
    options = options || {};
    settings = Object.assign({}, defaults, options);

    setup();
    bindEvents();
  };


  /**
   * Return an object exposed to the public
   */

  return {
    init,
  };
}());

export default calories;
