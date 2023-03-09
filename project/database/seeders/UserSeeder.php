<?php

namespace Database\Seeders;

use App\Constants\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach (range(1, 50) as $index) {
            $role = rand(1, 100) % 2 === 0 ? Role::ADMINISTRATOR : Role::USER;

            User::factory()->create(['role' => $role]);
        }
    }
}
