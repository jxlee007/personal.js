// sheriyan
// link
// Scope Difference between var || let and const

// function abcd (){
//     for (let i = 0; i < 5 ; i++) {
//         console.log(i);
//     }
//     console.log(i);
// }
// returns Reference error i is not defined
//   ## Braces scope ##


function abcd (){
    for (var i = 0; i < 5 ; i++) {
        console.log(i);
    }
    console.log(i);
}

abcd();
//  ## Function scope ## 