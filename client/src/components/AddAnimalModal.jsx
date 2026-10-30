import React, { useState } from 'react';

export default function AddAnimalModal({ isOpen, onClose, onAnimalAdded }) {
    const [formData, setFormData] = useState({
        name: '',
        species: '',
        breed: '',
        age: 0,
        description: '',
        imageUrl: '',
        city: '',
        status: 0
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'age' || name === 'status' ? Number(value) : value
        }));
    };

    //const handleSubmit = async (e) => {
    //    e.preventDefault();
    //    setLoading(true);
    //    setError('');

    //    const apiUrl = import.meta.env.VITE_API_URL || 'https://volodymyrstrohan-001-site1.dtempurl.com';

    //    try {
    //        const response = await fetch(`${apiUrl}/api/Animals`, {
    //            method: 'POST',
    //            headers: {
    //                'Content-Type': 'application/json',
    //            },
    //            body: JSON.stringify(formData),
    //        });

    //        if (!response.ok) {
    //            throw new Error('Помилка при створенні запису. Перевірте введені дані.');
    //        }

    //        const newAnimal = await response.json();
    //        onAnimalAdded(newAnimal);
    //        onClose();
    //    } catch (err) {
    //        setError(err.message);
    //    } finally {
    //        setLoading(false);
    //    }
    //};

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        const baseUrl = import.meta.env.VITE_API_URL || 'http://volodymyrstrohan-001-site1.dtempurl.com';
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${baseUrl}/api/Animals`, {
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
                    imageUrl: formData.imageUrl
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Помилка при додаванні тварини');
            }

            const newAnimal = await response.json();
            onAnimalAdded(newAnimal);
            onClose();
        } catch (err) {
            console.error('Помилка:', err);
            setError('Не вдалося додати тварину. Перевірте з’єднання з сервером.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-xl font-bold">
                    ✕
                </button>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">Додати пітомца до притулку</h2>

                {error && <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-xl">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Кличка *</label>
                        <input
                            type="text"
                            name="name"
                            required
                            maxLength={30}
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-white text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#513894] focus:outline-none"
                            placeholder="Наприклад: Рекс"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Вид тварини *</label>
                        <input
                            type="text"
                            name="species"
                            required
                            value={formData.species}
                            onChange={handleChange}
                            className="w-full bg-white text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#513894] focus:outline-none"
                            placeholder="Собака / Кіт"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Порода</label>
                        <input
                            type="text"
                            name="breed"
                            value={formData.breed}
                            onChange={handleChange}
                            className="w-full bg-white text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#513894] focus:outline-none"
                            placeholder="Німецька вівчарка"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Вік (років)</label>
                            <input
                                type="number"
                                name="age"
                                min="0"
                                max="30"
                                value={formData.age}
                                onChange={handleChange}
                                className="w-full bg-white text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#513894] focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Місто *</label>
                            <input
                                type="text"
                                name="city"
                                required
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full bg-white text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#513894] focus:outline-none"
                                placeholder="Київ"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Фото тварини *</label>
                        <input
                            type="file"
                            accept="image/*"
                            required
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setFormData(prev => ({ ...prev, imageUrl: reader.result }));
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                            className="w-full bg-white text-gray-900 border border-gray-200 rounded-xl px-4 py-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-[#513894] hover:file:bg-purple-100 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Опис</label>
                        <textarea
                            name="description"
                            rows="3"
                            maxLength={500}
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full bg-white text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#513894] focus:outline-none"
                            placeholder="Розкажіть трохи про характер та особливості..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#513894] hover:bg-[#412c75] text-white font-semibold py-3 rounded-xl transition shadow-md">
                        {loading ? 'Збереження...' : 'Додати тварину'}
                    </button>
                </form>
            </div>
        </div>
    );
}