let ydkjs = (function () {


// define a function
var myFunction = function () {
  console.log(this);
};


    /**
     * Bind events
     */

    let _bindEvents = function () {


    }


    /**
     * Init the module
     */

    let init = function () {

        myFunction();

    };

    /**
     * Return an object exposed to the public
     */

    return {

        init: init

    };

})();

export default ydkjs;



    // var person = {
    //     "firstName": "Bart",
    //     "lastName": "van der Waerden",
    //     "getFullName": function () {
    //         return this.firstName + " " + this.lastName;
    //     },
    //     "address": {
    //         "street": "123 JS Street",
    //         "city": "Rotterdam",
    //         "state": "JS"
    //     },
    //     "isFromState": function ( state ) {

    //         return ( this.address.state === state );

    //     }
    // }










    // function foo ( num ) {
    //     console.log( 'foo: ' + num );

    //     this.count++;
    // }

    // foo.count = 0;

    // var i;

    // for ( i = 0; i < 10; i++) {

    //     if ( i > 5 ) {

    //         foo.call( foo, i );

    //     }
    // }







// let me = {
//     name: "Bart"
// };

// let you = {
//     name: "You"
// };

// function identify () {
//     return this.name.toUpperCase();
// }

// function speak () {

//     let greeting = "Hello, I'm " + identify.call( this );
//     console.log( greeting );

// }


// function baz () {
//     // Call-stack is: "baz"
//     // So our call-site is in the ydkjs scope

//     console.log( 'baz' );
//     bar(); // Call-site for 'bar'
// }

// function bar () {
//     // Call-stack is: 'baz' --> 'bar'
//     // So our call-site is in 'baz'
//     console.log( 'bar' )
//     foo(); // Call-site for 'foo'
// }

// function foo () {
//     // Cal-stack is: 'baz' --> 'bar' --> 'foo'
//     // So our call-site is in 'bar'
//     // debugger; // show call-stack in DevTools
//     console.log( 'foo' );
// }
