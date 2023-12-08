/*
     ## Faulty Calculator ##

    -- 2 number inputs from user
    -- perform wrong operations
        --> + = -
        --> * = +
        --> - = /
        --> / = **

        perform only 10% of times
        with result coming at 10% probability
        logic --
            generate random number
            see small than 10 or not
*/

// let a = prompt("Enter number 1 :");
// let b = prompt("Enter number 2 :");
// let o = prompt("Enter operand : ");

// o = "" ;

// let a = 24; 
// let b = 6; 
// let o = ""; 


function faulty(a,b,o) {

    let r = "";

    console.log(`Enter number 1 : ${a}`);
    console.log(`Enter operand : ${o}`);
    console.log(`Enter number 2 : ${b}`);
    
    
      (o == "+") ?  r = a-b 
    : (o == "*") ? r = a+b
    : (o == "-") ? r = a/b
    :(o == "/") ? r = a**b
    : console.log("invalid");

    console.log(`Result of faulty operation : ${r} `)
    
}

faulty(24,6,"*")

 