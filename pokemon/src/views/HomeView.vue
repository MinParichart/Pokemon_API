<script setup lang="ts">
import CardDisplay from '@/components/CardDisplay.vue'
import Header from '@/components/Header.vue'
import usePokemon from '@/composables/usePokemon'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 
const { pokemons, loading, error, fetchPokemons } = usePokemon()

const searchQuery = ref('')
const currentPage = ref(1)
const cardsPerPage = 20

const handleSearch = (query: string) => {
  searchQuery.value = query.toLowerCase()
  currentPage.value = 1
  router.replace({ name: 'home', query: { page: '1' } })
}

const filteredPokemons = computed(() => {
  return pokemons.value.filter((p) => p.name.toLowerCase().includes(searchQuery.value))
})

const totalPages = computed(() => Math.ceil(filteredPokemons.value.length / cardsPerPage))

const paginatedPokemons = computed(() => {
  const start = (currentPage.value - 1) * cardsPerPage
  return filteredPokemons.value.slice(start, start + cardsPerPage)
})

const startIndex = computed(() => (currentPage.value - 1) * cardsPerPage)

const endIndex = computed(() =>
  Math.min(startIndex.value + cardsPerPage, filteredPokemons.value.length),
)

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    router.replace({ name: 'home', query: { page: String(page) } })
  }
}

// Generate visible page bumbers
const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  const range = 2

  for (let i = Math.max(1, current - range); i <= Math.min(total, current + range); i++) {
    pages.push(i)
  }

  return pages
})

onMounted(async () => {
  await fetchPokemons()
  const q = Number(route.query.page || 1)
  currentPage.value = Number.isFinite(q) && q >= 1 ? q : 1
})
</script>

<style scoped>
.font-caprasimo {
  font-family: 'Caprasimo';
}
</style>


<template>
  <div class="container mx-auto px-4 py-8">
    <Header @search="handleSearch" />
    <div v-if="loading" class="text-center py-12">
      <p class="text-xl">Loading...</p>
    </div>

    <div v-else-if="error" class="text-center py-12 text-red-500">
      <p class="text-xl">{{ error }}</p>
    </div>

    <!-- display current page number -->
    <div v-else>
      <div class="text-center mb-4 text-gray-700">
        <p class="text-base">
          Result : {{ startIndex + 1 }} - {{ endIndex }} of {{ filteredPokemons.length }}
        </p>
      </div>

      <!-- Pokemon grid -->
      <div
        v-if="paginatedPokemons.length"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <CardDisplay
          v-for="pokemon in paginatedPokemons"
          :key="pokemon.name"
          :pokemon="pokemon"
          :current-page="currentPage"
        ></CardDisplay>
      </div>

      <div v-else class="text-center text-gray-500">No Pokémon matched your search.</div>

      <!-- Pagination buttons -->
      <div v-if="totalPages > 1" class="flex justify-center mt-8 flex-wrap gap-2">
        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          :class="[
            'px-4 py-2 rounded',
            currentPage === 1
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-blue-400 text-white hover:bg-blue-500',
          ]"
        >
          ← Previous
        </button>

        <button
          v-for="page in visiblePages"
          :key="page"
          @click="goToPage(page)"
          :class="['px-3 py-1 border rounded', currentPage == page ? 'bg-blue-500 text-white' : '']"
        >
          {{ page }}
        </button>

        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          :class="[
            'px-4 py-2 rounded',
            currentPage === totalPages
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-blue-400 hover:bg-blue-500',
          ]"
        >
          Next →
        </button>
      </div>
    </div>
  </div>
</template>

