import Axios from 'axios'
import { ref } from 'vue'

// interface ( interface is structure for data type definitions )
interface Pokemon {
  name: string
  url: string
}

export default function usePokemon() {
  // Variable Declaration by using | ref<data type | datatype> (defualt)
  const pokemons = ref<Pokemon[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  // function for using pokemon data
  const fetchPokemons = async () => {
    try {
      loading.value = true
      error.value = null

      // update current page number from url
    const response = await Axios.get<{results: Pokemon[]}>(`https://pokeapi.co/api/v2/pokemon?limit=200`)
    pokemons.value = response.data.results
    } catch (err) {
      error.value = 'Error fetching Pokemon'
      console.error(err)
    } finally {
      loading.value = false
    }
  }
  return {
    pokemons,
    loading,
    error,
    fetchPokemons,
  }
}




