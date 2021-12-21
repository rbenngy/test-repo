console.log('Client Side JS file is loaded');


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msgOne = document.querySelector('#message-1');
const msgTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit',(ev) => {
    ev.preventDefault();
    msgOne.textContent = 'Loading...';
    msgTwo.textContent = '';

    const location = search.value
    fetch('http://localhost:3000/weather?address=' + encodeURIComponent(location)).then((res) => {
   res.json().then((data) => {
       if (data.error){
            msgOne.textContent = data.error;
       } else {
            msgOne.textContent = data.location;
            msgTwo.textContent = data.forecast;
       }
       
   })
})    
})