function abcd() {
    for (var i = 0; i < 3; i++) {
        console.log(i)
    }
    console.log(i)
}

// abcd();
// -----------------------------------------------

// Window obj is a part browser context api
// Window obj is a global object which contains methods and props that helps us to interact with web page such as
//     ○  handling events
//     ○ Control browser history
//     ○ Manipulate Dom and more
// Top level object which has other object contained in it such as
//      -  like Document, Navigator, Screen, etc.
// -------------------------------------------------

// Lexical env is chart of scope and chain scope of var in fncs
// --------------------------------------------------

// Truthy & falsy
// 	  Falsy values = 0, false, undefined, null, NaN, document.all 
//    Truthy Values - Everything else than truthy values
//    we can see result using double exclamation before to know either t or f in practical
function falsy() {
    let a
    console.log(a);
}

// falsy();
// --------------------------------------------------------------------

// loops - for while
//   for 
//      for-each -> array(temp copy, bc no allowed)
//      for-of -> array(break-continue- bc allowed)
//      for-in -> obj 
//   while do-while

let Foreach = () => {
    let fruits = ['apple', 'banana', 'mango', 'orange', 'pineapple'];
    fruits.forEach((fruit, index) => {
        console.log(`Fruit number ${index + 1} is ${fruit}`);
    });
};

let Forof = () => {
    let fruits = ['apple', 'banana', 'mango', 'orange', 'pineapple'];

    for (let fruit of fruits) {
        console.log(`${fruit} is a fruit `);
    }
};

let Forin = () => {
    let a = {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
    };
    for(let b in a){
        console.log(`${b}`)
    }
    console.log(a.)
}

// Foreach();
// Forof();
// Forin();