var calories = (function () {

    var weight, length, age, gender, training;

    // locally scoped Object
    var defaults = {
        form: document.querySelector( 'form[name=calories]' ),
        // weight: document.querySelector( 'input[name=weight]' ),
        // parseInt( defaults.weight.value )
        // length: document.querySelector( 'input[name=length]' ),
        // age: document.querySelector( 'input[name=age]' ),

        // gender: _getRadioVal( 'calories', 'gender' ),
        // training: _getRadioVal( 'calories', 'training' ),

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

    var _getRadioVal = function ( formName, radioName ) {

        var form = document.getElementById( formName );
        var radios = document.getElementsByName( radioName );
        var i;
        for ( i = 0, length = radios.length; i < length; i++ ) {

            if (radios[i].checked) {
                return radios[i].value;
                break;
            }

        }

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

    var _formSubmit = function () {

      var onSubmit = function( event ) {

        event.preventDefault();

        gender = _getRadioVal('calories', 'gender');
        console.log(gender);

      };

      defaults.form.addEventListener( 'submit', onSubmit, false );


    };


    var init = function () {

        // public
        console.log( 'Init calories module' );

        _formSubmit();

    };

    return {

        init: init

    };

})();

export default calories;
