const div = document.querySelector('div');
const button = document.querySelector('button');
const listItems = document.querySelector('ul');

div.addEventListener('mousemove', ()=>{
    console.log('DIV');
},true);


button.addEventListener('mousemove', (event)=>{
    // event.stopPropagation();
    console.log('BUTTON');
});

listItems.addEventListener('click', event=>{
    event.target.closest('li').classList.toggle('active');
});

