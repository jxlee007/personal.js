/* Write a program that prints the numbers from 1 to 100. 
But for multiples of three, print "Fizz" instead of the number, 
and for the multiples of five, print "Buzz." 
For numbers that are multiples of both three and five, 
print "FizzBuzz." */




// for (let i = 0; i <= 100; i++) {
//     (i % 15 == 0)? console.log("fizzbuzz")
//     :   (i % 3 == 0)? console.log("fizz") 
//     :   (i % 5 == 0)? console.log("buzz")
//     :   console.log(i);
// }

let input = Math.floor(Math.random()*100) ;

(input % 15 == 0)? console.log(`fizzbuzz ${input}`)
    :   (input % 3 == 0)? console.log(`fizz ${input}`) 
    :   (input % 5 == 0)? console.log(`buzz ${input}`)
    :   console.log(input);


