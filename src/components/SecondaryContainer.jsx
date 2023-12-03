import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
  const movies = useSelector(store=> store.movies)

  return (
    <div className='bg-black'>
      <div className="-mt-11 pl-12 relative z-20">
      <MovieList title={"Now playing movies"} movies={movies?.nowPlayingMovies}/>
      <MovieList title={"Trending movies"} movies={movies?.trendingMovies}/>
      <MovieList title={"Top Rated movies"} movies={movies?.topRatedMovies}/>
      <MovieList title={"Upcoming movies"} movies={movies?.upcomingMovies}/>
        
      </div>
    </div>
  )
}

export default SecondaryContainer
