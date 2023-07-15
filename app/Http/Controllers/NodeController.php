<?php

namespace App\Http\Controllers;

use App\Models\Node;
use App\Http\Requests\StoreNodeRequest;
use App\Http\Requests\UpdateNodeRequest;

class NodeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roots = Node::where('depth', 0)->withCount('children')->get();

        return $roots;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreNodeRequest $request)
    {
        $node = Node::create($request->validated());

        return $node;
    }

    /**
     * Display the specified resource.
     */
    public function show(Node $node)
    {
        return $node->loadCount('children')->load('children');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateNodeRequest $request, Node $node)
    {
        if ($node->depth === 0 && $request->filled('depth') && $request->input('depth') !== $node->depth) {
            abort(403, 'Root node can not change parent');
        }

        $node->update($request->validated());

        return $node->load('children');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Node $node)
    {
        if ($node->depth === 0) {
            abort(403, 'Root node can not be deleted');
        }

        $node->delete();

        return response()->noContent();
    }
}
