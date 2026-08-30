// Single orchestrated moment for the page: the waveform draws itself in,
// then a dot travels along it once, like a signal being read off a sensor.
// Respects prefers-reduced-motion by skipping the animation entirely.

const path = document.getElementById("wave-path");
const dot = document.getElementById("wave-dot");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (path && dot) {
  const length = path.getTotalLength();

  if (prefersReducedMotion) {
    // Just show the finished state — no animation.
    const end = path.getPointAtLength(length);
    dot.setAttribute("cx", end.x);
    dot.setAttribute("cy", end.y);
  } else {
    // 1. Draw the line in using stroke-dashoffset.
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    const drawDuration = 1100; // ms
    const startTime = performance.now();

    function drawFrame(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / drawDuration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);

      path.style.strokeDashoffset = length * (1 - eased);

      const point = path.getPointAtLength(length * eased);
      dot.setAttribute("cx", point.x);
      dot.setAttribute("cy", point.y);

      if (progress < 1) {
        requestAnimationFrame(drawFrame);
      } else {
        loopDot();
      }
    }

    // 2. After the initial draw, let the dot gently sweep back and forth
    // along the finished line — a quiet, looping "signal read" motion.
    function loopDot() {
      const sweepDuration = 3200; // ms, one direction
      let sweepStart = performance.now();
      let forward = true;

      function sweepFrame(now) {
        const elapsed = now - sweepStart;
        let progress = Math.min(elapsed / sweepDuration, 1);
        const eased = 0.5 - 0.5 * Math.cos(progress * Math.PI); // ease-in-out

        const t = forward ? eased : 1 - eased;
        const point = path.getPointAtLength(length * t);
        dot.setAttribute("cx", point.x);
        dot.setAttribute("cy", point.y);

        if (progress < 1) {
          requestAnimationFrame(sweepFrame);
        } else {
          forward = !forward;
          sweepStart = now;
          requestAnimationFrame(sweepFrame);
        }
      }

      requestAnimationFrame(sweepFrame);
    }

    requestAnimationFrame(drawFrame);
  }
}
