import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if(!posterPath)return;
  return (
    <div className="w-28 pr-3">
      <img src={IMG_CDN_URL + posterPath} alt="poster" />
    </div>
  );
};

export default MovieCard;
