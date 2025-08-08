<template>
  <RouterLink 
  :to="{
    name : 'pokemon-detail', 
    params : { id : pokemonId }, 
    query : {page : String(currentPage)}
  }" 
  class="block mt-2">
    <div class="bg-white rounded-lg shadow-md p-4 hover:shadow-2xl transition-shadow">
      <div class="text-center">
        <img
          :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`"
          :alt="pokemon.name"
          class="mx-auto h-24 w-24"
        />
        <h3 class="text-lg font-semibold capitalize mt-2">{{ pokemon.name }}</h3>
        <span class="text-gray-500">#{{ pokemonId.toString().padStart(3, '0') }}</span>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  pokemon: {
    name: string
    url: string
  }
  currentPage : number
}>()

const pokemonId = computed(() => {
  const urlParts = props.pokemon.url.split('/')
  return parseInt(urlParts[urlParts.length - 2])
})
</script>
