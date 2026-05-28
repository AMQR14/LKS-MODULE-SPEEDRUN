<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Level extends Model
{
    protected $guarded = [
        'id'
    ];

    public function order() : HasMany {
        return $this->hasMany(Order::class , 'level_id');
    }

    public function level_feature() : HasMany {
        return $this->hasMany(LevelFeature::class , 'level_id');
    }
}
