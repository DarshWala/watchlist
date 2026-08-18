function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

/**
 * AboutSection
 *
 * Sits below the ImageStreamHero on the landing page. Explains what
 * the app does in plain terms and shows a small fanned stack of
 * poster images for visual continuity with the hero above it.
 *
 * Props:
 *  - images {Array<{src, alt}>}  A handful of images to fan out on the right.
 *                                 Renders gracefully with any count, including zero.
 */
function AboutSection({ images = [] }) {
  return (
    <section className="about-section">
      <div className="about-content">
        <div className="about-text">
          <p className="about-eyebrow">HOW IT WORKS</p>
          <h2 className="about-heading">
            One place for everything
            <br />
            you mean to watch.
          </h2>
          <p className="about-description">
            Stop losing track of recommendations in group chats and
            half-remembered conversations. Search any title, save it to your
            queue, and mark it off once you&apos;ve actually watched it — all
            backed by real data from OMDb.
          </p>

          <ul className="feature-list">
            <li className="feature-item">
              <span className="feature-icon" aria-hidden="true">
                <SearchIcon />
              </span>
              <div>
                <p className="feature-title">Search anything</p>
                <p className="feature-desc">
                  Live results pulled straight from OMDb&apos;s catalogue.
                </p>
              </div>
            </li>
            <li className="feature-item">
              <span className="feature-icon" aria-hidden="true">
                <BookmarkIcon />
              </span>
              <div>
                <p className="feature-title">Save to your queue</p>
                <p className="feature-desc">
                  One click adds a title to your personal watchlist.
                </p>
              </div>
            </li>
            <li className="feature-item">
              <span className="feature-icon" aria-hidden="true">
                <CheckIcon />
              </span>
              <div>
                <p className="feature-title">Track what you&apos;ve watched</p>
                <p className="feature-desc">
                  Rate it, mark it watched, keep your queue honest.
                </p>
              </div>
            </li>
          </ul>
        </div>

        {images.length > 0 && (
          <div className="about-collage" aria-hidden="true">
            {images.map((img, i) => (
              <img
                key={i}
                src={img.src}
                alt=""
                loading="lazy"
                className={`about-collage-img about-collage-img-${i % 4}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default AboutSection;