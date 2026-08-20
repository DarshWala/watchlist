// frontend/src/components/RatingPopover.jsx
import { useState, useEffect, useRef } from "react";

/**
 * RatingPopover
 *
 * A small circular star button that morphs into a rectangular form
 * for setting a personal rating (1-10) and a free-text note.
 * Mirrors MovieInfoPopover's morph mechanics — pure CSS, no libraries.
 *
 * Anchored bottom-LEFT of the tile (MovieInfoPopover owns bottom-right).
 */
export default function RatingPopover({ id, userRating, notes, onSave }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openRight, setOpenRight] = useState(true); // default: grows rightward
  const [draftRating, setDraftRating] = useState(userRating ?? null);
  const [draftNotes, setDraftNotes] = useState(notes ?? "");

  const containerRef = useRef(null);
  const triggerRef = useRef(null);

  /* Keep draft in sync if the underlying movie data changes elsewhere
     while the popover is closed (e.g. rating cleared from another view) */
  useEffect(() => {
    if (!isOpen) {
      setDraftRating(userRating ?? null);
      setDraftNotes(notes ?? "");
    }
  }, [userRating, notes, isOpen]);

  /* Close on Escape */
  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  /* Close on outside click */
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

  function handleToggle(e) {
    e.stopPropagation();
    if (!isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const POPOVER_WIDTH = 270; // keep in sync with CSS
      const GAP = 12;
      // Growing rightward from a left-anchored trigger — check there's
      // enough room to the right; otherwise flip to grow leftward.
      setOpenRight(window.innerWidth - rect.left > POPOVER_WIDTH + GAP);
    }
    setIsOpen((prev) => !prev);
  }

  function handleSave(e) {
    e.preventDefault();
    onSave(id, draftRating, draftNotes);
    setIsOpen(false);
  }

  function handleCancel() {
    setDraftRating(userRating ?? null);
    setDraftNotes(notes ?? "");
    setIsOpen(false);
  }

  const morphCls = [
    "rating-popover-morph",
    isOpen ? "rating-popover-morph--open" : "",
    !openRight ? "rating-popover-morph--flip" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const contentCls = [
    "rating-popover-content",
    isOpen ? "rating-popover-content--visible" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="rating-popover-wrapper" ref={containerRef}>
      <button
        ref={triggerRef}
        className="movie-card-rate"
        type="button"
        aria-label={userRating ? `Edit rating, currently ${userRating}` : "Add rating"}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={handleToggle}
      >
        {userRating ? (
          <span className="movie-card-rate-value">{userRating}</span>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M12 2.5l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.9-6.2 3.9 1.6-7-5.4-4.7 7.1-.6z" />
          </svg>
        )}
      </button>

      <div
        className={morphCls}
        role="dialog"
        aria-modal="true"
        aria-label="Rate this movie"
        aria-hidden={!isOpen}
      >
        <form className={contentCls} onSubmit={handleSave}>
          <p className="rating-picker-label">YOUR RATING</p>
          <div className="rating-picker-buttons">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                className={`rating-pip small${draftRating === n ? " filled" : ""}`}
                onClick={() => setDraftRating(n)}
                aria-pressed={draftRating === n}
                aria-label={`Rate ${n} out of 10`}
              >
                {n}
              </button>
            ))}
          </div>
          {draftRating !== null && (
            <button
              type="button"
              className="clear-rating-btn"
              onClick={() => setDraftRating(null)}
            >
              Clear rating
            </button>
          )}

          <label className="rating-popover-notes-label" htmlFor={`notes-${id}`}>
            NOTES
          </label>
          <textarea
            id={`notes-${id}`}
            className="rating-popover-textarea"
            value={draftNotes}
            onChange={(e) => setDraftNotes(e.target.value)}
            placeholder="What did you think?"
          />

          <div className="rating-popover-actions">
            <button
              type="button"
              className="rating-popover-cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button type="submit" className="rating-popover-save-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}