import React from 'react';

export default function About() {
  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 max-w-4xl mx-auto my-10 px-6">
      <h2 className="text-3xl font-bold text-[#513894] mb-6">Про проєкт GladPet</h2>
      <p className="text-gray-600 text-lg leading-relaxed mb-6">
        GladPet — це некомерційний проєкт, спрямований на системне вирішення проблеми безпритульних тварин гуманними способами. Завдяки безкоштовному онлайн-ресурсу кожен може знайти собі домашнього улюбленця.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 text-center">
        <div className="bg-purple-50 p-6 rounded-2xl">
          <div className="text-3xl font-black text-[#513894] mb-1">1200+</div>
          <div className="text-sm text-gray-600 font-medium">Врятованих тварин</div>
        </div>
        <div className="bg-purple-50 p-6 rounded-2xl">
          <div className="text-3xl font-black text-[#513894] mb-1">850+</div>
          <div className="text-sm text-gray-600 font-medium">Знайшли новий дім</div>
        </div>
        <div className="bg-purple-50 p-6 rounded-2xl">
          <div className="text-3xl font-black text-[#513894] mb-1">50+</div>
          <div className="text-sm text-gray-600 font-medium">Партнерів по Україні</div>
        </div>
      </div>
    </div>
  );
}