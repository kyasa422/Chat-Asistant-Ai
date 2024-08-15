<?php

namespace App\Http\Controllers;

use App\Services\GeminiService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GeminiController extends Controller
{
    protected $geminiService;

    public function __construct(GeminiService $geminiService)
    {
        $this->geminiService = $geminiService;
    }

    public function generateContent(Request $request)
    {
        $prompt = $request->input('prompt');
        $content = $this->geminiService->generateContent($prompt);

        return Inertia::render('Dashboard', [
            'content' => $content,
        ]);
    }
}
