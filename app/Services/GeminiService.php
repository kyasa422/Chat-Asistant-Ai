<?php

namespace App\Services;

use GuzzleHttp\Client;

class GeminiService
{
    protected $client;
    protected $apiKey;

    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = env('GEMINI_API_KEY');  // Pastikan API key ada di file .env
    }

    public function generateContent($prompt)
    {
        $response = $this->client->post('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent', [
            'query' => ['key' => $this->apiKey],
            'headers' => [
                'Content-Type' => 'application/json',
            ],
            'json' => [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => $prompt]
                        ]
                    ]
                ]
            ],
        ]);

        return json_decode($response->getBody()->getContents(), true);
    }
}
