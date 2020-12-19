
/* Selecting elements */
//querySelector , getElementById //> one element
//querySelectorAll , getElementsByTagName getElementsByClassName //> multiple elements

let head = document.head;
let body = document.body;
let htmlEl = document.documentElement;
const firstLi = document.querySelector('ul li:first-of-type');
const lastLi = document.querySelector('ul li:last-of-type');
const h1 = document.querySelector('h1');
h1.textContent = "Some New Text";
h1.className = 'title';
h1.style.color = 'red';
h1.style.backgroundColor = '#222222';

//
//value attribute don't change in the html but className and id do !!
//i.e el.value = 'some new value' 
//but the ui will change in any case !
//although: 
h1.setAttribute('value', 'new Value');//will change the value on the html but:
//the Ui will stay the same, and there for if we'll choose it with selector
// the value will be the old one
//but if we do want to access this new value we'll use el.getAttribute('value');
//

//
// const listItems = document.querySelectorAll('li');
// const listItems = document.getElementsByTagName('li');

// for(const listItem of listItems)
//     console.dir(listItem);
//the different is if we add an element to the list : 
//it'll be reflected in getByTag only!! and in all the getBy selectors
//

//
//children and childNodes
//childNodes containes the text nodes (the text between the tags include spaces)
//also firstChild and lastChild for childNode or firstElementChild lastElementChild for children
//also (li:last-of-type || first-of-type)
const ul = document.querySelector('ul');
const liItems = ul.children;
// const liItems = ul.childNodes;

for (let i = 0; i < liItems.length; i++) 
    console.dir(liItems[i])
//

//
//parentNode and parentElement //> nearest parent node and Parent elememnt node
let li = document.querySelector('li')
// console.dir(li.parentNode); //> ul
// console.dir(li.parentElement); //> ul
//also 
// console.dir(li.closest('ul')) //> ul
//

//
//previosSibling and previous ElementSibling
//nextSibling and nextSiblingElement
//get the next and previos sibling node !
console.dir(ul.nextElementSibling); //> input
console.dir(ul.nextSibling); //> #text /> text node
//

/* end of selecting elements */

/* Style */
const section = document.querySelector('section')

//higher priority!!
// section.style.backgroundColor = "#828282";
// section.style.textAlign = 'center';

//lower priority
section.className = "";
const button = document.querySelector('button')

button.addEventListener('click', ()=>{
    if(section.className === 'red-bg visible')
        section.className = 'red-bg invisible'
    else
        section.className = 'red-bg visible'

    // section.classList.toggle('visible')
});

/* adding elements */
//check out the remove !

ul.innerHTML += "<li>Item 4</li>"; //> rerendering all the list, not Good !
ul.insertAdjacentHTML('beforeend', '<li>Item 5 </li>'); //> won't rerender
//also afterend afterbegin beforeend and beforebegin
let lastli = ul.lastChild;//>can't change style or add event listener


let newLi = document.createElement('li');
newLi.textContent= 'Item 6';
ul.appendChild(newLi);

newLi.style.color = 'red';//>can change style or add event listener
newLi = document.createElement('li'); //> the last li is still there
newLi.textContent = 'Item 0';
newLi.style.backgroundColor='blue'

ul.prepend(newLi); 
ul.lastElementChild.before(newLi); //> i moved it !!
//also after replaceWith() and replaceChild()
//also appent(one,two)
//also insertAdjecentElement('afterend', element) //> for all browser support

//coping element
newLi.cloneNode(false) //> returns a copy
// and if true the descended children also will be cloned

//removing elements
// ul.remove();

//also removeChild like:
// ul.parentElement.removeChild(ul);//> for explorer support :-)





























































