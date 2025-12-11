<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    
     public $withinTransaction = false;

    public function up(): void
    {
        Schema::create('sale_details', function (Blueprint $table) {
            $table->id();
            $table->smallInteger('cantidad');
            $table->decimal('precio',11,2);
            $table->decimal('descuento',11,2);
            $table->foreignId('sale_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('variant_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sale_details');
    }
};
