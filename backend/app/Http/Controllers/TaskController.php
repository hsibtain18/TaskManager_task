<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // 1. Get All
    public function index() {
        return response()->json(Task::orderBy('created_at', 'desc')->get());
    }

    // 2. Insert (Create) Woth auto ID increment 
    public function store(Request $request) {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'status' => 'in:pending,completed'
        ]);
        $task = Task::create($validated);
        return response()->json($task, 201);
    }

   
}