let getRadio = (function () {

    /**
     * Get the value of a radio button in a specific form
     *
     * @param  {string} formName  the class name of the form element
     * @param  {string} radioName the name attribute of the radio button
     * @return {string}           the value of the radio button
     */

    let getRadioVal = function ( formName, radioName ) {

        let form = document.querySelector( formName ),
            radios = document.getElementsByName( radioName ),
            i,
            amount;

        for ( i = 0, amount = radios.length; i < amount; i++ ) {

            if ( radios[i].checked ) {
                return radios[i].value;
                break;
            }

        }

    };

    /**
     * Retun the 'getRadioVal' function
     */

    return {

        value: getRadioVal

    };

})();

export default getRadio;
