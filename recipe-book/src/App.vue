<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { useRecipeStore } from './stores/recipe';

const recipeStore = useRecipeStore();

</script>

<template>
  <nav>
    <ul class="flex flex-row gap-10 justify-center p-8 border-b border-gray-200 text-gray-600">
      <li>
        <RouterLink to="/">Home</RouterLink>
      </li>
      <li>
        <RouterLink to="/favorites">Favorites</RouterLink>
      </li>
      <li>
        <RouterLink to="/add-recipe">Add Recipe</RouterLink>
      </li>
    </ul>
  </nav>

  <RouterView />
</template>
