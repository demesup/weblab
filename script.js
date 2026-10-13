/* 
  Attribution: Based on layout logic by ddly (https://codepen.io/ddly/pen/nLvoXb)
*/

const planet = document.querySelector('.planet');
const searchInput = document.getElementById('soul-search');
const searchBtn = document.getElementById('search-btn');

document.addEventListener('mousemove', (e) => {
  const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
  const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
  
  planet.parentElement.style.perspective = "1000px";
  planet.style.transform = `rotateX(${yAxis}deg) rotateY(${xAxis}deg)`;
});

function transmitSignal() {
  const query = searchInput.value.trim();
  if (query) {
    alert(`Signal transmitted into the void: "${query}"\nNo response received... yet.`);
    searchInput.value = '';
  } else {
    alert("The void requires words, lost soul.");
  }
}

searchBtn.addEventListener('click', transmitSignal);
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    transmitSignal();
  }
});
