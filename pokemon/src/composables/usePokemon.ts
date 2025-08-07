import Axios from 'axios'
import { ref } from 'vue'

// interface ( interface is structure for data type definitions )
interface Pokemon {
  name: string
  url: string
}

interface PokemonListResponse {
  results: Pokemon[]
  next: string
  previous: string
  count: number
}

export default function usePokemon() {
  // Variable Declaration by using | ref<data type | datatype> (defualt)
  const pokemons = ref<Pokemon[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const nextPage = ref<string>('nextPage')
  const previousPage = ref<string>('previousPage')
  const currentPage = ref<number>(1)
  const cardsPerPage = ref<number>(20) // defind display 20 card/page

  // function for using pokemon data
  const fetchPokemons = async (
    url: string = 'https://pokeapi.co/api/v2/pokemon?limit=${cardsPerPage.value}',
  ) => {
    try {
      loading.value = true
      error.value = null
      const response = await Axios.get<PokemonListResponse>(url)
      pokemons.value = response.data.results
      nextPage.value = response.data.next
      previousPage.value = response.data.previous

      // update current page number from url
      if (url.includes('offset')) {
        const offset = new URL(url).searchParams.get('offset')
        currentPage.value = offset ? Math.floor(parseInt(offset) / cardsPerPage.value) + 1 : 1
      } else {
        currentPage.value = 1
      }
    } catch (err) {
      error.value = 'Error!'
      console.error(err)
    } finally {
      loading.value = false
    }
  }
  return {
    pokemons,
    loading,
    error,
    nextPage,
    previousPage,
    currentPage,
    fetchPokemons,
  }
}
