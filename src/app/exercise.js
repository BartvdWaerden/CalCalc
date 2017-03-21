let exercise = (function () {

    /**
     * Set variables which are available within the entire 'scope' of the
     * module.
     */

    // find the desired selectors
    let btn = document.getElementById('request'),
    bio = document.getElementById('bio');

    // set up a request
    let request = new XMLHttpRequest();

    // specify the type of request
    // request.open('Get', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/Bio.txt');
    request.open('Get', 'test.json');



    /**
     * Set default settings
     *
     * @type {Object}
     */

    // const defaults = {

    // };


    /**
     * Setup
     */

    // const _setup = function () {



    // }

    /**
     * Bind events
     */

    const _bindEvents = function () {

    // keep track of the request
        request.onreadystatechange = function() {
            // check if the response data send back to us
            if(request.readyState === 4) {
                // add a border
                bio.style.border = '1px solid #e8e8e8';
                // uncomment the line below to see the request
                // console.log(request);
                // check if the request is successful
                if(request.status === 200) {
                    // update the HTML of the element
                    bio.innerHTML = request.responseText;
                } else {
                    // otherwise display an error message
                    bio.innerHTML = 'An error occurred during your request: ' +  request.status + ' ' + request.statusText;
                }
            }
        }

        // register an event
        btn.addEventListener('click', function() {
            // hide the button
            this.style.display = 'none';
            // send the request
            request.send();
        });

    };


    /**
     * Init the module
     */

    const init = function () {

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
