/*
Sets : 
1: dupliacates are not allowed
2: no indexed based access
3: iterable
*/
const ids = new Set([2,4,1]);


//mathods: 
//has(value) //> return true or false if the set have that value
//add(value) //> add value to the set
//entries //> the new entry key array
//delete(value) //> delete the value

for(const entry of ids.entries()){
    console.log(entry[1]);
}
// [ 2, 2 ]
// [ 4, 4 ]
// [ 1, 1 ]
//entry[1]
// 2
// 4
// 1

//WeakSets and WeakMap: 
//not like set in weakset the data will be removed from the weakset if the pointer that stored in the weakset has been deleted
//same as in Weakmap and map
let person = {name: 'Max'};
let persons = new WeakMap();











