<script setup lang="ts">
// import Axios สำหรับเรียก API
import Axios from 'axios'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

// กำหนดโครงสร้างให้ object (interface) - สร้าง interface สำหรับจัดโครงสร้างข้อมูลที่รับจาก API
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

// ใช้ useRoute() เพื่อบอกว่าตอนนี้อยู่หน้าไหน
const route = useRoute()

// ref() → Vue จะเฝ้าดูว่ามีการเปลี่ยนแปลงหรือไม่ถ้ามี → จะอัปเดตจุดที่ใช้ตัวแปรนั้นใน template
const pokemon = ref<PokemonResponse | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

// URL สำรอง ถ้าภาพ Pokemon ไม่มี
const fallbackImg = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png'

// computed() คือ เอาข้อมูลจาก ref() มาคำนวณต่อ ทำให้ค่าพวกนี้คำนวณ ออโต้ ทุกครั้งที่ข้อมูล pokemon เปลี่ยน
// เข้าถึง pokemon.value >> ? บอกว่า ถ้า ref มีข้อมูลจริง ให้ไปดึง abilities ถ้าไม่มีข้อมูลเลย จะไม่ทำต่อ >> ถ้ามี ability ให้ดึงแค่ชื่อออกมาเป็น list >> ?? [] (nullish coalescing) ถ้าขั้นตอนก่อนหน้าเป็น null or undefined ให้ใช้ [] (list ว่าง) แทน
const abilityNames = computed(() => pokemon.value?.abilities.map((a) => a.ability.name) ?? [])

//
const fetchPokemon = async (id: string | number) => {
  try {
    loading.value = true
    error.value = null
    // destructuring object เพื่อดึงเฉพาะ data ออกมาใช้งานทันที
    const { data } = await Axios.get<PokemonResponse>(`https://pokeapi.co/api/v2/pokemon/${id}`)
    console.log("data is : " + data)
    pokemon.value = data
  } catch (err) {
    error.value = 'Error fetching Pekemon detail'
    console.error(err)
  } finally {
    loading.value = false
  }
}

// onMounted() เพื่อบอกว่า เปิดหน้านี้ขึ้นมา ให้ดึงข้อมูล pokemon ตาม id ที่อยู่ใน url ทันที
onMounted(() => {
  fetchPokemon(route.params.id as string)
})

// เฝ้าดูว่า route.params.id (id ใน URL) เปลี่ยนหรือไม่ ถ้าเปลี่ยน ให้โหลดข้อมูล pokemon ตัวใหม่ทันที
watch(
  () => route.params.id,
  (newId) => {
    if (newId) fetchPokemon(newId as string)
  },
)
</script>

<template>
  <div class="continer mx-auto px-4 py-8">
    <!-- loading -->
    <div v-if="loading" class="text-center" py-12>loading...</div>
    <!-- error -->
    <div v-else-if="error" class="text-center text-red-500 py-12">{{ error }}</div>
    <!-- display Pokemon -->
    <div v-else-if="pokemon" class="max-w-lg mx-auto bg-white rounded-lg shadow p-6">
      <div class="flex flex-col items-center">
        <!-- ถ้า pokemon.sprites.front_default มีค่า → ใช้ค่านั้น ถ้าไม่มี → ใช้ fallbackImg แทน-->
        <img
          :src="pokemon.sprites.front_default || fallbackImg"
          :alt="pokemon.name"
          class="h-64 w64"
        />
        <h1 class="text-2xl font-bold capitalize mt-4">
          {{ pokemon.name }}
        </h1>
        <!--  -->
        <p class="text-gray-500">#{{ String(pokemon.id).padStart(3, '0') }}</p>
      </div>
      <!-- แสดง Abilities -->
      <div class="mt-6 text-center">
        <h2 class="text-xl font-semibold mb-2">Abilities</h2>
        <div>
          <ul class="list-disc list-outside text-left inline-block text-base">
            <li v-for="ability in abilityNames" :key="ability" class="capitalize">
              {{ ability }}
            </li>
          </ul>
        </div>
      </div>
      <!-- ปุ่ม back -->
      <div class="mt-6 flex justify-center">
        <button @click="$router.back()" class="px-4 py-2 rounded bg-gray-100 hover:bg-gray-300">
          ← Back
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
