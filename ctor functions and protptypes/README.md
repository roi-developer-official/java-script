
ctor functions:
function Name(){
    this.age = 12;
    this.name="name";
    this.greet = function(){
        console.log('hello');
    }
}

const p1 = new Name();
p1.greet();


proptoypes:
used as a fallback object that also have a protptype.
if js can't find a property on an object it'll look all thay way in the prototype chain.
way to add a protptype:
1) Person.prototype = {
    printAge(){
        console.log()
    }
}
2) Person.prototype.printAge = function(){
    console.log()
}

creating a new instance using prototypes:
const p2 = new p.__proto__.constructor();


