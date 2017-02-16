var calories = (function () {

    var form = document.getElementsByClassName('form');
    // locally scoped Object
    var defaults = {

        weight: 73,
        length: 189,
        // age: 26,
        age: document.querySelector( '.age' ),
        gender: 'male', // or female
        training: 'muscle', // or muscle

        pal: {
            low: 1.2,
            medium: 1.3, // 1.3 - 1.4
            high: 1.4, // 1.4 - 1.6
            veryHigh: 1.6 // 1.6 - 1.8
        },

        calsPerGram: {
            fat: 9,
            protein: 4,
            carbs: 4,
            alcohol: 7
        },

        fiber: 0.014

    };

    var _harrisBenedict = function () {

        if ( defaults.gender === 'male' ) {

            let value = 88.362 + ( 13.397 * defaults.weight ) + ( 4.799 * defaults.length) - ( 5.677 * defaults.age );

            return value;

        } else if ( defaults.gender === 'female' ) {

            let value = 447.593 + ( 9.247 * defaults.weight ) + ( 3.098 * defaults.length) - ( 4.33 * defaults.age );

            return value;
        }
    }

    var _restingMetabolicRate = function () {

        let value = _harrisBenedict() * defaults.pal.medium;
        return value;

    }

    var _training = function () {

        if ( defaults.training === 'fat' ) {

            if ( defaults.gender === 'male' ) {

                let training = _restingMetabolicRate() - ( _restingMetabolicRate() * .18 );
                let rest = _restingMetabolicRate() - ( _restingMetabolicRate() * .22 );

                return {
                    training: training,
                    rest: rest
                };


            } else if ( defaults.gender === 'female' ) {

                let training = _restingMetabolicRate() - ( _restingMetabolicRate() * .18 );
                let rest = _restingMetabolicRate() - ( _restingMetabolicRate() * .22 );

                return {
                    training: training,
                    rest: rest
                };

            }

        } else if ( defaults.training === 'muscle' ) {

            if ( defaults.gender === 'male' ) {

                let training  = _restingMetabolicRate() * 1.2;
                let rest  = _restingMetabolicRate() * 1.1;

                return {
                    training: training,
                    rest: rest
                };

            } else if ( defaults.gender === 'female' ) {

                let training  = _restingMetabolicRate() * 1.1;
                let rest  = _restingMetabolicRate() * 1.05;

                return {
                    training: training,
                    rest: rest
                };

            }

        }

    }

    var _macros = function () {

        let calories = _training();
        let caloriesTraining = calories.training;
        let caloriesRest = calories.rest;

        let fat = {
            training: ( caloriesTraining * .3 ) / defaults.calsPerGram.fat,
            rest: ( caloriesRest * .3 ) / defaults.calsPerGram.fat
        };
        let protein = defaults.weight * 2.2;
        let carbs = {
            training: ( caloriesTraining - ( ( fat.training * defaults.calsPerGram.fat ) + ( protein * defaults.calsPerGram.protein ) ) ) / defaults.calsPerGram.carbs,
            rest: ( caloriesRest - ( ( fat.rest * defaults.calsPerGram.fat ) + ( protein * defaults.calsPerGram.protein ) ) ) / defaults.calsPerGram.carbs
        };
        let fibre = {
            training: caloriesTraining * defaults.fiber,
            rest: caloriesRest * defaults.fiber
        };



        return {
            caloriesTraining: caloriesTraining,
            caloriesRest: caloriesRest,
            carbs: carbs,
            protein: protein,
            fat: fat,
            fibre: fibre
        };

    }

    var _bindEvents = function () {


    }

    var init = function () {

        // public
        console.log( 'Init module' );
        console.log( form );


    };

    return {

        init: init

    };

})();

calories.init();










// // Grams of fiber
// var fiberTrainingsDay = Math.floor( fiberPer1000kcal * trainingsDayFatMaleHB );
// var fiberRestDay = Math.floor( fiberPer1000kcal * restDayFatMaleHB );
// console.log('Your should at least consume ' + fiberTrainingsDay + ' grams of fiber on a trainings day.');
// console.log('Your should at least consume ' + fiberRestDay + ' grams of fiber on a rest day.');











// Spijker-Hoven method
// const restingMetabolicRateSH = Math.floor( ( 11.797 * weight ) + ( 6.487 * length) - ( 5.180 * age ) + ( 186.017 * genderMale ) - 139.444 );
// var trainingsDayFatMaleSH = Math.floor( restingPlusActivitySH - ( restingPlusActivitySH * trainingsDayFatMaleValue ) ); // -18% rounded down
// var restDayFatMaleSH = Math.floor( restingPlusActivitySH - ( restingPlusActivitySH * restDayFatMaleValue ) ); // -22% rounded down
// var trainingsDayMuscleMaleSH = Math.floor( restingPlusActivitySH * trainingsDayMuscletMaleValue ); // +20% rounded down
// var restDayMuscleMaleSH = Math.floor( restingPlusActivitySH * restDayMuscleMaleValue ); // +10% rounded down
// console.log( 'Male Burning Fat on trainings day SH: ' + trainingsDayFatMaleSH + ' calories' );
// console.log( 'Male Burning Fat on rest day SH: ' + restDayFatMaleSH + ' calories' );
// console.log( 'Male Muscle on trainings day SH: ' + trainingsDayMuscleMaleSH + ' calories' );
// console.log( 'Male Muscle on rest day SH: ' + restDayMuscleMaleSH + ' calories' );
