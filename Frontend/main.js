document.addEventListener('DOMContentLoaded', () => {
  const title = document.createElement('h1');
  title.innertext = 'To-Do List';

  const addButton = document.getElementById('addbutton'); // this is working
  const input = document.getElementById('addtodo');

  function onChange(e) {
    e.preventDefault();
    console.log(e.target.value);
  }

  addButton.addEventListener('click', (e) => {
    if (input.value) {
      console.log(input.value);
      fetch('http://localhost:3000/addnew', {
        method: 'POST',
        body: JSON.stringify({
          description: input.value,
          completed: false,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((data) => data.json())
        .catch((error) => console.log(`Error: ${error}`));
    }
  });

  input.addEventListener('input', (e) => {
    e.preventDefault();
    console.log(e.target.value);
  });

  // ADD NEW TODO
  function addToList(e) {
    e.preventDefault();
    if (e) alert('button clicked! way to go!');
  }

  // UPDATE

  // delete
  // CHECKOFF
});
