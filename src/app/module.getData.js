const getData = (() => {
  /**
   * Set variables which are available within the entire 'scope' of the
   * module.
   */

  let settings;
  let request;
  let btn;
  let container;


  /**
   * Set default settings
   *
   * @type {Object}
   */

  const defaults = {
    btn: 'request',
    container: 'container',
    api: require('../data/exercises.json'), // eslint-disable-line global-require
  };


  /**
   * Get exercise data
   */

  const getApi = () => {
    // keep track of the request
    request.onreadystatechange = () => {
    // check if the response data send back to us && check if the request is successful
      if (request.readyState === 4 && request.status === 200) {
        // add a border
        container.style.border = '1px solid #e8e8e8';

        // const exercises = JSON.parse(request.responseText);
        // const foamroll = exercises.foamroll;
        // const stretch = exercises.stretch;
        // const cardio = exercises.cardio;
        // const strength = exercises.strength;

        // update the HTML of the element
        container.innerHTML = request.responseText;
      } else {
        // otherwise display an error message
        container.innerHTML = `An error occurred during your request: ${request.status} ${request.statusText}`;
      }
    };
  };


  /**
   * Setup
   */

  const setup = () => {
    request = new XMLHttpRequest();

    // specify the type of request
    request.open('Get', settings.api);

    btn = document.getElementById(settings.btn);

    container = document.getElementById(settings.container);
  };


  /**
   * Bind events
   */

  const bindEvents = () => {
    getApi();

    // register an event
    btn.addEventListener('click', function () {
      // hide the button
      this.style.display = 'none';
      // send the request
      request.send(); // setup
    });
  };


  /**
   * Init the module
   */

  const init = (options) => {
    // Setup settings.
    options = options || {};
    settings = Object.assign({}, defaults, options);

    setup();

    bindEvents();
  };


  /**
   * Return an object exposed to the public
   */

  return {
    init,
  };
})();

export default getData;
