import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import React, { useState } from 'react';

export default function Dashboard({ auth }) {
    const [prompt, setPrompt] = useState('');
    const [content, setContent] = useState('');

    const handleGenerateContent = async () => {
        Inertia.post('/generate-content', { prompt }, {
            onSuccess: (page) => {
                const responseContent = page.props.content;
                setContent(responseContent.text); // Update with the returned text from API
            },
            onError: (errors) => {
                console.error("Error generating content", errors);
            }
        });
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

                                {content && (
                                    <div className="mt-6">
                                        <h4 className="text-md font-semibold">Generated Content:</h4>
                                        <p className="mt-2 p-4 bg-gray-100 rounded">{content}</p>
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
