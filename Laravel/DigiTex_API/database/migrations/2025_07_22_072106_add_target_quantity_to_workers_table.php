<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::table('workers', function (Blueprint $table) {
            $table->integer('target_quantity_today')->nullable();
        });
    }


    public function down(): void
    {
        Schema::table('workers', function (Blueprint $table) {
            //
        });
    }
};
