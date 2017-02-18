var calories = (function () {

    /**
     *
     */

    let weight,
        length,
        age,
        gender,
        training,
        pal;


    /**
     * [defaults description]
     * @type {Object}
     */

    const defaults = {
        form: document.querySelector( 'form[name=calories]' ),

        calsPerGram: {
            fat: 9,
            protein: 4,
            carbs: 4,
            alcohol: 7
        },

        fiber: 0.014

    };


    /**
     * [_getRadioVal description]
     * @param  {[type]} formName  [description]
     * @param  {[type]} radioName [description]
     * @return {[type]}           [description]
     */

    let _getRadioVal = function ( formName, radioName ) {

        let form = document.getElementById( formName );
        let radios = document.getElementsByName( radioName );

        let i;
        let amount;

        for ( i = 0, amount = radios.length; i < amount; i++ ) {

            if (radios[i].checked) {
                return radios[i].value;
                break;
            }

        }

    };


    /**
     * [_harrisBenedict description]
     * @return {[type]} [description]
     */

    let _harrisBenedict = function () {

        weight = parseInt( document.querySelector( 'input[name=weight]' ).value ); // Make global?
        length = parseInt( document.querySelector( 'input[name=length]' ).value ); // Make global?
        age = parseInt( document.querySelector( 'input[name=age]' ).value ); // Make global?

        gender = _getRadioVal('calories', 'gender');

        if ( gender === 'male' ) {

            let value = 88.362 + ( 13.397 * weight ) + ( 4.799 * length) - ( 5.677 * age );

            return value;

        } else if ( gender === 'female' ) {

            let value = 447.593 + ( 9.247 * weight ) + ( 3.098 * length) - ( 4.33 * age );

            return value;
        }
    }


    /**
     * [_restingMetabolicRate description]
     * @return {[type]} [description]
     */

    let _restingMetabolicRate = function () {

        pal = _getRadioVal('calories', 'pal'); // Make global?

        let value = _harrisBenedict() * pal;
        return value;

    }


    /**
     * [_training description]
     * @return {[type]} [description]
     */

    let _training = function () {

        training = _getRadioVal('calories', 'training'); // Make global?
        gender = _getRadioVal('calories', 'gender'); // Make global?

        if ( training === 'fat' ) {

            if ( gender === 'male' ) {

                let training = _restingMetabolicRate() - ( _restingMetabolicRate() * .18 );
                let rest = _restingMetabolicRate() - ( _restingMetabolicRate() * .22 );

                return {
                    training: training,
                    rest: rest
                };


            } else if ( gender === 'female' ) {

                let training = _restingMetabolicRate() - ( _restingMetabolicRate() * .18 );
                let rest = _restingMetabolicRate() - ( _restingMetabolicRate() * .22 );

                return {
                    training: training,
                    rest: rest
                };

            }

        } else if ( training === 'muscle' ) {

            if ( gender === 'male' ) {

                let training  = _restingMetabolicRate() * 1.2;
                let rest  = _restingMetabolicRate() * 1.1;

                return {
                    training: training,
                    rest: rest
                };

            } else if ( gender === 'female' ) {

                let training  = _restingMetabolicRate() * 1.1;
                let rest  = _restingMetabolicRate() * 1.05;

                return {
                    training: training,
                    rest: rest
                };

            }

        }

    }


    /**
     * [_macros description]
     * @return {[type]} [description]
     */

    let _macros = function () {

        let calories = _training();
        let caloriesTraining = calories.training;
        let caloriesRest = calories.rest;

        let fat = {
            training: ( caloriesTraining * .3 ) / defaults.calsPerGram.fat,
            rest: ( caloriesRest * .3 ) / defaults.calsPerGram.fat
        };

        let protein = weight * 2.2;

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


    /**
     * [_formSubmit description]
     * @return {[type]} [description]
     */

    let _formSubmit = function () {

      let onSubmit = function( event ) {

        event.preventDefault();

        console.log( _macros() );

      };

      defaults.form.addEventListener( 'submit', onSubmit, false );


    };


    /**
     * [init description]
     * @return {[type]} [description]
     */

    let init = function () {

        // public
        console.log( 'Init calories module' );

        _formSubmit();

    };

    return {

        init: init

    };

})();

export default calories;
