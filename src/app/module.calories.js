import getRadio from './module.getRadio.js'

let calories = (function () {

    /**
     * Set variables which are available within the entire 'scope' of the
     * module.
     */

    let settings,
        weight,
        length,
        age,
        gender,
        training,
        pal;


    /**
     * Set default settings
     *
     * @type {Object}
     */

    const defaults = {

        // Form name attribute.
        form: document.querySelector( 'form[name=calories]' ),

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
            fiber: '.fiber'
        }

    };


    /**
     * Calculate resting metabolic rate (BMR) with the Harris & Benedict
     * formula.
     *
     * @return {number} BMR in calories needed per day for a male or female.
     */

    const _harrisBenedict = function () {

        weight = parseFloat( document.querySelector( settings.classes.weight ).value );
        length = parseFloat( document.querySelector( settings.classes.length ).value );
        age = parseInt( document.querySelector( settings.classes.age ).value );

        gender = getRadio.value( 'calories', 'gender' );

        if ( gender === 'male' ) {

            let value = 88.362 + ( 13.397 * weight ) + ( 4.799 * length) - ( 5.677 * age );

            return value;

        } else if ( gender === 'female' ) {

            let value = 447.593 + ( 9.247 * weight ) + ( 3.098 * length) - ( 4.33 * age );

            return value;
        }

    };


    /**
     * Calculate total amount of calories per day based on BMR including
     * daily activity (PAL-values).
     *
     * @return {number} amount of calories needed including daily activities.
     */

    const _bmrPlusPal = function () {

        pal = getRadio.value( 'calories', 'pal' );

        let value = _harrisBenedict() * pal;
        return value;

    };


    /**
     * Calculate amount of calories needed on a rest and training day based on
     * type of training (burning 'fat' or building 'muscle').
     *
     * @return {object} amount of calories needed on a 'training' and 'rest'
     * day.
     */

    const _training = function () {

        training = getRadio.value( 'calories', 'training' );
        gender = getRadio.value( 'calories', 'gender' );

        if ( training === 'fat' ) {

            if ( gender === 'male' ) {

                let training = _bmrPlusPal() - ( _bmrPlusPal() * .18 ),
                    rest = _bmrPlusPal() - ( _bmrPlusPal() * .22 );

                return {
                    training: training,
                    rest: rest
                };


            } else if ( gender === 'female' ) {

                let training = _bmrPlusPal() - ( _bmrPlusPal() * .18 ),
                    rest = _bmrPlusPal() - ( _bmrPlusPal() * .22 );

                return {
                    training: training,
                    rest: rest
                };

            }

        } else if ( training === 'muscle' ) {

            if ( gender === 'male' ) {

                let training  = _bmrPlusPal() * 1.2,
                    rest  = _bmrPlusPal() * 1.1;

                return {
                    training: training,
                    rest: rest
                };

            } else if ( gender === 'female' ) {

                let training  = _bmrPlusPal() * 1.1,
                    rest  = _bmrPlusPal() * 1.05;

                return {
                    training: training,
                    rest: rest
                };

            }

        }

    };


    /**
     * Calculate grams needed on a 'training' and 'rest' day per macro (fat,
     * protein, carbs, fiber) based on total amount of calories calculated in
     * the '_training" method.
     *
     * @return {object} amount of grams needed per macro on a 'training' and
     * 'rest' day.
     */

    const _macros = function () {

        let calories = _training(),
            caloriesTraining = Math.round( calories.training ),
            caloriesRest = Math.round( calories.rest ),

            fat = {
                training: Math.round( ( caloriesTraining * .3 ) / settings.calsPerGram.fat ),
                rest: Math.round( ( caloriesRest * .3 ) / settings.calsPerGram.fat )
            },

            protein = Math.round( weight * 2.2 ),

            carbs = {
                training: Math.round( ( caloriesTraining - ( ( fat.training * settings.calsPerGram.fat ) + ( protein * settings.calsPerGram.protein ) ) ) / settings.calsPerGram.carbs ),
                rest: Math.round( ( caloriesRest - ( ( fat.rest * settings.calsPerGram.fat ) + ( protein * settings.calsPerGram.protein ) ) ) / settings.calsPerGram.carbs )
            },

            fiber = {
                training: Math.round( caloriesTraining * settings.fiber ),
                rest: Math.round( caloriesRest * settings.fiber )
            };

        return {
            caloriesTraining: caloriesTraining,
            caloriesRest: caloriesRest,
            carbs: carbs,
            protein: protein,
            fat: fat,
            fiber: fiber
        };

    };


    /**
     * Bind results calculated in '_macros' to DOM elements
     */

    const _appendData = function () {

        let macros = _macros(),
            caloriesTraining = document.querySelector( settings.classes.training ),
            caloriesRest = document.querySelector( settings.classes.rest ),
            carbs = document.querySelector( settings.classes.carbs ),
            protein = document.querySelector( settings.classes.protein ),
            fat = document.querySelector( settings.classes.fat ),
            fiber = document.querySelector( settings.classes.fiber );


        // Bind results to DOM
        caloriesTraining.innerHTML =  macros.caloriesTraining;
        caloriesRest.innerHTML =  macros.caloriesRest;
        carbs.innerHTML =  'training: ' + macros.carbs.training + ' rest: ' + macros.carbs.rest;
        protein.innerHTML =  macros.protein;
        fat.innerHTML = 'training: ' + macros.fat.training + ' rest: ' + macros.fat.rest;
        fiber.innerHTML =  'training: ' + macros.fiber.training + ' rest: ' + macros.fiber.rest;

    };


    /**
     * Setup
     */

     const _setup = function () {

    };


    /**
     * Bind events
     */

    const _bindEvents = function () {

        let events = ['keyup', 'change', 'click'];

        for ( let i = 0; i < events.length; i++ ) {
            settings.form.addEventListener( events[i], _appendData, false);
        }

    };


    /**
     * Init the module
     */

    const init = function ( options ) {

        // Setup settings.
        options = options || {};
        settings = Object.assign( {}, defaults, options );

        _setup();

        _bindEvents();

    };


    /**
     * Return an object exposed to the public
     */

    return {

        init: init

    };

})();

export default calories;
