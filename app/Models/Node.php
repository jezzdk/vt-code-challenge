<?php

namespace App\Models;

use App\Enums\NodeType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Node extends Model
{
    use HasFactory;

    protected $fillable = [
        'parent_id',
        'depth',
        'name',
        'type',
        'info',
    ];

    protected $casts = [
        'depth' => 'integer',
        'type' => NodeType::class,
    ];

    public function parent()
    {
        return $this->belongsTo(static::class);
    }

    public function children()
    {
        return $this->hasMany(static::class, 'parent_id');
    }
}
