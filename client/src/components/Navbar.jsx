import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ onOpenDonation }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center border-2 border-[#513894]">
            <span className="text-2xl">🐱</span>
          </div>
          <span className="text-2xl font-black text-[#513894] tracking-wider">GladPet</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
          <div className={`relative pb-1 ${isActive('/') ? 'text-[#513894] font-semibold' : ''}`}>
            <Link to="/" className="hover:text-[#513894] transition">Знайти друга</Link>
            {isActive('/') && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#a3d95b] rounded-full"></div>}
          </div>
          <div className={`relative pb-1 ${isActive('/find-home') ? 'text-[#513894] font-semibold' : ''}`}>
            <Link to="/find-home" className="hover:text-[#513894] transition">Знайти дім</Link>
            {isActive('/find-home') && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#a3d95b] rounded-full"></div>}
          </div>
          <div className={`relative pb-1 ${isActive('/help-animals') ? 'text-[#513894] font-semibold' : ''}`}>
            <Link to="/help-animals" className="hover:text-[#513894] transition">Допомога тваринам</Link>
            {isActive('/help-animals') && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#a3d95b] rounded-full"></div>}
          </div>
          <div className={`relative pb-1 ${isActive('/about') ? 'text-[#513894] font-semibold' : ''}`}>
            <Link to="/about" className="hover:text-[#513894] transition">Про нас</Link>
            {isActive('/about') && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#a3d95b] rounded-full"></div>}
          </div>
          <div className={`relative pb-1 ${isActive('/partners') ? 'text-[#513894] font-semibold' : ''}`}>
            <Link to="/partners" className="hover:text-[#513894] transition">Партнери</Link>
            {isActive('/partners') && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#a3d95b] rounded-full"></div>}
          </div>
          <div className={`relative pb-1 ${isActive('/blog') ? 'text-[#513894] font-semibold' : ''}`}>
            <Link to="/blog" className="hover:text-[#513894] transition">Блог</Link>
            {isActive('/blog') && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#a3d95b] rounded-full"></div>}
          </div>
          <button onClick={() => alert('Форма авторизації в розробці')} className="hover:text-[#513894] transition">Увійти</button>
        </nav>

        <div>
          <button onClick={onOpenDonation} className="bg-[#513894] hover:bg-[#412c75] text-white px-6 py-3 rounded-xl font-semibold shadow-md transition">
            Підтримати
          </button>
        </div>
      </div>
    </header>
  );
}