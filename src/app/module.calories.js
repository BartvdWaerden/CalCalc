import getRadio from './module.getRadio';

const calories = (() => {
  /**
   * Set variables which are available within the entire 'scope' of the
   * module.
   */

  let settings;
  let form;
  let weight;
  let length;
  let age;
  let gender;
  let training;


  /**
   * Set default settings.
   *
   * @type {Object}.
   */

  const defaults = {

    formName: 'calories',

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
   * Convert inches to centimeters.
   */

  const inchesToCentimeters = (value) => {
    value *= 2.54;

    return value;
  };


  /**
   * Convert pounds to kilograms.
   */

  const poundsToKilograms = (value) => {
    value *= 0.45359237;

    return value;
  };


  const getWeight = () => {
    let value;
    const mass = getRadio.value(settings.formName, 'mass');

    if (mass === 'kilograms') {
      value = value;
    } else if (mass === 'pounds') {
      value = poundsToKilograms();
      console.log('pounds');
    }

    return value;
  };


  const getHeight = () => {
    let value;
    const height = getRadio.value(settings.formName, 'height');

    if (height === 'centimeters') {
      value = value;
    } else if (height === 'inches') {
      value = poundsToKilograms();
      console.log('inches');
    }

    return value;
  };


  /**
   * Assign global variables to corresponding elements.
   */

  const getValues = () => {
    form = document.querySelector(`form[name=${settings.formName}]`);
    weight = parseInt(document.querySelector(settings.classes.weight).value, 10);
    length = parseInt(document.querySelector(settings.classes.length).value, 10);
    age = parseInt(document.querySelector(settings.classes.age).value, 10);
    gender = getRadio.value(settings.formName, 'gender');
  };


  /**
   * Calculate resting metabolic rate (BMR) with the Harris & Benedict formula.
   *
   * @return {number} BMR in calories needed per day for a male or female.
   */

  const harrisBenedict = () => {
    let value;

    if (gender === 'male') {
      value = 88.362 + (13.397 * weight) + ((4.799 * length) - (5.677 * age)); // getWeight() & getHeight()?
    } else if (gender === 'female') {
      value = 447.593 + (9.247 * weight) + ((3.098 * length) - (4.33 * age)); // getWeight() & getHeight()?
    }

    return value;
  };


  /**
   * Calculate resting metabolic rate (BMR) with the Spijker-Hoven formula.
   *
   * @return {number} BMR in calories needed per day for a male or female.
   */

  const spijkerHoven = () => {
    let value;

    if (gender === 'male') {
      value = (((11.797 * weight) + (6.487 * length)) - (5.180 * age)) + ((187.017 * 1) - 139.444); // getWeight() & getHeight()?
    } else if (gender === 'female') {
      value = (((11.797 * weight) + (6.487 * length)) - (5.180 * age)) + ((187.017 * 0) - 139.444); // getWeight() & getHeight()?
    }

    return value;
  };


  /**
   * Get correct formula trough user input (default Harris & Benedict).
   *
   * @return {number} BMR in calories needed according to the formula chosen
   * by the user.
   */

  const getFormula = () => {
    let value;
    const formula = getRadio.value(settings.formName, 'formula');

    if (formula === 'harris') {
      value = harrisBenedict();
    } else if (formula === 'spijker') {
      value = spijkerHoven();
    }

    return value;
  };


  /**
   * Calculate total amount of calories per day based on BMR including
   * daily activity (PAL-values).
   *
   * @return {number} amount of calories needed including daily activities.
   */

  const bmrPlusPal = () => {
    const pal = getRadio.value(settings.formName, 'pal');
    const value = getFormula() * pal;

    return value;
  };


  /**
   * Calculate amount of calories needed on a rest and training day based on
   * type of training (burning 'fat' or building 'muscle').
   *
   * @return {object} amount of calories needed on a 'training' and 'rest'
   * day.
   */

  const typeOfTraining = () => {
    let trainingDay;
    let restDay;
    training = getRadio.value(settings.formName, 'training');
    gender = getRadio.value(settings.formName, 'gender');

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

  const macronutrients = () => {
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
   * Bind results calculated in 'macros' to DOM elements.
   */

  const appendData = () => {
    // Get (default) values.
    getValues();
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

  const setup = () => {
    // Make sure there are default values on init.
    appendData();
  };


  /**
   * Bind events.
   */

  const bindEvents = () => {
    const events = ['keyup', 'change', 'click'];

    for (let i = 0; i < events.length; i += 1) {
      form.addEventListener(events[i], appendData, false);
    }
  };


  /**
   * Init the module.
   */

  const init = (options) => {
    // Setup settings
    options = options || {};
    settings = Object.assign({}, defaults, options);

    setup();
    bindEvents();
  };


  /**
   * Return an object exposed to the public.
   */

  return {
    init,
  };
})();

export default calories;
