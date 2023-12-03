import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../utils/movieSlice";
import { URL_OPTIONS } from "../utils/constants";

const useUpcomingMovies = ()=>{
    const dispatch = useDispatch();
    const upcomingMovies = useSelector(store=>store.movies.upcomingMovies)

    const GetUpcomingMovies = async() => {
      const url = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
      const data = await fetch(url, URL_OPTIONS);
      const json = await data.json();
  
      dispatch(addUpcomingMovies(json.results))
  
    };
  
    useEffect(()=>{
     !upcomingMovies && GetUpcomingMovies();
    },[])
}

export default useUpcomingMovies;