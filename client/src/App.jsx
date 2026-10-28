import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

import FindFriend from './pages/FindFriend';
import FindHome from './pages/FindHome';
import HelpAnimals from './pages/HelpAnimals';
import About from './pages/About';
import Partners from './pages/Partners';
import Blog from './pages/Blog';

export default function App() {
    const [selectedPet, setSelectedPet] = useState(null);
    const [isAdoptModalOpen, setIsAdoptModalOpen] = useState(false);
    const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    return (
        <Router>
            <div className="min-h-screen bg-slate-50 text-gray-800 flex flex-col font-sans">
                <Navbar
                    onOpenDonation={() => setIsDonationModalOpen(true)}
                    onOpenAuth={() => setIsAuthModalOpen(true)}
                />

                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<FindFriend onSelectPet={setSelectedPet} onOpenDonation={() => setIsDonationModalOpen(true)} />} />
                        <Route path="/find-home" element={<FindHome />} />
                        <Route path="/help-animals" element={<HelpAnimals onOpenDonation={() => setIsDonationModalOpen(true)} />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/partners" element={<Partners />} />
                        <Route path="/blog" element={<Blog />} />
                    </Routes>
                </main>

                <Footer />

                <AuthModal
                    isOpen={isAuthModalOpen}
                    onClose={() => setIsAuthModalOpen(false)}
                />

                {selectedPet && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl">
                            <div className="relative h-72">
                                <img src={selectedPet.imageUrl || selectedPet.image} alt={selectedPet.name} className="w-full h-full object-cover" />
                                <button onClick={() => setSelectedPet(null)} className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 w-9 h-9 rounded-full flex items-center justify-center font-bold shadow">✕</button>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-2xl font-bold text-gray-900">{selectedPet.name}</h3>
                                    <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">{selectedPet.city}</span>
                                </div>
                                <p className="text-sm text-gray-500 mb-4">{selectedPet.breed} • {selectedPet.age} років</p>
                                <p className="text-gray-600 text-sm mb-6 leading-relaxed">{selectedPet.description}</p>
                                <div className="flex gap-3">
                                    <button onClick={() => { setSelectedPet(null); setIsAdoptModalOpen(true); }} className="flex-1 bg-[#513894] hover:bg-[#412c75] text-white py-3 rounded-xl font-semibold transition">
                                        Подати заявку на адопцію
                                    </button>
                                    <button onClick={() => setSelectedPet(null)} className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition">
                                        Закрити
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {isAdoptModalOpen && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Заявка на прихисток</h3>
                            <p className="text-sm text-gray-500 mb-6">Заповніть форму, і наші волонтери зв'яжуться з вами.</p>
                            <form onSubmit={(e) => { e.preventDefault(); alert('Дякуємо! Ваша заявка успішно надіслана.'); setIsAdoptModalOpen(false); }} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Ваше ім'я</label>
                                    <input required type="text" placeholder="Іван Петренко" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#513894] focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Телефон</label>
                                    <input required type="tel" placeholder="+38 (063) 000-00-00" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#513894] focus:outline-none" />
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button type="submit" className="flex-1 bg-[#513894] text-white py-3 rounded-xl font-semibold hover:bg-[#412c75] transition">Надіслати</button>
                                    <button type="button" onClick={() => setIsAdoptModalOpen(false)} className="px-5 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition">Скасувати</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {isDonationModalOpen && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Підтримати притулок 🐾</h3>
                            <p className="text-sm text-gray-500 mb-6">Ваші кошти йдуть на харчування та лікування тварин.</p>
                            <div className="grid grid-cols-3 gap-3 mb-4">
                                <button type="button" className="border-2 border-[#513894] bg-purple-50 text-[#513894] py-3 rounded-xl font-bold text-center">100 ₴</button>
                                <button type="button" className="border border-gray-200 hover:border-[#513894] py-3 rounded-xl font-bold text-center">250 ₴</button>
                                <button type="button" className="border border-gray-200 hover:border-[#513894] py-3 rounded-xl font-bold text-center">500 ₴</button>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button onClick={() => { alert('Дякуємо за вашу підтримку!'); setIsDonationModalOpen(false); }} className="flex-1 bg-[#513894] text-white py-3 rounded-xl font-semibold hover:bg-[#412c75] transition">Допомогти</button>
                                <button onClick={() => setIsDonationModalOpen(false)} className="px-5 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition">Закрити</button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </Router>
    );
}