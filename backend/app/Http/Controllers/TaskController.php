<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index() {
        return response()->json(Task::orderBy('created_at', 'desc')->get());
    }

    // Insert (Create) Woth auto ID increment 
    public function store(Request $request) {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'status' => 'in:pending,completed'
        ]);
        $task = Task::create($validated);
        return response()->json($task, 201);
    }

    public function destroy($id) {
            Task::destroy($id);
            return response()->json(['message' => 'Task deleted successfully']);
    }
    // 3. Get by ID
    public function show($id) {
        $task = Task::find($id);
        if (!$task) return response()->json(['message' => 'Task not found'], 404);
        return response()->json($task);
    }

    // 4. Update Task (Full)
    public function update(Request $request, $id) {
        $task = Task::findOrFail($id);
        $task->update($request->only(['title', 'description', 'status']));
        return response()->json($task);
    }

    // 5. Update Status Only
    public function updateStatus(Request $request, $id) {
        $task = Task::findOrFail($id);
        $task->update(['status' => $request->status]);
        return response()->json($task);
    }

    // 6. Delete
  
}