<script setup lang="ts">
import { useRecipeStore } from '@/stores/recipe';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const recipeStore = useRecipeStore();

const name = ref<string>('');
const description = ref<string>('');

const addRecipe = () => {
    const recipe = recipeStore.addRecipe({
        name: name.value,
        description: description.value
    })
    router.push({ name: 'recipe', params: { id: recipe.id} });
}

</script>

<template>
    <div class="flex flex-col justify-center items-center p-5">
        <div>
            <input class="border border-gray-400 rounded mx-5 p-2" type="text" v-model="name" placeholder="Recipe name" />
            <input class="border border-gray-400 rounded mx-5 p-2" type="text" v-model="description" placeholder="Recipe description" />
        </div>
        <form @submit.prevent="addRecipe">
            <button type="submit" 
            class="px-4 py-2 mt-6 bg-blue-600 text-white font-medium rounded hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50"
            >Add Recipe</button>
        </form>
    </div>
</template>