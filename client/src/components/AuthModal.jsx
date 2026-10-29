import React, { useState } from 'react';

export default function AuthModal({ isOpen, onClose }) {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        fullName: ''
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');

        const apiUrl = import.meta.env.VITE_API_URL || 'https://volodymyrstrohan-001-site1.dtempurl.com';
        const endpoint = isLoginMode
            ? `${apiUrl}/api/Auth/login` : `${apiUrl}/api/Auth/register`;

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Помилка авторизації або реєстрації. Перевірте введені дані.');
            }

            const data = await response.json();
            console.log('Успіх:', data);

            const token = data.token || data.accessToken || data.jwt;
            if (token) {
                localStorage.setItem('token', token);
            }
            localStorage.setItem('userEmail', formData.email);
            if (data.fullName) {
                localStorage.setItem('userName', data.fullName);
            }

            // Показуємо гарне повідомлення на формі замість alert
            setSuccessMessage(isLoginMode ? 'Успішний вхід!' : 'Реєстрація успішна!');

            // Через 1.2 секунди закриваємо вікно і перезавантажуємо сторінку для оновлення шапки
            setTimeout(() => {
                onClose();
                window.location.reload();
            }, 1200);

        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 font-bold text-lg">
                    ✕
                </button>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {isLoginMode ? 'Вхід у систему' : 'Реєстрація'}
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                    {isLoginMode ? 'Вітаємо з поверненням до GladPet!' : 'Створіть акаунт, щоб допомагати тваринам'}
                </p>

                {error && <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-xl">{error}</div>}
                {successMessage && <div className="mb-4 p-3 bg-green-50 text-green-700 text-sm font-semibold rounded-xl text-center">✨ {successMessage}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLoginMode && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Повне ім'я (ФІО) *</label>
                            <input
                                type="text"
                                name="fullName"
                                required
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#513894] focus:outline-none"
                                placeholder="Ігор Медведенко"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#513894] focus:outline-none"
                            placeholder="example@email.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Пароль *</label>
                        <input
                            type="password"
                            name="password"
                            required
                            minLength={6}
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#513894] focus:outline-none"
                            placeholder="Мінімум 6 символів"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || successMessage}
                        className="w-full bg-[#513894] hover:bg-[#412c75] text-white font-semibold py-3 rounded-xl transition shadow-md disabled:opacity-50">
                        {loading ? 'Обробка...' : (isLoginMode ? 'Увійти' : 'Зареєструватися')}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    {isLoginMode ? 'Ще не маєте акаунта? ' : 'Вже є акаунт? '}
                    <button
                        onClick={() => setIsLoginMode(!isLoginMode)}
                        className="text-[#513894] font-semibold hover:underline">
                        {isLoginMode ? 'Зареєструватися' : 'Увійти'}
                    </button>
                </div>
            </div>
        </div>
    );
}