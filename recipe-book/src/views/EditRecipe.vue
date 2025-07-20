<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRecipeStore } from '@/stores/recipe';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const recipeStore = useRecipeStore();

// const recipe: any = computed(() => recipeStore.getRecipeById(route.params.id as string))
const name = ref<string>('');
const description = ref<string>('');

const fetchRecipe = () => {
    const recipe = recipeStore.getRecipeById(route.params.id as string);
    if(recipe) {
        name.value = recipe.name;
        description.value = recipe.description;
    } else {
        router.push({name: 'not-found'});
    }
}

const editRecipe = () => {
    recipeStore.editRecipe({
        id: route.params.id as string,
        name: name.value,
        description: description.value
    })
    router.push({ name: 'home' });
}

onMounted(() => {
    console.log('Fetching Recipe');
    fetchRecipe();
});
</script>

<template>
    <div class="flex flex-col justify-center items-center p-5">
        <div>
            <input class="border border-gray-400 rounded mx-5 p-2" type="text" v-model="name" placeholder="Recipe name" />
            <input class="border border-gray-400 rounded mx-5 p-2" type="text" v-model="description" placeholder="Recipe description" />
        </div>
        <form @submit.prevent="editRecipe">
            <button type="submit" 
            class="px-4 py-2 mt-6 bg-blue-600 text-white font-medium rounded hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50"
            >Edit Recipe</button>
        </form>
    </div>
</template>