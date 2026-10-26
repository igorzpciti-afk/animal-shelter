import React, { useState } from 'react';

export default function FindFriend({ onSelectPet, onOpenDonation }) {
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const pets = [
    {
      id: 1,
      name: 'Рекс',
      type: 'dog',
      breed: 'Німецька вівчарка',
      age: '2 роки',
      city: 'Київ',
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
      tags: ['Щеплений', 'Активний', 'Шукає дім'],
      description: 'Рекс — дуже розумний, вірний та енергійний пес. Знає базові команди, чудово ладнає з дітьми та іншими тваринами.'
    },
    {
      id: 2,
      name: 'Мурка',
      type: 'cat',
      breed: 'Британська короткошерста',
      age: '1 рік',
      city: 'Львів',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
      tags: ['Стерилізована', 'Спокійна', 'Лагідна'],
      description: 'Лагідна кішечка Мурка шукає затишний дім. Дуже любить сидіти на колінах та муркотіти.'
    },
    {
      id: 3,
      name: 'Бобік',
      type: 'dog',
      breed: 'Метис',
      age: '3 місяці',
      city: 'Київ',
      image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80',
      tags: ['Малюк', 'Грайливий', 'Терміново'],
      description: 'Маленьке цуценя, знайдене на вулиці. Шукає люблячу родину, яка виховає справжнього вірного друга.'
    },
    {
      id: 4,
      name: 'Луна',
      type: 'cat',
      breed: 'Шотландська вислоуха',
      age: '2 роки',
      city: 'Одеса',
      image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=600&q=80',
      tags: ['Привчена до лотка', 'Лагідна'],
      description: 'Луна має неймовірні блакитні очі та спокійний характер. Чудово почувається в квартирі.'
    }
  ];

  const filteredPets = pets.filter(pet => {
    const matchesType = filterType === 'all' || pet.type === filterType;
    const matchesSearch = pet.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pet.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="max-w-7xl w-full mx-auto px-6 py-10">
      <div className="bg-gradient-to-r from-purple-900 to-[#513894] rounded-3xl p-8 md:p-12 text-white mb-12 shadow-xl flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-xl mb-8 md:mb-0">
          <span className="bg-emerald-400 text-purple-950 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
            Добрий притулок
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold mt-4 mb-4 leading-tight">
            Знайди свого вірного друга вже сьогодні
          </h1>
          <p className="text-purple-200 text-base md:text-lg mb-6">
            GladPet допомагає безпритульним тваринам знайти турботливі родини, а вам — вірного члена сім'ї.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#a3d95b] hover:bg-[#92c748] text-gray-900 font-bold px-6 py-3 rounded-xl shadow transition">
              Обрати улюбленця
            </button>
            <button 
              onClick={onOpenDonation}
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-6 py-3 rounded-xl backdrop-blur-sm transition">
              Зробити внесок
            </button>
          </div>
        </div>
        <div>
          <img 
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80" 
            alt="Happy animals" 
            className="rounded-2xl shadow-2xl w-80 h-64 object-cover border-4 border-white/20"
          />
        </div>
      </div>

      <div id="catalog" className="mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Тварини, які шукають дім</h2>
            <p className="text-gray-500 mt-1">Оберіть собі друга серед наших підопічних</p>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <div className="bg-gray-100 rounded-xl p-1 flex">
              <button onClick={() => setFilterType('all')} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filterType === 'all' ? 'bg-[#513894] text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}>Усі</button>
              <button onClick={() => setFilterType('dog')} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filterType === 'dog' ? 'bg-[#513894] text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}>Собаки</button>
              <button onClick={() => setFilterType('cat')} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filterType === 'cat' ? 'bg-[#513894] text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}>Коти</button>
            </div>
            <input 
              type="text" 
              placeholder="Пошук за ім'ям, породою..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#513894]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPets.map(pet => (
            <div key={pet.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition flex flex-col border border-gray-100 group">
              <div className="relative h-56 overflow-hidden">
                <img src={pet.image} alt={pet.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#513894]">{pet.city}</div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{pet.name}</h3>
                    <span className="text-sm font-medium text-gray-500">{pet.age}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{pet.breed}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {pet.tags.map((tag, idx) => (
                      <span key={idx} className="bg-purple-50 text-[#513894] text-xs px-2.5 py-1 rounded-md font-medium">{tag}</span>
                    ))}
                  </div>
                </div>
                <button onClick={() => onSelectPet(pet)} className="w-full bg-purple-50 hover:bg-[#513894] text-[#513894] hover:text-white font-semibold py-2.5 rounded-xl transition">
                  Детальніше
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}