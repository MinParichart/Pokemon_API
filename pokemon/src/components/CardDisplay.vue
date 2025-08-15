<script setup lang="ts">
import { computed } from 'vue'

// กำหนดว่า componnent นี้ต้องรับค่า props 2 อย่าง จาก parent component
const props = defineProps<{
  pokemon: {
    name: string
    url: string
  }
  currentPage: number
}>()

// computed() จะอัพเดพให้ออโต้ทุกครั้ง ที่ข้อมูลต้นทางเปลี่ยน
const pokemonId = computed(() => {
  // เอาค่า props.pokemon.url มาแยก URL ออกเป็นชิ้น ๆ โดยใช้ / เป็นตัวแบ่ง
  const urlParts = props.pokemon.url.split('/')
  // เอา UrlParts[6] เพราะว่า "https://pokeapi.co/api/v2/pokemon/25/ >> "https:","","pokeapi.co","api","v2","pokemon","25","" >> id อยู่ตำแหน่ง index ที่ 6 ส่วน parseInt คือการแปลงเป็นตัวเลข
  return parseInt(urlParts[urlParts.length - 2])
})
</script>

<template>
  <!-- ใช้แทน <a> ใน html เพื่อทำงานกับ Vue Router -->
  <RouterLink
    :to="{
      // ไปหน้า route ชื่อ pokemon-detail
      name: 'pokemon-detail',
      // ส่งค่า id ของ pokemon ไป
      params: { id: pokemonId },
      // ส่งหมายเลขหน้าปัจจุบัน ใน query string เช่น ?page=2
      query: { page: String(currentPage) },
    }"
    class="block mt-2"
  >
    <div class="bg-white rounded-lg shadow-md p-4 hover:shadow-2xl transition-shadow">
      <div class="text-center">
        <img
          :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`"
          :alt="pokemon.name"
          class="mx-auto h-48 w-48"
        />
        <!-- แสดงชื่อ pokemon -->
        <h3 class="text-lg font-semibold capitalize mt-2">{{ pokemon.name }}</h3>
        <!-- แสดง id pokemon เติมตัวอักษร '0' ด้านหน้าข้อความให้มีความยาวอย่างน้อย 3 ตัว-->
        <span class="text-gray-500">#{{ pokemonId.toString().padStart(3, '0') }}</span>
      </div>
    </div>
  </RouterLink>
</template>
