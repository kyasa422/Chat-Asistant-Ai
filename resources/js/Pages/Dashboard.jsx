import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Fetch your API_KEY from environment variables or config
const API_KEY = 'AIzaSyCB2kylilC7_PmWhRy24i-hTzPJH9Q3yzg';  // Pastikan ini diambil dari environment variable atau konfigurasi yang aman
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

export default function Dashboard({ auth }) {
    const [prompt, setPrompt] = useState('');
    const [generatedContent, setGeneratedContent] = useState('');
    const [history, setHistory] = useState([
        {
            role: 'user',
            parts: [{ text: 'Hello' }]
        },
        {
            role: 'model',
            parts: [{ text: 'Great to meet you. What would you like to know?' }]
        }
    ]);

    const handleGenerateContent = async () => {
        try {
            // Mulai chat dengan histori percakapan
            const chat = model.startChat({ history });

            // Kirim pesan baru
            const result = await chat.sendMessage(prompt);
            const content = result.response.text();

            // Update histori dan konten yang dihasilkan
            setHistory([
                ...history,
                { role: 'user', parts: [{ text: prompt }] },
                { role: 'model', parts: [{ text: content }] }
            ]);
            setGeneratedContent(content);
        } catch (error) {
            console.error('Error generating content:', error);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div>You're logged in!</div>
                            
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold mb-4">Generate Content using Gemini API</h3>
                                <input
                                    type="text"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="Enter your prompt"
                                    className="border border-gray-300 p-2 rounded mb-4 w-full"
                                />
                                <button
                                    onClick={handleGenerateContent}
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Generate Content
                                </button>

                                {generatedContent && (
                                    <div className="mt-6">
                                        <h4 className="text-md font-semibold">Generated Content:</h4>
                                        <p className="mt-2 p-4 bg-gray-100 rounded">{generatedContent}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
