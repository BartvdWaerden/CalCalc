// @codekit-prepend "modules/modules.calories.js"



// jQuery( document ).on("click", ".js-add-element", function(e) {

//     e.preventDefault();

//     var $elements     = $( '.js-elements' ), $element     = $( '.js-element'
//     ).first();

//     // Create new product jQuery object var $newElement         =
//     $element.clone(), $newElementLink     = $newElement.find( 'a' );

//     // Add class $newElement.addClass( 'js-element-new' );

//     // Change plus classes to remove $newElementLink.removeClass( 'add
//     js-add-element' ); $newElementLink.addClass( 'remove js-remove-element'
//     );

//     // Add new element to the DOM $( $elements ).append( $newElement );

//     // Recount and renumber the elements recountElements();

// });

// jQuery( document ).on("click", ".js-remove-element", function(e) {

//     e.preventDefault();

//     var $element     = $( '.js-element') ;

//     // Only remove the current element $( this ).closest( $element
//     ).remove();

//     // Recount and renumber the elements recountElements();

// });

// function recountElements() {

//     var $element      = $( '.js-element' ), $attrElement = $( '.text-input'
//     ),

//         attrId      = 'id', attrName    = 'name', count       = 1, prefix
//         = 'product-'

//         // (Re)count every $element and add corresponding attribute values
//         $($element).each(function() { $( this ).find( $attrElement ).attr(
//         attrId, prefix + count ).attr( attrName, prefix + count ); count++;
//         }); }


// // Excercise 1 // Global Scope function bar() {

//     foo = 'baz';

//     function baz( foo ) { var foo = 'bam'; bam ='yay'; }

// }

// var foo;

// // end global scope

// foo = 'bar'; foo = 'foo'; bar();



// Exercise 2

// var foo = 'bar' ;

// function bar () {

//     var foo = 'test';

//     function test( foo ) {

//         foo = 'bam'; bam = 'yay'; bam2 = 'yay2';

//         function test2( foo ) {

//             head = 'bamski'; } }

//     // function test( foo ) {

//     //     foo = 'test'; //     test = 'test2'; // }

//     // test(); test(); test2(); }

// console.log( bar() ); console.log(foo); // bar console.log(bam); // yay
// console.log(bam2); console.log(head);


///// Excercise 3 - IIFE Immediately Invoked Function Expression /// Hoisting

// // var myvar; myvar = 'my value';

// (function() { console.log(myvar); // undefined - Why? because in second
// function it does find myvar in global scope var myvar = 'local value'; })();

// (function() { console.log(myvar); // 'my value' - (global scope) why not
// local value, it creates var myvar in function scope right?  myvar = 'local
// value'; })();

// (function() { // var myvar; // gets created in function scope myvar = 'local
// value'; console.log(myvar); // 'local value' })();
//
//
// Cheating lexical scope
//
// function blog(str) { eval(str); // RHS console.log(focus); // focus focus }

// blog( "var focus = 'focus focus';" )

// creating lexical scope at run time
//
// var array = { 0: 'work hard', 'woo': 'play hard', wohoo: 'aways', 2:
// 'coolio' };

// with(array) { console.log(woo); //play hard console.log(wohoo); // always
// console.log(array[0]); focus = 'yep'; // LHS - get's created in global scope
// }

// array.focus; // undefined focus // 'yep'

// function foo( bar ) {

//     // var bar; // implicit variable decl (whaterver user put in);

//     if ( bar ) { // true

//         let baz = bar;

//         if ( baz ) { // true

//             let bam = baz; }

//         // console.log( bam ); // error } // console.log( baz ); // error
//         console.log(bar); // Block scope with let keyword }

// foo('Block scope with let keyword');


// Hoisting ex 1
//compiling phase declaring vars and functions runtime phase Global scope var
//a; var b;

// console.log(a); // undefined console.log(b); // undefined


// a = b; b = 2;

// console.log(b); // 2 console.log(a); // undefined






// ex 2
//
// Global scope

// function b() { return c; // undefined cause var c = undefined in global
// scope (no value) }

// var a; var c; var d;

// // end global scope

// a = b(); // undefined c = d(); // undefined

// a; // undefined c; // undefined

// d = function() { // Uncaught TypeError: d is not a function return b(); }
//

