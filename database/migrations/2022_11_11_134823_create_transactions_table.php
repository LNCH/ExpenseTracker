<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transaction_categories', function (Blueprint $table) {
            $table->id();
            $table->uuid();
            $table->string('name');
            $table->string('icon')->nullable();
            $table->string('colour')->nullable();
            $table->timestamps();
        });

        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->uuid();
            $table->string('type');
            $table->unsignedBigInteger('account_id');
            $table->datetime('date');
            $table->integer('amount');
            $table->unsignedBigInteger('category_id')->nullable();
            $table->boolean('is_recurring');
            $table->string('recurrence_rule')->nullable();
            $table->unsignedBigInteger('parent_transaction_id')->nullable();
            $table->boolean('is_essential');
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->foreign('account_id')->references('id')->on('accounts')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('category_id')->references('id')->on('transaction_categories')
                ->onUpdate('cascade')->onDelete('set null');

            $table->foreign('parent_transaction_id')->references('id')->on('transactions');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transactions');
    }
};
