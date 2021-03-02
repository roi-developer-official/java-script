const { throws } = require("assert");
const { exception } = require("console");

var obj = {
    name: "mmw",
    age: 12
}
const iterable1 = {};
iterable1[Symbol.iterator] = function*(){
    yield obj.name;
    yield obj.age;
}

console.log('---example 1---');
console.log([...iterable1]);
console.log('---example 2---');
for(const item of iterable1)
{
    console.log(item);
}
console.log('---example 3 can iterate many times---');
for(const item of iterable1)
{
    console.log(item);
}

function* makeIterator(){
    yield 1;
    yield 2;
}

const it = makeIterator();
console.log('---example 4 can iterate only once---');
for (const itItem of it) {
    console.log(itItem);
}
for (const itItem of it) {
    console.log(itItem);
}

let index = -1;
const iterator2 = {
    next: function(){
        index++;
        switch(index){
            case 0:
                return { value: obj.name, done : false}
            case 1:
                return { value: obj.age, done : false}
            case 2:
                return { value: undefined, done : true}
            default :
            return {value :undefined , done: true}
        }
    
    }
}

let result = iterator2.next();
console.log('---example 5---');
while(!result.done){
    console.log(result.value);
    result = iterator2.next();
}

const iterable3 = {
    *[Symbol.iterator](){
        yield* ['a','b','c'];
    }
}
console.log('---example 6---');
for(let value of iterable3)
{
    console.log(value);
}

function* fibonacci() {
    let current = 0;
    let next = 1;
    while (true) {
      let reset = yield current;
      [current, next] = [next, next + current];
      if (reset) {
          current = 0;
          next = 1;
      }
    }
  }
  
console.log('---example 7---');
  const sequence = fibonacci();
  console.log(sequence.next().value);     // 0
  console.log(sequence.next().value);     // 1
  console.log(sequence.next().value);     // 1
  console.log(sequence.next().value);     // 2
  console.log(sequence.next().value);     // 3
  console.log(sequence.next().value);     // 5
  console.log(sequence.next().value);     // 8
  console.log(sequence.next(true).value); // 0
  console.log(sequence.next().value);     // 1
  console.log(sequence.next().value);     // 1
  console.log(sequence.next().value); 


function* makeIterator3(){
    yield 1;
    return 3;
    yield 4;
}

console.log('---example 7---');
const makeIt2 = makeIterator3();
console.log(makeIt2.next());
console.log(makeIt2.next());
console.log(makeIt2.next());

 function* makeIterator2(){
        yield 1;
        throw 3;
}

console.log('---example 8---');
const makeIt = makeIterator2();
console.log(makeIt.next());
console.log(makeIt.next());
console.log(makeIt.next());

