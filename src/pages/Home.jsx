import React, { useEffect, useState, useRef } from 'react';
import { fetchPopularMovies, fetchTopRatedMovies, fetchNowPlayingMovies, fetchUpcomingMovies } from '../api';
import MovieCard from '../components/MovieCard';
import { Link } from 'react-router-dom';
import { waveform } from 'ldrs';

waveform.register();

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const popularRef = useRef(null);
  const topRatedRef = useRef(null);
  const nowPlayingRef = useRef(null);
  const upcomingRef = useRef(null);

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

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-950">
      <l-waveform size="35" stroke="3.5" speed="1" color="red"></l-waveform>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-950 text-red-500">
      <p>{error}</p>
    </div>
  );

  const displayedPopularMovies = popularMovies.slice(0, 12);
  displayedPopularMovies.push({ id: 'add' });

  const displayedTopRatedMovies = topRatedMovies.slice(0, 12);
  displayedTopRatedMovies.push({ id: 'add' });

  const displayedNowPlayingMovies = nowPlayingMovies.slice(0, 12);
  displayedNowPlayingMovies.push({ id: 'add' });

  const displayedUpcomingMovies = upcomingMovies.slice(0, 12);
  displayedUpcomingMovies.push({ id: 'add' });

  return (
    <div className="p-6 bg-neutral-950 text-white">

      <h1 className="text-4xl font-bold my-8 flex justify-between items-center">
        Agora em Cartaz
        <Link to="/now-playing-movies" className="bg-[#bd0003] text-white py-1 px-3 rounded-full text-sm">
          Ver Todos
        </Link>
      </h1>
      <div className="flex items-center relative">
        <button onClick={() => scrollLeft(nowPlayingRef)} className="absolute left-0 -translate-x-1/2 transform p-4 bg-[#bd0003] rounded-full hover:bg-red-500">
          ←
        </button>
        <div ref={nowPlayingRef} className="flex overflow-x-auto space-x-4 pb-4">
          {displayedNowPlayingMovies.map((movie) => (
            <div key={movie.id} className="flex-shrink-0 w-48">
              {movie.id === 'add' ? (
                <Link to="/now-playing-movies" className="block bg-neutral-900 rounded-md shadow-lg overflow-hidden hover:shadow-xl h-full">
                  <div className="flex items-center justify-center h-72">
                    <span className="text-5xl text-white">+</span>
                  </div>
                </Link>
              ) : (
                <MovieCard movie={movie} />
              )}
            </div>
          ))}
        </div>
        <button onClick={() => scrollRight(nowPlayingRef)} className="absolute right-0 translate-x-1/2 transform p-4 bg-[#bd0003] rounded-full hover:bg-red-500">
          →
        </button>
      </div>

      <h1 className="text-4xl font-bold mt-12 mb-8 flex justify-between items-center">
        Melhores Avaliados
        <Link to="/top-rated-movies" className="bg-[#bd0003] text-white py-1 px-3 rounded-full text-sm">
          Ver Todos
        </Link>
      </h1>
      <div className="flex items-center relative">
        <button onClick={() => scrollLeft(topRatedRef)} className="absolute left-0 -translate-x-1/2 transform p-4 bg-[#bd0003] rounded-full hover:bg-red-500">
          ←
        </button>
        <div ref={topRatedRef} className="flex overflow-x-auto space-x-4 pb-4">
          {displayedTopRatedMovies.map((movie) => (
            <div key={movie.id} className="flex-shrink-0 w-48">
              {movie.id === 'add' ? (
                <Link to="/top-rated-movies" className="block bg-neutral-900 rounded-md shadow-lg overflow-hidden hover:shadow-xl h-full">
                  <div className="flex items-center justify-center h-72">
                    <span className="text-5xl text-white">+</span>
                  </div>
                </Link>
              ) : (
                <MovieCard movie={movie} />
              )}
            </div>
          ))}
        </div>
        <button onClick={() => scrollRight(topRatedRef)} className="absolute right-0 translate-x-1/2 transform p-4 bg-[#bd0003] rounded-full hover:bg-red-500">
          →
        </button>
      </div>

      <h1 className="text-4xl font-bold mt-12 mb-8 flex justify-between items-center">
        Filmes Populares
        <Link to="/popular-movies" className="bg-[#bd0003] text-white py-1 px-3 rounded-full text-sm">
          Ver Todos
        </Link>
      </h1>
      <div className="flex items-center relative">
        <button onClick={() => scrollLeft(popularRef)} className="absolute left-0 -translate-x-1/2 transform p-4 bg-[#bd0003] rounded-full hover:bg-red-500">
          ←
        </button>
        <div ref={popularRef} className="flex overflow-x-auto space-x-4 pb-4">
          {displayedPopularMovies.map((movie) => (
            <div key={movie.id} className="flex-shrink-0 w-48">
              {movie.id === 'add' ? (
                <Link to="/popular-movies" className="block bg-neutral-900 rounded-md shadow-lg overflow-hidden hover:shadow-xl h-full">
                  <div className="flex items-center justify-center h-72">
                    <span className="text-5xl text-white">+</span>
                  </div>
                </Link>
              ) : (
                <MovieCard movie={movie} />
              )}
            </div>
          ))}
        </div>
        <button onClick={() => scrollRight(popularRef)} className="absolute right-0 translate-x-1/2 transform p-4 bg-[#bd0003] rounded-full hover:bg-red-500">
          →
        </button>
      </div>

      <h1 className="text-4xl font-bold mt-12 mb-8 flex justify-between items-center">
        Próximos Lançamentos
        <Link to="/upcoming-movies" className="bg-[#bd0003] text-white py-1 px-3 rounded-full text-sm">
          Ver Todos
        </Link>
      </h1>
      <div className="flex items-center relative">
        <button onClick={() => scrollLeft(upcomingRef)} className="absolute left-0 -translate-x-1/2 transform p-4 bg-[#bd0003] rounded-full hover:bg-red-500">
          ←
        </button>
        <div ref={upcomingRef} className="flex overflow-x-auto space-x-4 pb-4">
          {displayedUpcomingMovies.map((movie) => (
            <div key={movie.id} className="flex-shrink-0 w-48">
              {movie.id === 'add' ? (
                <Link to="/upcoming-movies" className="block bg-neutral-900 rounded-md shadow-lg overflow-hidden hover:shadow-xl h-full">
                  <div className="flex items-center justify-center h-72">
                    <span className="text-5xl text-white">+</span>
                  </div>
                </Link>
              ) : (
                <MovieCard movie={movie} />
              )}
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
