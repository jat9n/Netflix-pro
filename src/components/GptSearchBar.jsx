import React, { useRef } from "react";
import openai from "../utils/openAi";
import { URL_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addGptMoviesResult } from "../utils/GptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const searchInput = useRef(null);

  const searchMovieOnTmdb = async(movie)=>{
    const result = await fetch('https://api.themoviedb.org/3/search/movie?query='+movie+'&include_adult=true&page=1',URL_OPTIONS)
    const json = await result.json();
    return json.results;
};

  const handleSubmit = async () => {
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchInput.current.value +
      ". only give me names of 5 movies, comma separated like the example result given ahead. Example result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });
    const suggestedMovies =
      chatCompletion.choices[0]?.message?.content.split(", ");

      const promiseArray = suggestedMovies.map(movie => searchMovieOnTmdb(movie));
      
      const suggestedMoviesData = await Promise.all(promiseArray);

      dispatch(addGptMoviesResult({movieNames: suggestedMovies, movieResults: suggestedMoviesData}));
      console.log(suggestedMoviesData)
  };

  return (
    <div className="pt-[6%] flex justify-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          ref={searchInput}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder="What would you to watch today?"
        />
        <button className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg">
          Search
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
