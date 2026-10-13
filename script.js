const planet = document.querySelector('.planet');

document.addEventListener('mousemove', (e) => {
  const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
  const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
  
  planet.style.transform = `rotateX(${yAxis}deg) rotateY(${xAxis}deg)`;
});
