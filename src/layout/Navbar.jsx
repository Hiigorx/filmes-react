import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSearch = () => {
    if (searchQuery.trim() === '') return;
    navigate(`/search-results?query=${searchQuery}`);
  };

  const toggleSearch = () => setSearchOpen(!searchOpen);

  const isActiveLink = (path) => location.pathname === path;

  return (
    <nav className="bg-black text-white py-4 px-6">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-3xl font-bold text-[#bd0003]" style={{ fontFamily: 'Verdana, sans-serif', fontWeight: 'bold' }}>
          Tela<span className="text-white">Viva</span>
        </Link>
        <div className="md:hidden flex items-center space-x-4">
          <button onClick={toggleSearch} className="text-white">
            <FaSearch size={20} />
          </button>
          <button onClick={toggleMenu} className="text-white">
            {menuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
          </button>
        </div>
      </div>
      {searchOpen && (
        <div className="flex justify-center mt-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="w-40 px-4 py-2 rounded-full bg-neutral-800 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#bd0003]"
            placeholder="Pesquisar filmes"
          />
          <button onClick={handleSearch} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#bd0003]">
            <FaSearch size={20} />
          </button>
        </div>
      )}
      <div className={`absolute top-16 right-0 mt-2 bg-black text-white w-56 ${menuOpen ? 'block' : 'hidden'} md:hidden`}>
        <ul>
          <li>
            <Link
              to="/"
              className={`block py-2 px-4 text-[#bd0003] hover:text-gray-300 ${isActiveLink('/') ? 'border-2 border-[#bd0003] text-white' : ''}`}
            >
              Início
            </Link>
          </li>
          <li>
            <Link
              to="/genres"
              className={`block py-2 px-4 text-[#bd0003] hover:text-gray-300 ${isActiveLink('/genres') ? 'border-2 border-[#bd0003] text-white' : ''}`}
            >
              Gêneros
            </Link>
          </li>
          <li>
            <Link
              to="/watched-movies"
              className={`block py-2 px-4 text-[#bd0003] hover:text-gray-300 ${isActiveLink('/watched-movies') ? 'border-2 border-[#bd0003] text-white' : ''}`}
            >
              Assistidos
            </Link>
          </li>
          <li>
            <Link
              to="/to-watch-movies"
              className={`block py-2 px-4 text-[#bd0003] hover:text-gray-300 ${isActiveLink('/to-watch-movies') ? 'border-2 border-[#bd0003] text-white' : ''}`}
            >
              Ver Depois
            </Link>
          </li>
          <li>
            <Link
              to="/popular-movies"
              className={`block py-2 px-4 text-[#bd0003] hover:text-gray-300 ${isActiveLink('/popular-movies') ? 'border-2 border-[#bd0003] text-white' : ''}`}
            >
              Populares
            </Link>
          </li>
          <li>
            <Link
              to="/top-rated-movies"
              className={`block py-2 px-4 text-[#bd0003] hover:text-gray-300 ${isActiveLink('/top-rated-movies') ? 'border-2 border-[#bd0003] text-white' : ''}`}
            >
              Alta Avaliação
            </Link>
          </li>
          <li>
            <Link
              to="/now-playing-movies"
              className={`block py-2 px-4 text-[#bd0003] hover:text-gray-300 ${isActiveLink('/now-playing-movies') ? 'border-2 border-[#bd0003] text-white' : ''}`}
            >
              Agora Em Cartaz
            </Link>
          </li>
          <li>
            <Link
              to="/upcoming-movies"
              className={`block py-2 px-4 text-[#bd0003] hover:text-gray-300 ${isActiveLink('/upcoming-movies') ? 'border-2 border-[#bd0003] text-white' : ''}`}
            >
              Em Breve
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
