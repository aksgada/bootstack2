import { useEffect, useRef } from "react";

/**
 * useReveal
 * ---------------------------------------------------------
 * Attaches an IntersectionObserver to the returned ref and
 * adds an "in-view" class the first time the element enters
 * the viewport. Pair with the ".reveal" CSS helper classes
 * (see style/Style.css or the per-component stylesheets).
 *
 * Automatically skips animation for users who have
 * "prefers-reduced-motion: reduce" set — the element is
 * simply marked as visible immediately.
 *
 * @param {Object} [options]
 * @param {number} [options.threshold=0.15] - visibility ratio to trigger reveal
 * @param {string} [options.rootMargin="0px 0px -10% 0px"] - IO root margin
 * @param {boolean} [options.once=true] - only reveal once, or toggle every time
 */
export default function useReveal({
  threshold = 0.15,
  rootMargin = "0px 0px -10% 0px",
  once = true,
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      node.classList.add("in-view");
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.classList.add("in-view");
            if (once) observer.unobserve(node);
          } else if (!once) {
            node.classList.remove("in-view");
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}
