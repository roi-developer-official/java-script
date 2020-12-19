
access data on an element:
the attribute start with data-
to add dynamicly:
el.dataset.data-somthing = 'someData';
to access it:
el.dataset.dataName; -> note the camel casing.

sizes and positions:
el.getBoundingClientRect();
this will include: x pos , y pos, all directions (left, right ...), width and height, top, bottom.
x and y are reffers top the top left corner.
botton - the bottom of the element.
top - the top left corner of the element.

offsetTop:
el.offsetTop.
the offset top from the paren elemtent
it will give the distance between the top most point of the el to the top of the parent
same for offsetLeft the left most point of the el to the left of the screen.

clientTop:
the poisiton like offset but with out border or scroll bars.
same for clientLeft.

offsetWidth:
intaire width of the el include scroll bars and border.
same for offsetHeight.

clientWidth:
inner width without border and scroll bar.
same for clientHeight.

scrollHeight:
thie intire height includeing the non visible parts.
same for scrollWidth.

scrollTop:
gives information how much you scrolled content in the box.

you can find info in mdn.

window.innerWidth:
width of the window.
same for window.innerHeight.
includes the scroll bar, there for a better way:
document.documentElement.clientWidth.
this will not include the scroll bar.
same for document.documentElement.clientHeight.

positioning the el: 
toolTipElement.style.position = 'absolute';
toolTipElement.style.left = x + 'px';
toolTipElement.style.top = y  + 'px';

control scrolling:
el.scrollTo(x,y);
also:
scrollBy(x,y); ->scroll from the current position.
scrool into view:
elememt.scrollIntoView();
behavior: supports in chrome and firefox
elememt.scrollIntoView({behavior: 'smooth' });
also
scrollTo({top:50, behavior: 'smooth'});


controlind dom:
const tooltipTemplate = document.getElementById('tooltip');
const tooltipBody = document.importNode(tooltipTemplate.content, true);
tooltipBody.querySelector('p').textContent= this.text;
toolTipElement.append(tooltipBody);
this.elememt = toolTipElement;

on this element:
<template id="tooltip">
    <h2>More Info</h2>
    <p></p>
</template>


creating a script:
const script = docuemnt.createElement('script');
script.textContent = 'alert('hello')';
document.head.appent(script);
also:
script.src = "../app.js';
script.defer = true;
document.head.appent(script);

const timerId = setTimeout(this.func, 3000, optional: [arguments pased to the function]);
clearTimeout(timerId); -> stops the timeout.
const intervalId = setInterval(()=>{}, 1000, [arguments pased to the function]);
clearInterval(intervalId);

* location:
location.href = "http://www.google.com' -> will switch to that page.
location.replace(url) -> disable the back button.
location.assign(url) -> same as href
location.host -> which host the page is running.
location.origin -> full domain.
location.pathname -> the path 

* history:
history.back() -> go back.
history.forward() -> go forward.
history.length -> how much you can go back.
history.go(5) -> go 5 pages back.

* navigator:
navigator.userAgent -> somt details about the browser and the computer.
navigator.clipboard -> add stuff to the clipboard
navigator.geolocation.getCurrentPosition((data)=>{ console.log(data); });

* date:
const date = new Date() -> current date and time.
date.getDay(); -> and many more.
date.getTime(); -> from 1970 in ms.
const date2 = new Date('07/11/19');
const diff = ((date - date2) / 1000 / 60 / 60 / 24); -> the diff in days:
by 1000 - have the diffrent by second's
by 60 - have the different by hour's
by 60 - by minutes.
by 24 - by days.

* error:
throw new Error('something went wrong'); --> will give moew information about the error
also:
throw 'an Error';
throw {};
properties:
message.
stack.
and you can add stuff like:
const error = new Error('wrong');
error.code = 404;

* events:
button.onclick = function() {};
button.removeEventListener('click', func);

for adding and also removing event listener that uses bind:
const boundFb = functionName.bind(this);
button.addEventListener('click', boundFn);

event properies:
clientX,Y - the mounse coordinates.
offsetX,Y - the coordinates on the button itself.

for mouseenter,leave,an so on..
relatedTarget : the last element that the cursor was on before the event.

for scroll events:
window.addEventListener('scroll', ()=>{});

infinite scrolling:
let curElementNumber = 0;
function scrollHandler() {
    const distanceToBottom = document.body.getBoundingClientRect().bottom;
 
    if (distanceToBottom < document.documentElement.clientHeight + 150) {
        const newDataElement = document.createElement('div');
        curElementNumber++;
        newDataElement.innerHTML = `<p>Element ${curElementNumber}</p>`;
        document.body.append(newDataElement);
    }
}
window.addEventListener('scroll', scrollHandler);

form submition:
select the form.
form.addEventListener('submit',()=>{});

capturing and bubbling: 2 phases that an event has.
if you want to change the order of click event on nested elements.
assume that the div has a button in it.
div.addEventListener('click', ()=>{}, true);
the event listener on the div will run first.
the bubbling phase is when 
lets say we want to listen only event accures on the button and not on the div:
button.addEventListener('click', (event)=>{
    event.stopPropagation();
});
if tou have more than one event listener on the button and you want rhem to not run:
event.stopImediatePropagation();

a second way to add event listeners on an ul (basically good for lists):
instead of adding lisener on the li with forEach.
you select the ul and than add event listener like this:
list.addEventListener('click', (event)=>{
    event.target.closest('li').classList.add('active');
});
we use the closest in case that there are more than text inside the li (like p or h2),
and the closest will give us the closest li ancestor (if we pressed on the li the this li will be given).
if we dont we have more than text inside the li we can simply add event liseter to the event.target.
a side note: event.currentTarget reffres to the element which the listener is attatch to and in this case the list ul,
as well as the 'this' key word in case of using function(event){}, (incase of arrow function that will be the window object).

triggering dom elements progreammatically"
form.submit();
button.click();

adding draggable to element:
1: by property in the html: dragable="true";
2: by setting the property draggable to true.
listen to dragstart event.














































