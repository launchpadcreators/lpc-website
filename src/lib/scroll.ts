// Scroll-driven sections call render() through this instead of on every scroll event:
// it only runs while the section is on screen or within one screen of it, and at most once per animation frame.
// It also runs once when the section enters or leaves that zone, so the section is left at its exact start/end state.
export function onScrollInView(el: Element, render: () => void, margin = "100% 0px") {
  let near = false;
  let queued = false;
  const run = () => { queued = false; render(); };
  const queue = () => { if (!queued) { queued = true; requestAnimationFrame(run); } };
  new IntersectionObserver(([en]) => { near = en.isIntersecting; queue(); }, { rootMargin: margin }).observe(el);
  addEventListener("scroll", () => { if (near) queue(); }, { passive: true });
  addEventListener("resize", queue);
  return queue;
}

// Adds "inview" to el while it is on screen, so CSS can pause looping animations when it isn't
// (.x :is(...) { animation-play-state: paused } / .x.inview :is(...) { animation-play-state: running }).
export function markInView(el: Element, margin = "0px") {
  new IntersectionObserver(([en]) => el.classList.toggle("inview", en.isIntersecting), { rootMargin: margin }).observe(el);
}
