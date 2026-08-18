import { Link } from "react-router-dom";
import ImageStreamHero from "../components/ImageStreamHero";
import AboutSection from "../components/AboutSection";

const imageModules = import.meta.glob(
  "../assets/imagesForLandingPage/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}",
  { eager: true, import: "default" },
);

const IMAGES = Object.values(imageModules).map((src) => ({ src, alt: "" }));

function LandingPage() {
  return (
    <>
      <ImageStreamHero images={IMAGES} className="landing-hero">
        <div className="landing-hero-content">
          <div>
            <h1 className="landing-hero-heading">
              What to watch,
              <br />
              finally sorted.
            </h1>
          </div>

          <div className="landing-hero-bottom">
            <p className="landing-hero-tagline">
              Search, save, and track what you actually watch.
            </p>
            <div className="landing-hero-actions">
              <Link to="/watchlist" className="landing-hero-btn-primary">
                Sign Up
              </Link>
              <Link to="/watchlist" className="landing-hero-btn-secondary">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </ImageStreamHero>

      <AboutSection images={IMAGES.slice(0, 4)} />
    </>
  );
}

export default LandingPage;