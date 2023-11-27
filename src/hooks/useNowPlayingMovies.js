import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { URL_OPTIONS } from "../utils/constants";

const useNowPlayingMovies = ()=>{
    const dispatch = useDispatch();

    const GetNowPlayingMovies = async() => {
      const url = 'https://api.themoviedb.org/3/movie/now_playing?page=1';
      const data = await fetch(url, URL_OPTIONS)
      const json = await data.json();
  
      dispatch(addNowPlayingMovies(json.results))
  
    };
  
    useEffect(()=>{
      GetNowPlayingMovies();
    },[])
}

export default useNowPlayingMovies;