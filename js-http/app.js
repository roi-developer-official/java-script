const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const fetchButton  = document.querySelector('#available-posts button');
const postList = document.querySelector('ul');

function sendHttpRequest(method, url ,data) {
    //XMLHttp api:
    // const promise = new Promise((resolve, reject) => {
        // const xhr = new XMLHttpRequest();
        // xhr.setRequestHeader('Content-Type', 'application/json');
        // xhr.open(method, url);
        // xhr.responseType = 'json';

        // xhr.onload = function () {
        //     resolve(xhr.response)
        // }

        // xhr.onerror = function(){
        //     console.log(xhr.status);
        //     console.log(xhr.response);
        // }

        // xhr.send(JSON.stringify(data));
        // });
        // return promise;
    
    //fetch api:
       return fetch(url,{
           method: method,
           body : data
       }).then(res=>{
           if(res.status >= 200 && res.status < 300)
            //return plain text / blob (file) / json
           return res.json();
           else{
              return res.json().then(errDate=>{
                   throw new Error('something went wrong on the server side!')
               })
           }
       }).catch(()=>{
           throw new Error('Somthing went wrong!')
       })

    }

function fetchPosts() {
    sendHttpRequest('GET', 'https://jsonplaceholder.typicode.com/posts').then(res => {
        const listOfPosts = res;
        for (const post of listOfPosts) {
            const postEl = document.importNode(postTemplate.content, true);
            postEl.querySelector('h2').textContent = post.title.toUpperCase();
            postEl.querySelector('p').textContent = post.body;
            postEl.querySelector('li').id = post.id;
            listElement.append(postEl);
        }
    })
    .catch(err=>
        alert(err.message)
    );
}

function createPost(title,content){
    const userId = Math.random();
  
    //collect data from the form
    const fd = new FormData(form)
    //or addd manualy
    // fd.append('title', title);
    // fd.append('body', content);
    fd.append('userId', userId)
    sendHttpRequest('POST','https://jsonplaceholder.typicode.com/posts',fd);
}
fetchPosts();

fetchButton.addEventListener('click',fetchPosts);
form.addEventListener('submit', e=>{
    e.preventDefault()
    const enteredTitle =  e.currentTarget.querySelector('#title').value
    const enteredContent =  e.currentTarget.querySelector('#content').value
    createPost(enteredTitle,enteredContent);
});

postList.addEventListener('click', e=>{
    if(e.target.tagName === 'BUTTON'){
        const postId = e.target.closest('li').id;
        sendHttpRequest('DELETE',`https://jsonplaceholder.typicode.com/posts/${postId}`);
    }
});








