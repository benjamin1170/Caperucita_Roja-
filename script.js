let videoActual = 1;
const totalVideos = 4; // número total de cuentos

// Fondo animado con luciérnagas
window.addEventListener('load', () => {
  const canvas = document.getElementById('luciérnagas');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const fireflies = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.6,
    dy: (Math.random() - 0.5) * 0.6,
    alpha: Math.random(),
    da: 0.02 * (Math.random() + 0.5),
  }));

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const f of fireflies) {
      f.x += f.dx;
      f.y += f.dy;
      f.alpha += f.da;
      if (f.alpha <= 0 || f.alpha >= 1) f.da *= -1;
      if (f.x < 0 || f.x > canvas.width) f.dx *= -1;
      if (f.y < 0 || f.y > canvas.height) f.dy *= -1;

      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,200,${f.alpha})`;
      ctx.shadowBlur = 18;
      ctx.shadowColor = 'rgba(255,255,200,1)';
      ctx.fill();
    }
    requestAnimationFrame(loop);
  }
  loop();
});

// Funciones del visor de videos
function abrirVideo(n) {
  videoActual = n;
  const visor = document.getElementById('visor');
  const video = document.getElementById('videoPlayer');

  video.src = `assets/videos/video${n}.mp4`;
  visor.classList.remove('oculto');
  video.play();
}

function cerrarVideo() {
  const visor = document.getElementById('visor');
  const video = document.getElementById('videoPlayer');

  video.pause();
  video.currentTime = 0;
  visor.classList.add('oculto');
}

function cambiarVideo(direccion) {
  videoActual += direccion;

  if (videoActual < 1) videoActual = totalVideos;
  if (videoActual > totalVideos) videoActual = 1;

  const video = document.getElementById('videoPlayer');
  video.src = `assets/videos/video${videoActual}.mp4`;
  video.play();
}
