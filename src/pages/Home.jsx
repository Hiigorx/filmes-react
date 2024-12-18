import React, { useEffect, useState, useRef, useContext } from 'react';
import { fetchPopularMovies, fetchTopRatedMovies, fetchNowPlayingMovies, fetchUpcomingMovies, fetchSimilarMovies } from '../api';
import MovieCard from '../components/MovieCard';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { MovieContext } from '../context/MovieContext';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { toWatchMovies, watchedMovies } = useContext(MovieContext);

  const popularRef = useRef(null);
  const topRatedRef = useRef(null);
  const nowPlayingRef = useRef(null);
  const upcomingRef = useRef(null);
  const recommendedRef = useRef(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const [popularData, topRatedData, nowPlayingData, upcomingData] = await Promise.all([
          fetchPopularMovies(),
          fetchTopRatedMovies(),
          fetchNowPlayingMovies(),
          fetchUpcomingMovies(),
        ]);
        setPopularMovies(popularData);
        setTopRatedMovies(topRatedData);
        setNowPlayingMovies(nowPlayingData);
        setUpcomingMovies(upcomingData);
      } catch (err) {
        setError('Erro ao carregar os filmes.');
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, []);

  useEffect(() => {
    const getRecommendedMovies = async () => {
      try {
        const similarMovies = [];
        
        const allMovies = [...toWatchMovies, ...watchedMovies];
        
        for (const movie of allMovies) {
          const similarData = await fetchSimilarMovies(movie.id);
          similarMovies.push(...similarData);
        }
        
        const uniqueRecommendedMovies = Array.from(new Set(similarMovies.map(a => a.id)))
          .map(id => similarMovies.find(a => a.id === id));
          
        setRecommendedMovies(uniqueRecommendedMovies.slice(0, 12));
      } catch (err) {
        setError('Erro ao carregar filmes recomendados.');
      }
    };
    
    getRecommendedMovies();
  }, [toWatchMovies, watchedMovies]);

  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500 text-center mt-6">{error}</div>;

  const displayedPopularMovies = popularMovies.slice(0, 12);
  const displayedTopRatedMovies = topRatedMovies.slice(0, 12);
  const displayedNowPlayingMovies = nowPlayingMovies.slice(0, 12);
  const displayedUpcomingMovies = upcomingMovies.slice(0, 12);

  return (
    <div className="bg-neutral-950 text-white md:p-6 lg:p-8 xl:p-10">
      <h1 className="text-4xl font-bold my-8 flex justify-between items-center md:mx-6 lg:mx-8 xl:mx-10">
        Em Cartaz
        <Link to="/now-playing-movies" className="bg-[#bd0003] text-white py-1 px-3 rounded-full text-sm">
          Ver Todos
        </Link>
      </h1>
      <div className="flex items-center relative">
        <button onClick={() => scrollLeft(nowPlayingRef)} className="absolute left-0 -translate-x-1/2 transform p-4 bg-[#bd0003] rounded-full hover:bg-red-500">
          ←
        </button>
        <div ref={nowPlayingRef} className="flex overflow-x-auto space-x-4 pb-4 mx-0 md:mx-6 lg:mx-8 xl:mx-10">
          {displayedNowPlayingMovies.map((movie) => (
            <div key={movie.id} className="flex-shrink-0 w-48 sm:w-48 md:w-48 lg:w-56 xl:w-64">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
        <button onClick={() => scrollRight(nowPlayingRef)} className="absolute right-0 translate-x-1/2 transform p-4 bg-[#bd0003] rounded-full hover:bg-red-500">
          →
        </button>
      </div>

      <h1 className="text-4xl font-bold my-8 flex justify-between items-center md:mx-6 lg:mx-8 xl:mx-10">
        Recomendados para Você
      </h1>
      <div className="flex items-center relative">
        <button onClick={() => scrollLeft(recommendedRef)} className="absolute left-0 -translate-x-1/2 transform p-4 bg-[#bd0003] rounded-full hover:bg-red-500">
          ←
        </button>
        <div ref={recommendedRef} className="flex overflow-x-auto space-x-4 pb-4 mx-0 md:mx-6 lg:mx-8 xl:mx-10">
          {recommendedMovies.map((movie) => (
            <div key={movie.id} className="flex-shrink-0 w-48 sm:w-48 md:w-48 lg:w-56 xl:w-64">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
        <button onClick={() => scrollRight(recommendedRef)} className="absolute right-0 translate-x-1/2 transform p-4 bg-[#bd0003] rounded-full hover:bg-red-500">
          →
        </button>
      </div>
      <h1 className="text-4xl font-bold my-8 flex justify-between items-center md:mx-6 lg:mx-8 xl:mx-10">
        Maiores Avaliações
        <Link to="/top-rated-movies" className="bg-[#bd0003] text-white py-1 px-3 rounded-full text-sm">
          Ver Todos
        </Link>
      </h1>
      <div className="flex items-center relative">
        <button onClick={() => scrollLeft(topRatedRef)} className="absolute left-0 -translate-x-1/2 transform p-4 bg-[#bd0003] rounded-full hover:bg-red-500">
          ←
        </button>
        <div ref={topRatedRef} className="flex overflow-x-auto space-x-4 pb-4 mx-0 md:mx-6 lg:mx-8 xl:mx-10">
          {displayedTopRatedMovies.map((movie) => (
            <div key={movie.id} className="flex-shrink-0 w-48 sm:w-48 md:w-48 lg:w-56 xl:w-64">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
        <button onClick={() => scrollRight(topRatedRef)} className="absolute right-0 translate-x-1/2 transform p-4 bg-[#bd0003] rounded-full hover:bg-red-500">
          →
        </button>
      </div>

      <h1 className="text-4xl font-bold my-8 flex justify-between items-center md:mx-6 lg:mx-8 xl:mx-10">
        Populares
        <Link to="/popular-movies" className="bg-[#bd0003] text-white py-1 px-3 rounded-full text-sm">
          Ver Todos
        </Link>
      </h1>
      <div className="flex items-center relative">
        <button onClick={() => scrollLeft(popularRef)} className="absolute left-0 -translate-x-1/2 transform p-4 bg-[#bd0003] rounded-full hover:bg-red-500">
          ←
        </button>
        <div ref={popularRef} className="flex overflow-x-auto space-x-4 pb-4 mx-0 md:mx-6 lg:mx-8 xl:mx-10">
          {displayedPopularMovies.map((movie) => (
            <div key={movie.id} className="flex-shrink-0 w-48 sm:w-48 md:w-48 lg:w-56 xl:w-64">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
        <button onClick={() => scrollRight(popularRef)} className="absolute right-0 translate-x-1/2 transform p-4 bg-[#bd0003] rounded-full hover:bg-red-500">
          →
        </button>
      </div>

      <h1 className="text-4xl font-bold my-8 flex justify-between items-center md:mx-6 lg:mx-8 xl:mx-10">
        Lançamentos
        <Link to="/upcoming-movies" className="bg-[#bd0003] text-white py-1 px-3 rounded-full text-sm">
          Ver Todos
        </Link>
      </h1>
      <div className="flex items-center relative">
        <button onClick={() => scrollLeft(upcomingRef)} className="absolute left-0 -translate-x-1/2 transform p-4 bg-[#bd0003] rounded-full hover:bg-red-500">
          ←
        </button>
        <div ref={upcomingRef} className="flex overflow-x-auto space-x-4 pb-4 mx-0 md:mx-6 lg:mx-8 xl:mx-10">
          {displayedUpcomingMovies.map((movie) => (
            <div key={movie.id} className="flex-shrink-0 w-48 sm:w-48 md:w-48 lg:w-56 xl:w-64">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
        <button onClick={() => scrollRight(upcomingRef)} className="absolute right-0 translate-x-1/2 transform p-4 bg-[#bd0003] rounded-full hover:bg-red-500">
          →
        </button>
      </div>
    </div>
  );
};

export default Home;
