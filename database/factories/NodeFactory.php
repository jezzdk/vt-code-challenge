<?php

namespace Database\Factories;

use App\Enums\NodeType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Node>
 */
class NodeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'parent_id' => null,
            'depth' => 0,
            'name' => $this->faker->name,
            'type' => NodeType::Other,
            'info' => null,
        ];
    }
}
