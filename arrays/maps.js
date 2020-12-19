/*maps
1: stored key value pair
2: any value is allowed
3: iterable
4: order is gurenteed
5: duplicate keys are not allowed
6: access value by key
*/

const person1 = {name: 'Max'};
const person2 = {name: 'Manuel'};
const personData = new Map([[person1, [{date: 'today', price: 10}]]]);
personData.set(person2, [{date: 'two weeks ago', price : 12}]);
console.log(personData.get(person1)); //> [ { date: 'today', price: 10 } ]

for(const [key,value] of personData.entries()){
    console.log(key, value);
}

for(const key of personData.keys()){
    console.log(key);
}
for(const value of personData.values()){
    console.log(value);
}

/*methods */
//clear --> clears all data from a map
//many more

