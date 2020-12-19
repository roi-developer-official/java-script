
numbers and strring:
numbers in javascript are stored in 64 bits as floats.


the Number Object:
Number.MAX_SAFE_INTEGER: the biggest number that can be represented.
Number.MIN_SAFE_VALUE: the smaller number that can be represented.
Number.MAX_VALUE -> a value.
Number.POSITIVE_INFINITY. the number you gets when you divide by zero. 
also Infinity and -Infinity.
Number.isNaN;
Number.ParseFloat /Int.

the Math object:
Math.pow(2,53) -1 -> 2 to the power of 52 (the biggest number that can be represented).
Math.PI = the pi value.
Math.E = the e value.
Math.sqrt; calc square root.
Math.sin; sinos.
Math.abs(); absoute.
Math.random:  
Math.randon(); produce a number between 0 and 0.999999;
Math.floor(Math.random() * (max - min + 1) + min); 10.99999 = 10





0.2 + 0.4 !== 0.6, it is 0.6000000001. because the calculation is in binary form.
toFixed(20): 20 digits after the decimal point
solution: (0.2 + 0.4).tofixed(2) === 0.6 : this is true.
to get the binary number : 5.toString(2); : 101.
working with integers can be a solution for impersition(not accurete numbers):
there are packeges, and also multiply it by a 100 can be a solution.


the NigInt type:
adding a n after the number. this will keep the persition of a big number (as a string though).
no floating points.
can't mix big int and other types.
convert to BigInt(4);





