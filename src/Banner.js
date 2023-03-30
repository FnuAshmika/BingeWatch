import axios from "./axios";
import React, { useEffect, useState } from "react";
import "./Banner.css";
import requests from "./Requests";
import YouTube from "react-youtube";
import '@fortawesome/fontawesome-free/css/all.min.css';
function Banner() {
    const [movie, setMovie] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("")
    const API_KEY = process.env.REACT_APP_API_KEY
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchActionMovies)
            setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)])
            return request;
        }
        fetchData()
    }, [])

    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n - 1) + "..." : string
    }

    const opts = {
        height: "400",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    }

    const handleCloseClick = () => {
        setTrailerUrl("")
    }

    const handlePlayClick = async (movie) => {
        let trailerurl = await axios.get(`/movie/${movie.id}/videos?api_key=${API_KEY}`)
        let teaserUrl = trailerurl.data.results.find((result) => result.type === "Teaser" || result.type === "Trailer")?.key
        if (teaserUrl) {
            setTrailerUrl(teaserUrl)
        }
    }

    return (
        <header
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
                backgroundPosition: "center center",
            }}>
            {trailerUrl ? (
                <div className="banner_youtube">
                    {trailerUrl === "Teaser not available" ? (<></>
                    ) : (
                        <YouTube videoId={trailerUrl} opts={opts} />
                    )}
                    <button className="banner_close_button" onClick={handleCloseClick}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            ) : (
                <div className="banner_contents">
                    <h1 className="banner_title">{movie?.title || movie?.name || movie?.original_name}</h1>
                    <div className="banner_buttons">
                        <button className="banner_button" onClick={() => handlePlayClick(movie)}>Play</button>
                        <button className="banner_button">My List</button>
                    </div>
                    <h1 className="banner_description">{truncate(movie?.overview, 200)}</h1>
                </div>
            )}
            <div className="banner--fadeBottom" />
        </header>
    )
}
export default Banner;
