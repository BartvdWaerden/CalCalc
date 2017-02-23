let getRadio = (function () {

    /**
     * [_getRadioVal description]
     * @param  {[type]} formName  [description]
     * @param  {[type]} radioName [description]
     * @return {[type]}           [description]
     */

    let getRadioVal = function ( formName, radioName ) {

        let form = document.getElementById( formName ),
            radios = document.getElementsByName( radioName ),
            i,
            amount;

        for ( i = 0, amount = radios.length; i < amount; i++ ) {

            if (radios[i].checked) {
                return radios[i].value;
                break;
            }

        }

    };

    return {

        value: getRadioVal

    };

})();

export default getRadio;
