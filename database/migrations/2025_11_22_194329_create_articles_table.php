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
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('codigo',9)->unique();
            $table->string('nombre',100);
            $table->string('slug',110)->unique();
            $table->decimal('precioVenta', 10, 2);
            $table->string('imagen')->nullable();
            $table->boolean('estado')->default(true);
            $table->foreignId('brand_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('gender_id')->nullable()->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('subsubcategory_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
