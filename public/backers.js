function loadBackers() {
  const backersElem = document.querySelector('#backers');
  fetch('/api/backers')
    .then( response => response.json() )
    .then( backers => {
       const children = backers.map( backer => {
         const li = document.createElement( 'li' );
         li.innerHTML = `<strong>${backer.name}</strong>: ${backer.message}`;
         return li;
       });
       backersElem.replaceChildren(...children);
    });
}

loadBackers();
