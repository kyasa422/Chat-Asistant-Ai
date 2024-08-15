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
        $this->apiKey = env('GEMINI_API_KEY');
    }
    
    public function generateContent($prompt)
    {
        $response = $this->client->post('https://api.gemini.yourapi.com/v1/generate', [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ],
            'json' => [
                'model' => 'gemini-1.5-flash',
                'prompt' => $prompt,
            ],
        ]);
        

        return json_decode($response->getBody()->getContents(), true);
    }
}
