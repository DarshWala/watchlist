import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <main>
      <h1>WATCHLIST</h1>
      <p>Your personal cinema journal.</p>

      <Link to="/watchlist">Enter your watchlist</Link>
    </main>
  );
}

export default LandingPage;
