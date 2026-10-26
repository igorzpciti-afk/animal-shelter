import React from 'react';

export default function FindHome() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10 bg-white rounded-3xl shadow-sm border border-gray-100 my-10">
      <h2 className="text-3xl font-bold text-[#513894] mb-4">Допомогти тварині знайти дім</h2>
      <p className="text-gray-600 mb-8">Якщо ви знайшли безпритульну тварину або мусите прилаштувати улюбленця, заповніть анкету.</p>
      
      <form onSubmit={(e) => { e.preventDefault(); alert('Анкету успішно надіслано на модерацію!'); }} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Ім'я тварини</label>
          <input required type="text" placeholder="Наприклад, Барсик" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#513894] focus:outline-none" />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Місто</label>
          <input required type="text" placeholder="Київ, Львів..." className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#513894] focus:outline-none" />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Опис</label>
          <textarea required rows="4" placeholder="Розкажіть про тварину..." className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#513894] focus:outline-none"></textarea>
        </div>
        <button type="submit" className="w-full bg-[#513894] hover:bg-[#412c75] text-white font-semibold py-3 rounded-xl transition">
          Опублікувати оголошення
        </button>
      </form>
    </div>
  );
}