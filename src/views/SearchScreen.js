import React, { useState } from "react";
import axios from "../axios";
import "./SearchScreen.css";
import Nav from "../Nav";

function SearchPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const API_KEY = process.env.REACT_APP_API_KEY;

    const searchMovies = async (query) => {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
        const response = await axios.get(url);
        setSearchResults(response.data.results);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchTerm) {
            searchMovies(searchTerm);
        }
    };

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="searchPage">
            <Nav hideSearchButton={true}/>
            <div className="search_area">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Search for a movie..."
                        value={searchTerm}
                        onChange={handleChange}
                    />
                    <button type="submit">Search</button>
                </form>
                <div className="searchPage_results">
                    {searchResults.length > 0 ? (
                        <div className="movieGrid">
                            {searchResults.map((movie) => (
                                <img
                                    key={movie.id}
                                    className="moviePoster"
                                    src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                                    alt={movie.title}
                                />
                            ))}
                        </div>
                    ) : (
                        <p>No search results found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchPage;




