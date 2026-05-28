<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    protected $guarded = [
        'id'
    ];

    public function user() : BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function level() : BelongsTo {
        return $this->belongsTo(Level::class);
    }
}
