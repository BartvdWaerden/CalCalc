var calories = (function () {

    // locally scoped Object
    var defaults = {

        weight: 73,
        length: 189,
        age: 26,
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

    var init = function () {

        // public
        console.log( 'Init module' );
        console.log( _macros() );
        console.log('testttsasa');

        _training();
        _macros();

    };

    return {

        init: init


    };

})();



export default calories;
