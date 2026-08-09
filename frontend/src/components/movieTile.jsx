export default function MovieTile({ image, name }) {
  return (
    <article className="movie-card">
      <img className="movie-card-poster" src={image} alt={name || "movie poster"} />
    </article>
  );
}
