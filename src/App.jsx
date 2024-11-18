import { useState, useEffect } from "react";
import "./App.css";
import MovieDisplay from "./components/MovieDisplay";
import Form from "./components/Form";

export default function App() {
  const apiKey = import.meta.env.VITE_API_KEY; // OMDb API key
  
  // State to hold the selected movie data (clicked from the grid)
  const [movie, setMovie] = useState(null);
  
  // State to hold the list of movies to display in the grid
  const [movies, setMovies] = useState([]);
  
  // To store any error messages
  const [error, setError] = useState(null);

  // Fetch a movie and its details
  const getMovie = async (movieTitle) => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&t=${movieTitle}`
      );
      const data = await response.json();

      if (data.Response === "False") {
        throw new Error(data.Error); // Handle error if the movie doesn't exist
      }

      setMovie(data); // If successful, set movie data
      setError(null); // Reset error if the movie is found
    } catch (e) {
      console.error(e);
      setError(e.message);
      setMovie(null); // Clear the movie data if there's an error
    }
  };

  // Fetch random movies to populate the grid
  const getRandomMovies = async () => {
    const genres = [
      "action", "comedy", "drama", "thriller", "romance", "horror", 
      "fantasy", "sci-fi", "animation", "documentary", "adventure"
    ];

    const randomMovies = [];
    
    for (let i = 0; i < 32; i++) {
      const randomGenre = genres[Math.floor(Math.random() * genres.length)];
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&s=${randomGenre}&type=movie`
        );
        const data = await response.json();
        if (data.Response === "True" && data.Search && data.Search.length > 0) {
          const movie = data.Search[Math.floor(Math.random() * data.Search.length)];
          randomMovies.push(movie);
        }
      } catch (error) {
        console.error(error);
      }
    }

    setMovies(randomMovies);
    setError(null);
  };

  // Automatically load random movies when the component mounts
  useEffect(() => {
    getRandomMovies(); // Fetch random movies for the grid
  }, []);

  return (
    <div className="App">
      <Form moviesearch={getMovie} /> {/* Search form to trigger movie search */}
      
      {error && <p>{error}</p>} {/* Show any errors */}

      {/* Movie Details Display */}
      <MovieDisplay movie={movie} />

      {/* Movie Tiles Grid */}
      <div className="movie-grid">
        {movies.length === 0 ? (
          <p>No movies found. Please try again later.</p>
        ) : (
          movies.map((movie, index) => (
            <div
              key={index}
              className="movie-tile"
              onClick={() => getMovie(movie.Title)} // When a tile is clicked, show its details
            >
              <img src={movie.Poster} alt={movie.Title} />
              <h3>{movie.Title}</h3>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
