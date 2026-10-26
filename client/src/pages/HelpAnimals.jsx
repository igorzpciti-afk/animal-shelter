import React from 'react';

export default function HelpAnimals({ onOpenDonation }) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-[#513894] mb-6">Як можна допомогти притулку</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-3xl mb-3">🍲</div>
          <h3 className="font-bold text-lg mb-2">Корм та ліки</h3>
          <p className="text-gray-600 text-sm">Притулок завжди потребує сухих кормів, консервів та медикаментів.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-3xl mb-3">🤲</div>
          <h3 className="font-bold text-lg mb-2">Волонтерство</h3>
          <p className="text-gray-600 text-sm">Ви можете вигулювати собак та допомагати прибирати вольєри.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-3xl mb-3">💳</div>
          <h3 className="font-bold text-lg mb-2">Фінансова підтримка</h3>
          <p className="text-gray-600 text-sm">Будь-який донат покриває термінові операції та лікування.</p>
        </div>
      </div>
      <div className="text-center">
        <button onClick={onOpenDonation} className="bg-[#a3d95b] hover:bg-[#92c748] text-gray-900 font-bold px-8 py-4 rounded-2xl shadow-lg transition">
          Зробити благодійний внесок
        </button>
      </div>
    </div>
  );
}