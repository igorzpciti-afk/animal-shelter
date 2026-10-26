import React from 'react';

export default function Partners() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-[#513894] mb-4">Наші партнери</h2>
      <p className="text-gray-600 mb-8">Організації та клініки, які підтримують GladPet.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center font-bold text-xl text-gray-400">🐾 VetClinic UA</div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center font-bold text-xl text-gray-400">🐶 PetFood Pro</div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center font-bold text-xl text-gray-400">🐱 Purrfect Care</div>
      </div>
    </div>
  );
}