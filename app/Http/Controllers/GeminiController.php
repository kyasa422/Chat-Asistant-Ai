<?php

namespace App\Http\Controllers;

use App\Services\GeminiService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log; // Add this line

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
        $request->validate([
            'prompt' => 'required|string',
        ]);
    
        $prompt = $request->input('prompt');
    
        try {
            $content = $this->geminiService->generateContent($prompt);
    
            return Inertia::render('Dashboard', [
                'content' => $content,
            ]);
        } catch (\Exception $e) {
            Log::error('Gemini API Error: ' . $e->getMessage()); // Update this line
    
            return back()->with('error', 'There was a problem generating content.');
        }
    }
    
}
