import { useState, useEffect } from "react";

export default function MovieDisplay({ movie }) {
  const [trailerUrl, setTrailerUrl] = useState(null);

  // Function to render the star rating
  const renderStars = (rating) => {
    const maxStars = 5;
    const filledStars = Math.round((rating / 10) * maxStars); // Convert rating (0-10) to a scale of 5 stars
    const emptyStars = maxStars - filledStars;

    return (
      <div className="star-rating">
        {[...Array(filledStars)].map((_, index) => (
          <span key={`filled-${index}`} className="star filled">
            &#9733; {/* Filled star */}
          </span>
        ))}
        {[...Array(emptyStars)].map((_, index) => (
          <span key={`empty-${index}`} className="star">
            &#9734; {/* Empty star */}
          </span>
        ))}
      </div>
    );
  };

  // Fetch the trailer URL from YouTube based on movie title
  useEffect(() => {
    const fetchTrailer = () => {
      if (movie?.Title) {
        // Search YouTube for the movie title + trailer
        const searchQuery = encodeURIComponent(`${movie.Title} trailer`);
        const trailerLink = `https://www.youtube.com/results?search_query=${searchQuery}`;
        setTrailerUrl(trailerLink);
      }
    };

    fetchTrailer();
  }, [movie?.Title]);

  // Function to return loaded JSX
  const loaded = () => {
    return (
      <div>
        <h2>Movie Title: {movie.Title}</h2>

        {/* Display MPAA Rating (e.g., PG, PG-13, etc.) */}
        {movie.Rated && (
          <div>
            <strong>
              <em>{movie.Rated}</em>
            </strong>
          </div>
        )}

        <p>{movie.Plot}</p>
        <img src={movie.Poster} alt={movie.Title} />
        <h2>
          {movie.Genre} &nbsp; {movie.Year}
        </h2>

        {/* Display star rating based on IMDb rating */}
        {movie.Ratings && movie.Ratings.length > 0 && (
          <div>
            <h3>IMDb Rating: {movie.Rated && <em>{movie.Rated}</em>}</h3>
            <div>{renderStars(parseFloat(movie.Ratings[0]?.Value))}</div>
          </div>
        )}

        {/* Display all movie ratings */}
        {movie.Ratings && movie.Ratings.length > 0 && (
          <div>
            {movie.Ratings.map((rating, index) => (
              <p key={index}>
                {rating.Source}: {rating.Value}
              </p>
            ))}
          </div>
        )}

        {/* Display trailer link if available */}
        {trailerUrl ? (
          <div>
            <a href={trailerUrl} target="_blank" rel="noopener noreferrer">
              Watch the Trailer on YouTube
            </a>
          </div>
        ) : (
          <p>Trailer not available</p>
        )}
      </div>
    );
  };

  // Function to return loading JSX
  const loading = () => {
    return <h1>No Movie to Display</h1>;
  };

  return movie ? loaded() : loading();
}
