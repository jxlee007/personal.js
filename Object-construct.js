
function abcd() {
    this.old = 99;
}

// New keyword + constructor fncs = instances
// Using this keyword in the constructor fnc
// We can get properties & methods of obj
new abcd();

// first class fncs
var p1 = new abcd()

// IIFE 
    // (function() {
        // // wrap fnc in ()
    //     let val = 19; 
        // private variable = only accessible in fncs
    // }) ()
// call fnc immediately

// prototypal inheritence

// - Borrow properties via prototype
// - Using proto

var a = {
    sheIs : true
}

var b = {
    sheIsNot : false
}

a.__proto__ = b;
