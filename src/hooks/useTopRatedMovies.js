import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovies } from "../utils/movieSlice";
import { URL_OPTIONS } from "../utils/constants";

const useTopRatedMovies = ()=>{
    const dispatch = useDispatch();
    const topRatedMovies = useSelector(store=>store.movies.topRatedMovies)

    const GetTopRatedMovies = async() => {
      const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';;
      const data = await fetch(url, URL_OPTIONS);
      const json = await data.json();
  
      dispatch(addTopRatedMovies(json.results))
  
    };
  
    useEffect(()=>{
     !topRatedMovies && GetTopRatedMovies();
    },[])
}

export default useTopRatedMovies;