import { useId, useMemo } from "react";

/* ── the corridor ────────────────────────────────────────────────
 * Two rails of cards ride from far behind the screen toward the
 * viewer. Perspective alone does the work that looks like two
 * animations: as a card's z grows it gets bigger *and* its screen x
 * sweeps outward from the vanishing point, because the projection
 * scales position and size by the same factor.
 *
 * Three things shape it, and each one fixes a specific artefact:
 *
 * 1. Depth is authored as *apparent size*, geometrically — each card
 *    is a constant ratio bigger than the one behind it, all the way
 *    out.
 * 2. The rails open hard in the first stretch and then hold
 *    (`fan` > 1), so the ribbon leaves the centre as a flat band,
 *    bends once, and only then runs out on the diagonal.
 * 3. Neither end of the loop is ever on screen — a card is born
 *    across the axis (`railBirth` is negative) so the centre never
 *    opens up as a visible gap.
 *
 * Every length is in `cqw` — a percentage of the container's width —
 * so the whole corridor keeps its proportions at any size.
 * ─────────────────────────────────────────────────────────────── */

const PATH = {
  perspective: 30,
  cardWidth: 18,
  cardHeight: 25,
  cardRadius: 0.4,
  birthHeight: 2.6,
  exitHeight: 46,
  railBirth: -11,
  railExit: 44,
  fan: 3.3,
  turnBirth: 6,
  turnExit: 28,
  stops: 24,
};

/** Sample the path once so the CSS keyframes trace the real curve. */
function keyframes(dir, name, p) {
  const steps = [];
  for (let s = 0; s <= p.stops; s++) {
    const u = s / p.stops;
    // Geometric in apparent size, so consecutive cards keep a constant size
    // ratio and the ribbon stays solid at both ends.
    const scale =
      (p.birthHeight / p.cardHeight) * Math.pow(p.exitHeight / p.birthHeight, u);
    const z = p.perspective * (1 - 1 / scale);
    const rail =
      p.railExit - (p.railExit - p.railBirth) * Math.pow(1 - u, p.fan);
    const turn = p.turnBirth + (p.turnExit - p.turnBirth) * u;
    steps.push(
      `${(u * 100).toFixed(2)}%{transform:translate3d(${(dir * rail).toFixed(
        2,
      )}cqw,0,${z.toFixed(2)}cqw) rotateY(${(-dir * turn).toFixed(2)}deg)}`,
    );
  }
  return `@keyframes ${name}{${steps.join("")}}`;
}

/**
 * ImageStreamHero
 *
 * Two mirrored rails of images ride out of a vanishing point toward
 * the viewer, purely with CSS 3D transforms + container queries.
 *
 * Props:
 *  - images   {Array<{src, alt}>}  Images cycled onto both rails.
 *  - cards    {number}             Cards per rail at once. Default 9.
 *  - speed    {number}             Seconds for one card's full trip. Default 18.
 *  - axis     {number}             Vertical placement (%) of the vanishing point. Default 55.
 *  - path     {object}             Overrides for the corridor geometry (see PATH above).
 *  - children {ReactNode}          Content layered on top of the corridor.
 *  - className {string}            Extra class(es) merged onto the outer wrapper.
 */
export default function ImageStreamHero({
  images = [],
  cards = 9,
  speed = 18,
  axis = 55,
  path,
  children,
  className = "",
  ...props
}) {
  // useId() returns something like ":r0:" — strip the colons so it's a
  // valid CSS identifier fragment.
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const rightAnim = `ish-r-${rawId}`;
  const leftAnim = `ish-l-${rawId}`;
  const cardClass = `ish-c-${rawId}`;

  const p = useMemo(() => ({ ...PATH, ...path }), [path]);

  const css = useMemo(
    () =>
      `${keyframes(1, rightAnim, p)}${keyframes(-1, leftAnim, p)}` +
      // Pausing rather than disabling keeps the corridor whole: every card is
      // already dropped mid-flight by its negative delay, so it freezes as a
      // finished still instead of collapsing onto the axis.
      `@media(prefers-reduced-motion:reduce){.${cardClass}{animation-play-state:paused}}`,
    [rightAnim, leftAnim, cardClass, p],
  );

  return (
    <div
      className={`image-stream-hero ${className}`.trim()}
      {...props}
      style={{ containerType: "inline-size", ...props.style }}
    >
      <style>{css}</style>

      <div
        aria-hidden="true"
        className="image-stream-hero-scene"
        style={{
          perspective: `${p.perspective}cqw`,
          perspectiveOrigin: `50% ${axis}%`,
        }}
      >
        <div
          className="image-stream-hero-rails"
          style={{ transformStyle: "preserve-3d" }}
        >
          {[rightAnim, leftAnim].map((animName) =>
            Array.from({ length: cards }, (_, i) => {
              // Both rails walk the same sequence, so the left side mirrors
              // the right at every depth.
              const img = images[i % Math.max(images.length, 1)];
              return (
                <div
                  key={`${animName}-${i}`}
                  className={`${cardClass} image-stream-hero-card`}
                  style={{
                    left: "50%",
                    top: `${axis}%`,
                    width: `${p.cardWidth}cqw`,
                    height: `${p.cardHeight}cqw`,
                    marginLeft: `${-p.cardWidth / 2}cqw`,
                    marginTop: `${-p.cardHeight / 2}cqw`,
                    borderRadius: `${p.cardRadius}cqw`,
                    animation: `${animName} ${speed}s linear infinite`,
                    // Negative delay drops each card mid-flight, so the
                    // corridor is already full on the first frame.
                    animationDelay: `${-(i * speed) / cards}s`,
                    backfaceVisibility: "hidden",
                  }}
                >
                  {img ? (
                    <img
                      src={img.src}
                      alt={img.alt ?? ""}
                      loading="lazy"
                      decoding="async"
                      className="image-stream-hero-img"
                      draggable="false"
                    />
                  ) : null}
                </div>
              );
            }),
          )}
        </div>
      </div>

      {children}
    </div>
  );
}