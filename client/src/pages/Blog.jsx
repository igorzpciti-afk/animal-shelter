import React from 'react';

export default function Blog() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-[#513894] mb-4">Корисні статті та новини</h2>
      <p className="text-gray-600 mb-8">Дізнайтеся більше про догляд за тваринами.</p>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 items-center">
          <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=300&q=80" alt="Blog" className="w-full md:w-48 h-32 object-cover rounded-xl" />
          <div>
            <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md">Поради</span>
            <h3 className="text-xl font-bold text-gray-900 mt-2 mb-2">Як підготувати квартиру до нового цуценяти</h3>
            <p className="text-gray-600 text-sm">Перші дні в новому домі — стрес як для господаря, так і для тварини...</p>
          </div>
        </div>
      </div>
    </div>
  );
}