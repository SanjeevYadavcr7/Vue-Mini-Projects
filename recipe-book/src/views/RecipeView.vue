<script setup lang="ts">
import { useRecipeStore } from '@/stores/recipe';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const recipeStore = useRecipeStore();
const recipe = computed(() => recipeStore.getRecipeById(route.params.id as string));
const isFavoriteRecipe = computed(() => recipe.value ? recipeStore.isFavorite(recipe.value.id) : false);
</script>

<template>
    <div class="flex flex-col justify-center items-center p-5">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">{{ recipe?.name }}</h1>
        <p>{{ recipe?.description }}</p>
        <button 
            v-if="recipe" 
            @click="recipeStore.toggleFavorite(recipe.id)"
            class="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50"
          >
            {{ isFavoriteRecipe ? 'Unfavorite' : 'Favorite' }}
          </button>
    </div>

</template>