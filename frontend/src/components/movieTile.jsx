export default function MovieTile({ image, name }) {
  return (
    <article className="movie-card">
      <img className="movie-card-poster" src={image} alt={name || "movie poster"} />
      <div className="movie-card-title-overlay">
        <p>{name}</p>
      </div>
    </article>
  );
}
