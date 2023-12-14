/* Write a function that reverses a given string. */

// function reverse() {
//     let input = prompt("Enter the text");
//     console.log(reverse(input));
// };

// reverse();


function reverseStr() {
    let input = prompt("Enter the text");
    // Convert string into array 
    // to each get each character of the string
    // use the reverse () on the are they created through character of strings 
    //  join () to convert array into string 
    let reversedInput = input.split('').reverse().join('');
    console.log(reversedInput);
};

reverseStr();

// with out using reverse keyword 
function Str() {
    // Prompt the user for text input and store it in a variable named input
    let input = prompt("Enter the text");

    // Initialize an empty string variable named reversedInput
    let reversedInput = '';

    // Start a for loop with a counter i set to the last index of the input string
    for (let i = input.length - 1; i >= 0; i--) {
        // For each iteration, prepend the character at index i of input to reversedInput
        reversedInput += input[i];
    }

    // Log the reversedInput string to the console
    console.log(reversedInput);
}

// Call the reverseStr function
Str();