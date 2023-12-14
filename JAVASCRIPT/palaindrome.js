// Write a function that checks whether a given word or phrase is a palindrome

function reverse() {
    let input = prompt("Enter the text");
    let reversedInput = input.split("").reverse().join("");

    (input==reversedInput) ? alert("It's a palindrome") : alert("It's not a palindrome"); 


    console.log(reversedInput);
};

reverse();