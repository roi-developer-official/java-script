
/*Arrays */
/* Initilize arrays */
let arr = new Array(5);
console.log(arr); //> [<5 empty items> ]
arr = new Array(4, 3, 1);
console.log(arr); //> [4, 3 ,1]
arr = Array.of(4, 1);

arr = Array.from('Hi') //> convert an iterable or an array like object (NodeList)
console.log(arr) //>[ 'H', 'i' ]

const mixArray = [30, 'roi', {}];
const TDA = [[1, 2.2, 3.6], [2, 3, 4]];

/*array functions */
//push --> add element in the end of the array (return the new length of the array)
//pop --> poping the last elemtnt (returns the popped value)
//unshift --> add element in the begining of the array (return the new length of the array)
//shift --> remove the first element 
//Note: push and pop are faster the shift and unshift
//splice(start,[optional: end], [elemnt to place there : optional]) --> remove from start number of items //> works only on array not on array like
//slice(start,end(!include)) --> can create a new array with diffrent address location ,all the arguments are optional
//Note: start can be a negative number and it'l start from the end (-1 for the last el) 
//concat([]) --> adding el' to the array (to the end) 
//Note: this will create a brand new array so any pointer will be lost
//indexOf --> return the index of the passed value
//lastIndexOf --> same but starting from the right
//>Note: both will return -1 if the element is not Found , and also it wont work on objected array
//find--> takes a function argument with three args (value,index, fullarray) //> it'll work on Objected array
//Note: we can use return to store the result in a variable,the result will be a pointer to the found element, and returns only the first find
//findIndex --> same as find but will return the index of the found element
//includes(el)--> will return true or false if found or not

/*array Iterations */
const prices = [10.55, 5.99, 3.99, 5.69];
const tax = 0.18;
const taxAdjustedPrices = [];

//for Of
// for(const price of prices){
//     taxAdjustedPrices.push((tax + 1) * price);
// }

//for Each
// prices.forEach((currentValue , index, prices)=>{
// });

//map --> have to return something, it'll not change the original array but return a new one
const updPrices = prices.map((price, index, prices) => {
    return price * index;
});

//sorting array: 
//Note it convert to a string before the sort and there for not correct with numbers
let sorted = prices.sort();
console.log(sorted); //> [ 10.55, 3.99, 5.69, 5.99 ]
sorted = prices.sort((curr, next) => {
    if (curr > next) {
        return 1;
    }
    else if (curr === next)
        return 0;
    else return - 1;
});
console.log(sorted); //> [ 3.99, 5.69, 5.99, 10.55 ]
console.log(sorted.reverse()); //>[ 10.55, 5.99, 5.69, 3.99 ]

//filtering array: will return a new array, therefor it need's to return something
const filtered = prices.filter((price, index, prices)=>{
    return price > 6;  
});

//reduceing array: needs to return something //> the original array in not touched
const sum = prices.reduce((prev,curr,index, prices)=>{
    return prev + curr;
},0); //initial prevValue

//chaining mathods
prices.map(el=>el).reduce(el=>el);


//arrays and strings:
const data = 'new york;10.99;2000';
const transData = data.split(';');
//>second argument tp this function is a limit number for how many elements to split
 //> [ 'new york', '10.99', '2000' ]

const names = ['dan', 'monica'];
const name = names.join(' ')//> by deafult it seperate by ','
//> dan monica

//the spread operator
const copiedNames = [...names];
//> a brand new array ['dan', 'monica']
// console.log(Math.min(...prices));//> 3.99

const persons = [{name: 'dan', age:30}];
let newPersons = [...persons];

newPersons[0].age = 32;
console.log(persons[0].age); //> 32 !!
//there for
newPersons = [...persons.map(person=>({...person}))];
newPersons[0].age = 222;
console.log(persons, newPersons); //>[ { name: 'dan', age: 32 } ] [ { name: 'dan', age: 222 } ]

//array destructuring
const [firstName,laseName, ...restNewArray] = names; //> rest of the values will be stored in the array

/*End Of Array!! */












































