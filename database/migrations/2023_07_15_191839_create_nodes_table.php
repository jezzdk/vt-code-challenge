<?php

use App\Enums\NodeType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('nodes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('parent_id')->constrained('nodes', 'id')->cascadeOnDelete();
            $table->integer('depth')->unsigned()->default(0);
            $table->string('name');
            $table->enum('type', [
                NodeType::Other->value,
                NodeType::Manager->value,
                NodeType::Developer->value,
            ])->default(NodeType::Other->value);
            $table->string('info')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nodes');
    }
};
