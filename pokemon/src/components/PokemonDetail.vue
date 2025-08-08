<template>
  <div class="continer mx-auto px-4 py-8">
    <div v-if="loading" class="text-center" py-12>loading...</div>
    <div v-else-if="error" class="text-center text-red-500 py-12">{{ error }}</div>
    <div v-else-if="pokemon" class="max-w-md mx-auto bg-white rounded-lg shadow p-6">
      <div class="flex flex-col items-center">
        <img
          :src="pokemon.sprites.front_default || fallbackImg"
          :alt="pokemon.name"
          class="h-32 w-32"
        />
        <h1 class="text-2xl font-bold capitalize mt-4">
          {{ pokemon.name }}
        </h1>
        <p class="text-gray-500">#{{ String(pokemon.id).padStart(3, '0') }}</p>
      </div>

      <div class="mt-6 text-center">
        <h2 class="text-lg font-semibold mb-2">Abilities</h2>
        <div>
          <ul class="list-disc list-outside text-left inline-block ">
            <li v-for="ability in abilityNames" :key="ability" class="capitalize">
              {{ ability }}
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-6 flex justify-center">
        <button @click="$router.back()" class="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200">
          ← Back
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Axios from 'axios'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

interface Ability {
  ability: {
    name: string
    url: string
  }
}

interface Sprites {
  front_default: string | null
}

interface PokemonResponse {
  id: number
  name: string
  sprites: Sprites
  abilities: Ability[]
}

const route = useRoute()

const pokemon = ref<PokemonResponse | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const fallbackImg = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png'
const abilityNames = computed(() => pokemon.value?.abilities.map((a) => a.ability.name) ?? [])
const fetchPokemon = async (id: string | number) => {
  try {
    loading.value = true
    error.value = null
    const { data } = await Axios.get<PokemonResponse>(`https://pokeapi.co/api/v2/pokemon/${id}`)
    pokemon.value = data
  } catch (e) {
    error.value = 'Error fetching Pekemon detail'
    console.error(e)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPokemon(route.params.id as string)
})

watch(
  () => route.params.id,
  (newId) => {
    if (newId) fetchPokemon(newId as string)
  },
)
</script>

<style scoped></style>
