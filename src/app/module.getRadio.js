const getRadio = (function () {
  /**
   * Get the value of a radio button in a specific form
   *
   * @param  {string} formName  the class name of the form element
   * @param  {string} radioName the name attribute of the radio button
   * @return {string}           the value of the radio button
   */

  const getRadioVal = function (formName, radioName) {
    const form = document.querySelector(formName);
    const radios = document.getElementsByName(radioName);

    let i;
    let amount;

    for (i = 0, amount = radios.length; i < amount; i += 1) {
      if (radios[i].checked) {
        return radios[i].value;
      }
    }
  };

  /**
   * Retun the 'getRadioVal' function
   */

  return {
    value: getRadioVal,
  };
}());

export default getRadio;
