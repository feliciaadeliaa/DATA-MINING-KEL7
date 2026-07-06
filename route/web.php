<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TextDetectorController;

Route::get('/', [TextDetectorController::class, 'index'])->name('detector.index');
Route::post('/detect', [TextDetectorController::class, 'detect'])->name('detector.process');