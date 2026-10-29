import React, { useState } from 'react';

export default function FindHome() {
    const [formData, setFormData] = useState({
        name: '',
        species: 'Собака',
        breed: '',
        age: '',
        city: '',
        description: '',
        imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80'
    });
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');

    // Fungsiya fayyadamuun fakkii kompiitara irraa filatame gara Base64 jijjiiruuf
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, imageUrl: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        setSuccessMessage('');

        // Використовуємо рядок без жорсткого http, якщо розгортається на https
        const apiUrl = import.meta.env.VITE_API_URL || 'https://volodymyrstrohan-001-site1.dtempurl.com';
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${apiUrl}/api/Animals`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                },
                body: JSON.stringify({
                    name: formData.name,
                    species: formData.species,
                    breed: formData.breed || 'Не вказано',
                    age: Number(formData.age) || 0,
                    city: formData.city,
                    description: formData.description,
                    imageUrl: formData.imageUrl,
                    status: 0
                }),
            });

            if (response.ok) {
                setSuccessMessage('✨ Анкета успішно відправлена та опублікована!');
                setFormData({
                    name: '',
                    species: 'Собака',
                    breed: '',
                    age: '',
                    city: '',
                    description: '',
                    imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80'
                });
            } else {
                const errorText = await response.text();
                console.error('Помилка сервера:', errorText);
                setError(`Помилка сервера (${response.status}): перевірте впроваджені дані.`);
            }
        } catch (err) {
            console.error('Помилка мережі:', err);
            setError('Не вдалося з’єднатися з сервером. Перевірте підключення та HTTPS/HTTP сумісність.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-6 py-10 bg-white rounded-3xl shadow-sm border border-gray-100 my-10">
            <h2 className="text-3xl font-bold text-[#513894] mb-4">Допомогти тварині знайти дім</h2>
            <p className="text-gray-600 mb-8">Якщо ви знайшли безпритульну тварину або мусите прилаштувати улюбленця, заповніть анкету.</p>

            {error && <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-xl">{error}</div>}
            {successMessage && <div className="mb-4 p-3 bg-green-50 text-green-700 text-sm font-semibold rounded-xl text-center">{successMessage}</div>}

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
                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Фото тварини (з комп'ютера)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-[#513894] focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-[#513894] hover:file:bg-purple-100"
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