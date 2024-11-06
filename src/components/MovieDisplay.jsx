export default function MovieDisplay({ movie }) {
  // Function to return loaded JSX
  const loaded = () => {
    return (
      <div>
        <h1>Movie Title : {movie.Title}</h1>
        <p>{movie.Plot}</p>
        <h2>
          {movie.Genre} &nbsp; {movie.Year}
        </h2>
        <img src={movie.Poster} alt={movie.Title} />

        {/* ratings */}
        {movie.Ratings && movie.Ratings.length > 0 && (
          <div>
            <h3>Ratings:</h3>
            {movie.Ratings.map((rating, index) => (
              <p key={index}>
                {rating.Source}: {rating.Value}
              </p>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Function to return loading JSX
  const loading = () => {
    return <h1>No Movie to Display</h1>;
  };

  // Ternary operator will determine which functions JSX we will return
  return movie ? loaded() : loading();
}
