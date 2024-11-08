import React, { useState, useEffect } from 'react';
import { fetchNowPlayingMovies } from '../api';
import MovieCard from '../components/MovieCard';
import { waveform } from 'ldrs';

waveform.register();

const NowPlayingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const movieData = await fetchNowPlayingMovies(page);
      setMovies((prevMovies) => [...prevMovies, ...movieData]);
    } catch (err) {
      setError('Erro ao carregar os filmes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, [page]);

  // Detecção de rolagem na página
  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const bottom = document.documentElement.scrollHeight === scrollPosition;

    if (bottom && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);

  if (loading && page === 1) return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-950">
      <l-waveform size="35" stroke="3.5" speed="1" color="#bd0003"></l-waveform>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-950 text-red-500">
      <p>{error}</p>
    </div>
  );

  return (
    <div className="p-6 bg-neutral-950 text-white">
      <h1 className="text-4xl font-bold mb-4">Filmes em Cartaz</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {movies.length === 0 ? (
          <p className="col-span-full text-center">Nenhum filme encontrado.</p>
        ) : (
          movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        )}
      </div>
      {loading && page > 1 && (
        <div className="flex items-center justify-center mt-6">
          <l-waveform size="35" stroke="3.5" speed="1" color="#bd0003"></l-waveform>
        </div>
      )}
    </div>
  );
};

export default NowPlayingMovies;
