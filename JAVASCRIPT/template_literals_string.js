// Complete the code to return a string in the format you are given in the sample output:

// Sample Input
// Portugal

// Lisbon

// Sample Output
// Country: Portugal, Capital: Lisbon

// Sample code
// let country = readLine();
// let capital = readLine();

// //complete the code
// console.log(`Country: , Capital: `);

// Use the sign $ and enclose the variable name in braces {}.


function main() {
    const country = readLine();
    const capital = readLine();
    
    console.log(`Country: ${country}\nCapital: ${capital}`);
}

function name() {
    {
        const firstname = prompt("enter your first name")
        const lastname = prompt("enter your last name")

        const sentence = `my name is ${firstname} ${lastname}`
        console.log(sentence)
    }
}

function sample() {
    const firstname = readLine("enter your first name")
    const lastname = readLine("enter your last name")

    const sentence = `my name is ${firstname} ${lastname}`
    console.log(sentence)
}
