import { useState, useEffect, useRef } from "react";

/**
 * MovieInfoPopover
 *
 * A small circular "i" button that morphs into a rectangular popover
 * showing movie details. Pure CSS transition — no Framer Motion.
 *
 * Closes on: same-button click, outside mousedown, Escape key.
 * Flips left if too close to the right edge of the viewport.
 */
export default function MovieInfoPopover({ name, year, type, imdbRating, plot, genres }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openLeft, setOpenLeft] = useState(false);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);

  /* ── Close on Escape ──────────────────────────────────────────────────── */
  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  /* ── Close on outside click ───────────────────────────────────────────── */
  useEffect(() => {
    if (!isOpen) return;
    function onMouseDown(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [isOpen]);

  /* ── Toggle + viewport-edge detection ────────────────────────────────── */
  function handleToggle(e) {
    e.stopPropagation();
    if (!isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const POPOVER_WIDTH = 290; // keep in sync with CSS --info-popover-width
      const GAP = 12;
      setOpenLeft(window.innerWidth - rect.right < POPOVER_WIDTH + GAP);
    }
    setIsOpen((prev) => !prev);
  }

  /* ── Derived class strings ────────────────────────────────────────────── */
  const morphCls = [
    "info-popover-morph",
    isOpen ? "info-popover-morph--open" : "",
    openLeft ? "info-popover-morph--left" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const contentCls = [
    "info-popover-content",
    isOpen ? "info-popover-content--visible" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    /* Wrapper keeps trigger + popover in the same stacking context */
    <div className="info-popover-wrapper" ref={containerRef}>

      {/* ── Trigger ─────────────────────────────────────────────────────── */}
      <button
        ref={triggerRef}
        className="movie-card-info"
        type="button"
        aria-label="Movie details"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={handleToggle}
      >
        {/* Inline SVG "i" info-circle — zero dependencies */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="12" cy="12" r="10" />
          {/* dot above the stem */}
          <circle cx="12" cy="8" r="0.5" fill="currentColor" />
          {/* stem */}
          <line x1="12" y1="12" x2="12" y2="16" />
        </svg>
      </button>

      {/* ── Morphing popover ─────────────────────────────────────────────── */}
      <div
        className={morphCls}
        role="dialog"
        aria-modal="true"
        aria-label={"Details for " + (name || "movie")}
        aria-hidden={!isOpen}
      >
        {/* Content fades in after the shape has finished growing */}
        <div className={contentCls}>
          <p className="info-popover-movie-name">{name || "—"}</p>

          <dl className="info-popover-list">
            {year && (
              <>
                <dt className="info-popover-label">Year</dt>
                <dd className="info-popover-value">{year}</dd>
              </>
            )}
            {type && (
              <>
                <dt className="info-popover-label">Type</dt>
                <dd className="info-popover-value info-popover-value--capitalize">{type}</dd>
              </>
            )}
            {imdbRating && (
              <>
                <dt className="info-popover-label">IMDb</dt>
                <dd className="info-popover-value info-popover-value--accent">&#9733; {imdbRating}</dd>
              </>
            )}
            {genres && (
              <>
                <dt className="info-popover-label">Genre</dt>
                <dd className="info-popover-value">{genres}</dd>
              </>
            )}
            {plot && (
              <>
                <dt className="info-popover-label info-popover-label--block">Plot</dt>
                <dd className="info-popover-value info-popover-value--plot">{plot}</dd>
              </>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
}
