import { useState, useEffect } from "react";

import "./App.css";

// Import our components
import MovieDisplay from "./components/MovieDisplay";
import Form from "./components/Form";

export default function App() {
  return (
    <div className="App">
      <Form />
      <MovieDisplay />
    </div>
  );
}
