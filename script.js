const planet = document.querySelector('.planet');

document.addEventListener('mousemove', (e) => {
  const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
  const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
  
  planet.style.transform = `rotateX(${yAxis}deg) rotateY(${xAxis}deg)`;
});

// ===== Random feature: twinkling stars + click for shooting stars =====
const STAR_COUNT = 120;

for (let i = 0; i < STAR_COUNT; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  const size = Math.random() * 2 + 1;
  star.style.width = size + 'px';
  star.style.height = size + 'px';
  star.style.left = Math.random() * 100 + 'vw';
  star.style.top = Math.random() * 100 + 'vh';
  star.style.animationDelay = Math.random() * 3 + 's';
  star.style.animationDuration = 1.5 + Math.random() * 2 + 's';
  document.body.appendChild(star);
}

document.addEventListener('click', (e) => {
  if (e.target.closest('a')) return; // don't block the link

  const shooting = document.createElement('div');
  shooting.className = 'shooting-star';
  shooting.style.left = e.clientX + 'px';
  shooting.style.top = e.clientY + 'px';
  document.body.appendChild(shooting);

  setTimeout(() => shooting.remove(), 1000);
});
