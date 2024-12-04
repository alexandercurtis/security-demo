const formElem = document.querySelector('form');
const nameElem = document.querySelector('form input[name="name"]');
const passwordElem = document.querySelector('form input[name="password"]');
const responseElem = document.querySelector('.response');

formElem.addEventListener('submit', function(e) {
   e.preventDefault();
   fetch('/api/login', {
     method: 'POST', 
     body: JSON.stringify({
       name: nameElem.value,
       password: passwordElem.value
     })
   })
     .then( response => response.json() )
     .then( result => { 
        if( result.success ){
          responseElem.innerHTML = 'Success. You are now logged in!';
        }
        else {
          responseElem.innerHTML = 'Log in failed. Please check your details.';
        }
     })
     .catch( err => { console.error('oops', err ); } );
});

