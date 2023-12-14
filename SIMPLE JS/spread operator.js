var a = [1,2,3,4,5,6,7];
// using spread operator 
// all reference value of a is copied to b 
var b = [...a];
b.pop();
// one value will be popped out of array b
console.log(b);
console.log(a);
// a will remain intact bcoz of spread operator
// you can also copy obj values