// functionZero = function() { // Uncaught ReferenceError: functionZero is not
// defined because no var or function zo no hoisting?
// console.log('functionOne'); return functionTwo(); };

// var functionFour = function() { // function expression no hoisting
// console.log('functionOne'); return functionTwo(); };

// function functionTwo() { // function declaration console.log('functionTwo');
// return functionThree(); }

// function functionThree() { // function declaration
// console.log('functionThree'); }


// TypeError: undefined is not a function

// functionOne(); // Uncaught TypeError: functionOne is not a function

// var functionOne = function() { console.log("Hello!"); };

// // Outputs: "Hello!" functionTwo();

// function functionTwo() { console.log("Hello!"); }
//

// // Wrong function doSomething( a ) { b = a + doSomethingElse( a * 2 ); // 2
// + (2 * 2) = 6 - 1 = 5

//     console.log( b * 3 ); // 5 * 3 = 15 }

// function doSomethingElse( a ) {

//     return a - 1; }

// var b;

// doSomething( 2 );

// // Good function doSomething( a ) {

//     function doSomethingElse( a ) {

//         return a - 1; }

//     var b;

//     b = a + doSomethingElse( a * 2 ); // 2 + (2 * 2) = 6 - 1 = 5

//     console.log( b * 3 ); // 5 * 3 = 15 }

// doSomething( 2 );
//

//Snap ik nog niet waarom dit een infinte loop creeerd?  function foo() {

//     function bar( a ) {

//         i = 3; // changing the 'i' in the enclosing scope's for loop

//         console.log( a + i ); }

//     for ( var i = 0; i < 10; i++ ) { bar( i * 2); // oops, infinite loop
//     ahead!  } }

// foo();


// setTimeout( function timeoutHandler() { console.log( 'I waited 1 second!' );
// }, 1000 );


// IIFE

// (function( lastname ) {

//     var firstname = 'Bart'; console.log(firstname + ' ' + lastname); })('van
//     der Waerden');

// var firstname = 'Samantha'; console.log(firstname);


// var foo = true;

// if (foo) { var bar = foo * 2; bar = 4 console.log( bar ); }

// console.log(bar);


// var myVar = 'my value';

// (function() {
//     // var myVar;
//     console.log(myVar);

//     myVar = 'local value';

//     console.log(myVar);
// })();

// var a = 2;

// (function IIFE() {
//     console.log( a );
// })();


// for( var i = 1; i <= 5; i++ ) {

//     (function( j ) {
//         setTimeout( function timer() {
//             console.log( j );
//         }, j * 1000 );
//     })(i);
// }

// var foo = (function coolModule() {

//     var something = "cool";
//     var another = [1, 2, 3];

//     function doSomething() {
//         console.log( something );
//     }

//     function doAnother() {
//         console.log( another.join( " ! " ) );
//     }

//     return {
//         doSomething: doSomething,
//         doAnother: doAnother
//     };

// })();

// foo.doSomething();

// var a = 10;

// function outer() {

//     var b = 20;

//     var inner = function() {
//         a++;
//         b++;
//         console.log(a);
//         console.log(b);
//     }

//     return inner;
// }

// var innerFn2 = outer();
// var innerFn = outer();


// innerFn();
// innerFn2();


//module pattern
// function createPerson() {

//     var firstName = 'Bart';
//     var lastName = 'van der Waerden';

//     var returnObj = {
//         'getFirstName': function() {
//             return firstName;
//         },
//         'getLastName': function() {
//             return lastName;
//         },

//         'setFirstName': function( name ) {
//             firstName = name;
//         },
//         'setLastName': function( name ) {
//             lastName = name;
//         }
//     };

//     return returnObj;
// }


// var person = createPerson();

// console.log( person.getFirstName() );
// person.setFirstName( 'Samantha' );
// console.log( person.getFirstName() );

// var i;
// var print = function() {
//     console.log(i);
// };

// for ( i = 0; i < 10; i++ ) {
//     setTimeout( print, 1000 );
// }

// var i;
// var print = function() {
//    console.log(i);
// };

// for ( i = 0; i < 10; i++ ) {
//
//     ( function() {
//
//         var currentValueOfI = i;
//
//         setTimeout( function() {
//             console.log( currentValueOfI );
//         }, 1000 );
//
//     } )();
//
// }


