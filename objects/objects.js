
const chosenName = 'keyName';
const person = {
  name: 'Max',
  age: 30,
  hobbies: ['Sports', 'Cooking'],
  greet() {
    return this.name.toUpperCase();
  },
  'last name': 'lastName',
  1.5: 'hello',
  [chosenName]: '...'
}

//get object descirpor: show info about the object. (configureable, enumerable,writable,value)
Object.getOwnPropertyDescriptor(person.age);
Object.getOwnPropertyDescriptors(person);

//defint those properties:
Object.defineProperties(person, 'name',{
  configurable:true,
  value: 'Max',
  enumerable: true,
  writable: true
} );




//adding values to an object
person.isAdmin = true;

//deleing 
delete person.age; //> will delete the age property from person
person.age = undefined; //> will make age undefined but wont delete it

console.log(person['last name']); //> lastName

//numbers and Symbols
console.log(person[1.5]); //> hello
const numbers = { 1: 'hello world', 2: 'bye' };
console.log(numbers[1]);//> helllo world
/*
{
  name: 'Max',
  hobbies: [ 'Sports', 'Cooking' ],
  greet: [Function: greet],
  'last name': 'lastName',
  '1.5': 'hello',
  keyName: '...',
  isAdmin: true,
  age: undefined
}
*/
//the Spread Operator
let newPerson = { ...person };
newPerson.age = 32; //> not change the original
newPerson.hobbies.push('coding'); //> the original changed 

newPerson = { ...person, hobbies: [...person.hobbies] };
newPerson.hobbies.push('soccer'); //> the original not changed 

const person2 = Object.assign({}, person);
person2.age = 23;
person2.hobbies.push('basketball')//> will change the original

//check
if ('age' in person);
if (person.age === undefined);



/*The This KeyWord */
//inside of a function the "this" will be the before the dot el --> person in the next line
console.log(person.greet()); //> "this" = person

let { greet } = person;
// greet(); //>this = the window therefor will throw an error
greet = greet.bind(person);
console.log(greet()); //> "this" = person

//call
console.log(greet.call(person)); //> this will execute right away, "this" = person
// call(this,arg1,arg2)

//apply
console.log(greet.apply(person, []))
//aplly(this,[arg1,arg2])

//the browser bind "this" for you (on event listeners) to the FOM element that triggered the event - if you dont use an arrow function
//"this" in arrow function is the global context ("window" if inside only one function) because arrow function dont bind "this" 
//'use strice' will replace the "window" to undefined - exclude arrow function

const members = {
  teamName: 'Blue Rockets',
  people: ['one', 'two'],
  getTeamMembers() {
    this.people.forEach(p => {
      console.log(this.teamName + '-' + p);
    });
  }
}
//the "this" in arrow function in that case doesn't bind the "this" to the global window
members.getTeamMembers();
/*
Blue Rockets-one
Blue Rockets-two
*/
const members2 = {
  teamName: 'Blue Rockets',
  people: ['one', 'two'],
  getTeamMembers() {
    this.people.forEach(function(p){
      console.log(this.teamName + '-' + p);
    });
  }
}
//the function bind's the "this" keyword to the global window object
members2.getTeamMembers();
/*
undefined-one
undefined-two
*/

/*
//this examples: 
//1
// console.log(this); // logs global object (window in browser) - ALWAYS (also in strict mode)!

//2
function something() { 
  console.log(this);
}
something(); // logs global object (window in browser) in non-strict mode, undefined in strict mode


//3
const something = () => { 
  console.log(this);
}
something(); // logs global object (window in browser) - ALWAYS (also in strict mode)!


//4
const person = { 
  name: 'Max',
  greet: function() { // or use method shorthand: greet() { ... }
      console.log(this.name);
  }
};

person.greet(); // logs 'Max', "this" refers to the person object


//5
const person = { 
  name: 'Max',
  greet: () => {
      console.log(this.name);
  }
};

person.greet(); // logs nothing (or some global name on window object), "this" refers to global (window) object, even in strict mode

//6
const person = { 
  name: 'Max',
  greet() {
      console.log(this.name);
  }
};

const anotherPerson = { name: 'Manuel' }; // does NOT have a built-in greet method!

anotherPerson.sayHi = person.greet; // greet is NOT called here, it's just assigned to a new property/ method on the "anotherPerson" object

anotherPerson.sayHi(); // logs 'Manuel' because method is called on "anotherPerson" object => "this" refers to the "thing" which called it
*/




