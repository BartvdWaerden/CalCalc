var Module = (function () {

    var _privateMethod = function (message) {
        console.log(message);
    };

    var publicMethod = function (text) {
        _privateMethod(text);

        // var elements = document.querySelector('js-add-element'),
        //     element  = elements.querySelector('js-element'),
        //     firstElem = element.querySelector('.add');


        // console.log(elements);
        // console.log(element);
        // console.log(firstElem);

        // // Create new elements
        // var newElement     = element.cloneNode(true);
        // var newElementLink = element.querySelectorAll('.add');


        // console.log(newElement);
        // console.log(newElementLink)

    };

    return {
        publicMethod: publicMethod
    };

})();

// Example of passing data into a private method
// the private method will then `console.log()` 'Hello!'
// console.log(Module.publicMethod('Hello'));


