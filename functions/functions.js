
//start() ? /> can't access start before initiliazetion

const start = function Start(){
    console.log('start')
}

// Start() //--> Noo!
start();

const end = function(){
    console.log('end')
}

const person = { 
     name: 'Max', 
     greet: function greet(){
         console.log('greet')
     }
}
person.greet();

const sumUp = (...numbers)=>{
    let sum = 0; 
    for(const num of numbers)
        sum += num;
   return sum;
}

const subTract = function(){
    let sum = 0;
    for(const num of arguments) //> don't use that (old way)
        sum -= num;
    return sum;
}

console.log(sumUp(2,3,4,1,3,6)); //> 19
console.log(subTract(2,3,4,6,3)); //> -18


const outF = ()=>{
    const inF = ()=>{

    }
}
//>inFn ? Noo!






