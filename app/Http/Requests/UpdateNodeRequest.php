<?php

namespace App\Http\Requests;

use App\Enums\NodeType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class UpdateNodeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'parent_id' => 'required|integer|exists:nodes,id',
            'depth' => 'required|integer|min:1',
            'name' => 'required|string|max:255',
            'type' => [new Enum(NodeType::class)],
            'info' => 'nullable|string|max:255',
        ];
    }
}
