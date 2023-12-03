import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { URL_OPTIONS } from "../utils/constants";

const useNowPlayingMovies = ()=>{
    const dispatch = useDispatch();
    const nowPlayingMovies = useSelector(store=>store.movies.nowPlayingMovies)

    const GetNowPlayingMovies = async() => {
      const url = 'https://api.themoviedb.org/3/movie/now_playing?page=1';
      const data = await fetch(url, URL_OPTIONS)
      const json = await data.json();
  
      dispatch(addNowPlayingMovies(json.results))
  
    };
  
    useEffect(()=>{
     !nowPlayingMovies && GetNowPlayingMovies();
    },[])
}

export default useNowPlayingMovies;