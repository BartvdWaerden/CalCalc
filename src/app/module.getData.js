let getData = (function () {

    /**
     * Set variables which are available within the entire 'scope' of the
     * module.
     */

    let settings,
        request,
        btn,
        container;


    /**
     * Set default settings
     *
     * @type {Object}
     */

    const defaults = {
        btn: 'request',
        container: 'container',
        api: ''
    };

    /**
     * Get exercise data
     */

    const _getData = function () {

        // keep track of the request
        request.onreadystatechange = function() {

            // check if the response data send back to us && check if the request is successful
            if( request.readyState === 4 && request.status === 200 ) {

                // add a border
                container.style.border = '1px solid #e8e8e8';

                // uncomment the line below to see the request
                var exercises = JSON.parse( request.responseText );

                var foamroll = exercises.foamroll;
                console.log( foamroll );

                var stretch = exercises.stretch;
                console.log( stretch );

                var cardio = exercises.cardio;
                console.log( cardio );

                var strength = exercises.strength;
                console.log( strength );

                // update the HTML of the element
                container.innerHTML = request.responseText;

            } else {
                // otherwise display an error message
                container.innerHTML = 'An error occurred during your request: ' +  request.status + ' ' + request.statusText;
            }
        }

    };


    /**
     * Setup
     */

     const _setup = function () {

        request = new XMLHttpRequest();

        // specify the type of request
        request.open( 'Get', settings.api );

        btn = document.getElementById( settings.btn );

        container = document.getElementById( settings.container );

    };

    /**
     * Bind events
     */

    const _bindEvents = function () {

        _getData();

        // register an event
        btn.addEventListener( 'click', function () {
            // hide the button
            this.style.display = 'none';
            // send the request
            request.send(); // setup
        });



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

export default getData;
