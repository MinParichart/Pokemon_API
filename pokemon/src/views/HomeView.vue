<template>
  
  <div class="container mx-auto px-4 py-8">
    <Header/> 
    <div v-if="loading" class="text-center py-12">
      <p class="text-xl">Loading...</p>
    </div>

    <div v-else-if="error" class="text-center py-12 text-red-500">
      <p class="text-xl">{{ error }}</p>
    </div>

    <!-- display current page number -->
    <div v-else>
      <div class="text-center mb-4">
        <span class="font-mono text-xl"> Page {{  currentPage }}</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <CardDisplay
          v-for="pokemon in pokemons"
          :key="pokemon.name"
          :pokemon="pokemon"
        ></CardDisplay>
      </div>

      <div v-if="nextPage || previousPage" class="flex justify-center mt-8 space-x-4">
        <button
          @click="fetchPokemons(previousPage)"
          :disabled="!previousPage"
          class="px-4 py-2 bg-blue-400 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>

        <button
          @click="fetchPokemons(nextPage)"
          :disabled="!nextPage"
          class="px-4 py-2 bg-blue-400 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardDisplay from "@/components/CardDisplay.vue"
import Header from "@/components/Header.vue"
import usePokemon from '@/composables/usePokemon'
import { onMounted } from 'vue'

const { pokemons, 
  loading, 
  error, 
  nextPage, 
  previousPage, 
  currentPage, 
  fetchPokemons }
   = usePokemon()

onMounted(() => {
  fetchPokemons()
})
</script>

<style scoped>
.font-caprasimo {
  font-family: 'Caprasimo';
}
</style>
