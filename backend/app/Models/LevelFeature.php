<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LevelFeature extends Model
{
    protected $guarded = [
        'id'
    ];

    public function level() : BelongsTo {
        return $this->belongsTo(Level::class);
    }
}
