
import { Row, Spinner } from "react-bootstrap";
import MovieCard from "./MovieCard";

import {useEffect, useState} from "react";
import { useLocation} from "react-router-dom";
import NotFound from "./NotFound";


const MovieGallery = (props) => {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const query = props.query === "" ? "Star Wars" : props.query
  const location = useLocation()
  const url = location.pathname !== "/" ? "http://www.omdbapi.com/?apikey=a0d093ea&s=" + query + "&type=" + location.pathname.substring(1) : "http://www.omdbapi.com/?apikey=a0d093ea&s=" + query
  
  

  const fetchData = async () => {

    try {
      

      let response = await fetch(url
      );
      if (response.ok) {
        let data = await response.json();
        setMovies(data.Search);
        setIsLoading(false)
        
      } else {
        setNotFound(true)
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      setNotFound(true)
    }

  }

  useEffect(() => {
    fetchData()
  }, [props.query])

  useEffect(() => {
    fetchData()
  }, [location])

  const headerInnerTxt = isLoading ? "Loading..." : query

    return (
      <>
      <h4 className="mb-3 mt-5 ml-n2"> {headerInnerTxt} </h4> 
      {isLoading && (<><Row className="d-flex justify-content-center"><Spinner animation="border" variant="success" /></Row></>)}
      {typeof movies !== "undefined" && (<><Row className="g-1">
        {movies.filter((movie, index) => index < 6).map((movie) => (
          <MovieCard key={movie.imdbID} id={movie.imdbID} img={movie.Poster} title={movie.Title} />
        ))}
      </Row></>)}
      {notFound && <NotFound />}
      </>
    );
  }

export default MovieGallery;
