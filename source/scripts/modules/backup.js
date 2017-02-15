var Module = (function () {

    var _privateMethod = function (message) {
        console.log(message);
    };

    var _publicMethod = function (text) {
        _privateMethod(text);
    };

    return {
        publicMethod: publicMethod
    };

})();

// Example of passing data into a private method
// the private method will then `console.log()` 'Hello!'
console.log(Module.publicMethod('Hello'));


