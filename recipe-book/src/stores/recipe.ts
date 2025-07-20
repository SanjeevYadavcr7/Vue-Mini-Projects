import { defineStore } from "pinia";
import { ref } from "vue";

interface Recipe {
    id: string,
    name: string,
    description: string
}

type NewRecipe = Omit<Recipe, 'id'>;

export const useRecipeStore = defineStore('recipe', () => {
    // state --> represents actual data
    const recipes = ref<Recipe[]>([]);
    const favoritesList = ref<string[]>([]);


    // actions --> leads to change in state
    const addRecipe = (recipe: NewRecipe) => {
        const newRecipe = {
            ...recipe,
            id: Date.now().toString()
        }
        recipes.value.push(newRecipe);
        return newRecipe;
    }

    const editRecipe = (recipe: Recipe) => {
        let selectedRecipe = recipes.value.findIndex((r) => r.id === recipe.id);
        recipes.value[selectedRecipe] = recipe;
    }

    const toggleFavorite = (id: string) => {
        const isFavorite = favoritesList.value?.includes(id);
        if(isFavorite) {
            favoritesList.value = favoritesList.value.filter((favId) => favId !== id);
        } else {
            favoritesList.value.push(id);
        }
    }

    // getters
    const getRecipeById = (id: string) => recipes.value.find((recipe) => recipe.id === id);
    
    const filteredRecipeList = (searchTerm: string) => 
        recipes.value.filter((recipe) => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const isFavorite = (id: string) => favoritesList.value.includes(id);

    return {
        recipes,
        addRecipe,
        getRecipeById,
        filteredRecipeList,
        editRecipe,
        isFavorite,
        toggleFavorite
    }
})