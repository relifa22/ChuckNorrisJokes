document.getElementById('searchInput').addEventListener('input', function() {
  const searchTerm = this.value.trim();
  const jokesContainer = document.getElementById('jokesContainer');
  while (jokesContainer.firstChild) {
    jokesContainer.removeChild(jokesContainer.firstChild);
  }

  if (!searchTerm) {
    return;
  }
  
  fetch(`https://api.chucknorris.io/jokes/search?query=` + encodeURIComponent(searchTerm))
    .then(response => response.json())
    .then(data => {
      if (data.total > 0) {
        data.result.forEach(joke => {
          const jokeElement = document.createElement('div');
          jokeElement.classList.add('joke');
          jokeElement.textContent = joke.value;
          jokeElement.style.backgroundColor = getRandomColor();
          jokesContainer.appendChild(jokeElement);
        });
      } else {
        const messageElement = document.createElement('div');
        messageElement.classList.add('joke');
        messageElement.textContent = 'Niekas nerasta';
        jokesContainer.appendChild(messageElement);
      }
    })
    .catch(error => {
      console.error('Klaida:', error);
    });
});

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
