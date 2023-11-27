import { useEffect } from "react";
import { URL_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import {addTrailerVideo} from "../utils/movieSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const getMovieVideos = async () => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
    const data = await fetch(url, URL_OPTIONS);
    const json = await data.json();
    const trailer = await json.results.find(
      (videos) => videos.type === "Trailer"
    );
    // const trailer = json.results[0];

    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
    getMovieVideos();
  }, []);
};

export default useMovieTrailer;
