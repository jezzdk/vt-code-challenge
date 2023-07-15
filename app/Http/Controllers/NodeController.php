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
        $roots = Node::where('depth', 0)->get();

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
        return $node->load('children');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateNodeRequest $request, Node $node)
    {
        $node->update($request->validated());

        return $node->load('children');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Node $node)
    {
        $node->delete();

        return response()->noContent();
    }
}
