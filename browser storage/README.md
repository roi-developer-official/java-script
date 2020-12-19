const userId = 'u123';

localStorage.clear();
getItem();

session storage lives as long as the current page is open.

set cookie: 
document.cookie = '' --> will add not replace (or if it has the same key)
ex: dpcument.cookie =`uid=${uid}`
cookies are available if the browser is served by a server. i think liveserver also.
get cookie:document.cookie
another ex:
const user = {name:'me', age : 12};
document.cookie = `user=${JSON.stringify(user)}`;

