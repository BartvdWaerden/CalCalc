let getRadio = (function () {


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
     * [init description]
     * @return {[type]} [description]
     */

    let init = function ( formName, radioName) {

        // public
        // console.log( 'Init radios module' );

        _getRadioVal( formName, radioName);

    };

    return {

        init: _getRadioVal

    };

})();

export default getRadio;
