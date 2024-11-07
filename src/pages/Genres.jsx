import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../api';
import { waveform } from 'ldrs';

waveform.register();

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getGenres = async () => {
      const genreData = await fetchCategories();
      setGenres(genreData);
      setLoading(false);
    };
    getGenres();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-950">
      <l-waveform size="35" stroke="3.5" speed="1" color="red"></l-waveform>
    </div>
  );

  return (
    <div className="p-6 bg-neutral-950 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-4">Gêneros</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {genres.map((genre) => (
          <li key={genre.id} className="text-center mb-2">
            <Link to={`/category/${genre.id}`} className="text-red-500 hover:underline">
              {genre.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Genres;
