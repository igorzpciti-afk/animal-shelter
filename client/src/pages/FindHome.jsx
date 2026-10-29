import React, { useState } from 'react';

export default function FindHome() {
    const [formData, setFormData] = useState({
        name: '',
        species: 'Собака', // або кіт за замовчуванням
        breed: '',
        age: '',
        city: '',
        description: '',
        imageUrl: ''
    });
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const apiUrl = import.meta.env.VITE_API_URL || 'https://00fitkp3-7240.euw.devtunnels.ms';

        try {
            const response = await fetch(`${apiUrl}/api/Animals`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    species: formData.species,
                    breed: formData.breed || 'Не вказано',
                    age: Number(formData.age) || 1,
                    city: formData.city,
                    description: formData.description,
                    imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80'
                }),
            });

            if (response.ok) {
                alert('Анкету успішно надіслано та опубліковано!');
                setFormData({ name: '', species: 'Собака', breed: '', age: '', city: '', description: '', imageUrl: '' });
            } else {
                alert('Помилка при збереженні на сервері.');
            }
        } catch (err) {
            console.error('Помилка мережі:', err);
            alert('Не вдалося зєднатися з сервером. Перевірте чи запущений бекенд.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-6 py-10 bg-white rounded-3xl shadow-sm border border-gray-100 my-10">
            <h2 className="text-3xl font-bold text-[#513894] mb-4">Допомогти тварині знайти дім</h2>
            <p className="text-gray-600 mb-8">Якщо ви знайшли безпритульну тварину або мусите прилаштувати улюбленця, заповніть анкету.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Ім'я тварини *</label>
                    <input
                        required
                        type="text"
                        placeholder="Наприклад, Барсик"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#513894] focus:outline-none"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Вид тварини *</label>
                        <select
                            value={formData.species}
                            onChange={e => setFormData({ ...formData, species: e.target.value })}
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:ring-2 focus:ring-[#513894] focus:outline-none">
                            <option value="Собака">Собака</option>
                            <option value="Кіт">Кіт</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Порода</label>
                        <input
                            type="text"
                            placeholder="Німецька вівчарка"
                            value={formData.breed}
                            onChange={e => setFormData({ ...formData, breed: e.target.value })}
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#513894] focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Вік (років)</label>
                        <input
                            type="number"
                            placeholder="1"
                            value={formData.age}
                            onChange={e => setFormData({ ...formData, age: e.target.value })}
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#513894] focus:outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Місто *</label>
                    <input
                        required
                        type="text"
                        placeholder="Київ, Львів..."
                        value={formData.city}
                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#513894] focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Посилання на фото (URL)</label>
                    <input
                        type="text"
                        placeholder="https://images.unsplash.com/..."
                        value={formData.imageUrl}
                        onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py.5 text-sm focus:ring-2 focus:ring-[#513894] focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Опис *</label>
                    <textarea
                        required
                        rows="4"
                        placeholder="Розкажіть про тварину..."
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#513894] focus:outline-none"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#513894] hover:bg-[#412c75] text-white font-semibold py-3 rounded-xl transition disabled:opacity-50">
                    {submitting ? 'Відправка...' : 'Опублікувати оголошення'}
                </button>
            </form>
        </div>
    );
}