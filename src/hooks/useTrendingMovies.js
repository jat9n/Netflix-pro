import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTrendingMovies } from "../utils/movieSlice";
import { URL_OPTIONS } from "../utils/constants";

const useTrendingMovies = ()=>{
    const dispatch = useDispatch();
    const trendingMovies = useSelector(store=>store.movies.trendingMovies)

    const GetTrendingMovies = async() => {
      const url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
      const data = await fetch(url, URL_OPTIONS);
      const json = await data.json();
  
      dispatch(addTrendingMovies(json.results))
  
    };
  
    useEffect(()=>{
     !trendingMovies && GetTrendingMovies();
    },[])
}

export default useTrendingMovies;