<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useRecipeStore } from '@/stores/recipe';

const {filteredRecipeList} = useRecipeStore();

const searchQuery = ref<string>('');
const recipeList: any = computed(() => {
  return filteredRecipeList(searchQuery.value)
});
</script>

<template>
    <div class="flex flex-col justify-center items-center p-5">
      <input 
        class="border border-gray-400 rounded mx-5 p-2 w-xl" 
        type="text" v-model="searchQuery" placeholder="Recipe name" 
      />
      
      <div v-if="recipeList.length" class="w-xl mt-10 font-medium">
        <div v-for="recipe in recipeList" :key="recipe.id" class="flex gap-5 mt-5">
          <span class="text-md text-gray-600">{{ recipe.name }}</span>
          <RouterLink :to="{name: 'recipe', params: {id: recipe.id}}">
            <span class="text-md text-blue-600">Details</span>            
          </RouterLink>
          <RouterLink :to="{name: 'edit', params: {id: recipe.id} }">
            <span class="text-md text-green-600">Edit</span>            
          </RouterLink>
        </div>
      </div>
      <div v-else>

      </div>

    </div>
</template>
