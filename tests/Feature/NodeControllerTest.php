<?php

use App\Models\Node;

test('it can return root nodes', function () {
    $node = Node::factory()->create();

    $response = $this->get('/api/nodes');

    $response->assertStatus(200)->assertJsonCount(1);

    expect($response->json()[0]['name'])->toBe($node->name);
});

test('it can create a new node', function () {
    $root = Node::factory()->create(['name' => 'CEO']);

    $response = $this->post('/api/nodes', [
        'parent_id' => $root->id,
        'depth' => $root->depth + 1,
        'name' => 'John Doe',
    ]);

    $response->assertStatus(201);

    expect($response->json('name'))->toBe('John Doe');
});

test('it can show a node with children', function () {
    $root = Node::factory()->create(['name' => 'CEO']);

    $children = Node::factory()->count(5)->create([
        'parent_id' => $root->id,
        'depth' => $root->depth + 1,
    ]);

    $response = $this->get('/api/nodes/' . $root->id);

    $response->assertStatus(200);

    expect(sizeof($response->json('children')))->toBe(sizeof($children));
});

test('it can change the parent of a node', function () {
    $root = Node::factory()->create(['name' => 'CEO']);

    $child1 = Node::factory()->create(['name' => 'Child 1', 'parent_id' => $root->id, 'depth' => $root->depth + 1]);
    $child2 = Node::factory()->create(['name' => 'Child 2', 'parent_id' => $root->id, 'depth' => $root->depth + 1]);

    $node = Node::factory()->create(['name' => 'John Doe', 'parent_id' => $child1->id, 'depth' => $child1->depth + 1]);

    expect($node->parent_id)->toBe($child1->id);

    $response = $this->patch('/api/nodes/' . $node->id, [
        'parent_id' => $child2->id,
        'depth' => $child2->depth + 1,
    ]);

    $response->assertStatus(200);

    expect($response->json('parent_id'))->toBe($child2->id);
});

test('it can not change the parent of the root node', function () {
    $root = Node::factory()->create(['name' => 'CEO']);

    $child1 = Node::factory()->create(['name' => 'Child 1', 'parent_id' => $root->id, 'depth' => $root->depth + 1]);

    $response = $this->patch('/api/nodes/' . $root->id, [
        'parent_id' => $child1->id,
        'depth' => $child1->depth + 1,
    ]);

    $response->assertStatus(403);

    $this->assertDatabaseHas('nodes', ['id' => $root->id, 'parent_id' => null]);
});

test('it can delete a node', function () {
    $root = Node::factory()->create(['name' => 'CEO']);

    $node = Node::factory()->create(['name' => 'John Doe', 'parent_id' => $root->id, 'depth' => $root->depth + 1]);

    $response = $this->delete('/api/nodes/' . $node->id);

    $response->assertStatus(204);

    $this->assertDatabaseMissing('nodes', ['id' => $node->id]);
});

test('it can not delete the root node', function () {
    $root = Node::factory()->create(['name' => 'CEO']);

    $response = $this->delete('/api/nodes/' . $root->id);

    $response->assertStatus(403);

    $this->assertDatabaseHas('nodes', ['id' => $root->id]);
});
