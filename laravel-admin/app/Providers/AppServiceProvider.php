<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::define('view', function ($user, $model) {
            return $user->hasAccess('view_' . $model) || $user->hasAccess('edit_' . $model);
        });

        Gate::define('edit', function ($user, $model) {
            return $user->hasAccess('edit_' . $model);
        });
    }
}
