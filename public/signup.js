const formElem = document.querySelector('form');
const nameElem = document.querySelector('form input[name="name"]');
const messageElem = document.querySelector('form input[name="message"]');
const responseElem = document.querySelector('.response');

formElem.addEventListener('submit', function(e) {
   e.preventDefault();
   fetch('/api/signup', {
     method: 'POST', 
     body: JSON.stringify({
       name: nameElem.value,
       message: messageElem.value
     })
   })
     .then( response => response.json() )
     .then( result => { 
        responseElem.innerHTML = `Welcome on board, you are supporter number ${result.number}!`;
      })
     .catch( err => { console.error('oops', err ); } );
});

