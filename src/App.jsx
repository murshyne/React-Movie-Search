import { useState, useEffect } from "react";
import "./App.css";
import MovieDisplay from "./components/MovieDisplay";
import Form from "./components/Form";

export default function App() {
  const apiKey = "98e3fb1f";
  

  // State to hold movie data
  const [movie, setMovie] = useState(null);

  // To store any error messages
  const [error, setError] = useState(null);

  // Function to fetch the movie data
  const getMovie = async (searchTerm) => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`
      );
      const data = await response.json();

      if (data.Response === "False") {
        throw new Error(data.Error); // Handle error if the movie doesn't exist
      }

      setMovie(data); // If successful, set movie data
      setError(null); // Reset error if the movie is found
    } catch (e) {
      console.error(e);
      // Set error message
      setError(e.message);
      // Clear the movie data if there's an error
      setMovie(null);
    }
  };

  // Automatically load a default movie when the component mounts
  useEffect(() => {
    const movies = `http://www.omdbapi.com/?apikey=${apiKey}&`;
    const random = Math.floor(Math.random() * movies.length);
    getMovie(random);
  }, []);

  return (
    <div className="App">
      <Form moviesearch={getMovie} /> {/* Pass getMovie function as prop */}
      {error && <p>{error}</p>} {/* Show error if there is one */}
      <MovieDisplay movie={movie} /> {/* Pass movie data to MovieDisplay */}
    </div>
  );
}
