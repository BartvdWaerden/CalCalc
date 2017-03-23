import extend from './extend.js'

let exercise = (function () {

    /**
     * Set variables which are available within the entire 'scope' of the
     * module.
     */

     let settings;


    /**
     * Set default settings
     *
     * @type {Object}
     */

    const defaults = {
        btn: document.getElementById( 'request' ),
        container: document.getElementById( 'container' ),
        request: new XMLHttpRequest(),
        url: ''
    };

    /**
     * Get exercise data
     */

    const _getData = function () {

        // specify the type of request
        settings.request.open( 'Get', settings.url );

        // keep track of the request
        settings.request.onreadystatechange = function() {

            // check if the response data send back to us && check if the request is successful
            if( settings.request.readyState === 4 && settings.request.status === 200 ) {

                // add a border
                settings.container.style.border = '1px solid #e8e8e8';

                // uncomment the line below to see the request
                var exercises = JSON.parse( settings.request.responseText );

                var foamroll = exercises.foamroll;
                console.log( foamroll );

                var stretch = exercises.stretch;
                console.log( stretch );

                var cardio = exercises.cardio;
                console.log( cardio );

                var strength = exercises.strength;
                console.log( strength );

                // update the HTML of the element
                settings.container.innerHTML = settings.request.responseText;

            } else {
                // otherwise display an error message
                settings.container.innerHTML = 'An error occurred during your request: ' +  settings.request.status + ' ' + settings.request.statusText;
            }
        }


    }

    /**
     * Setup
     */

    const _setup = function () {



    }

    /**
     * Bind events
     */

    const _bindEvents = function () {

        _getData();

        // register an event
        settings.btn.addEventListener('click', function() {
            // hide the button
            this.style.display = 'none';
            // send the request
            settings.request.send();
        });



    };


    /**
     * Init the module
     */

    const init = function ( options ) {

        // Setup settings.
        options = options || {};
        settings = extend.init( {}, defaults, options );

        _bindEvents();

    };


    /**
     * Return an object exposed to the public
     */

    return {

        init: init

    };

})();

export default exercise;
