// library สำหรับดึงข้อมูลจาก API
import Axios from 'axios'
// ref() หากมีการเปลี่ยนค่าแล้ว UI จะอัพเดท ออโต้
import { ref } from 'vue'

// กำหนดโครงสร้างให้ object (interface)
interface Pokemon {
  name: string
  url: string
}

// function ที่เป็น Composable ของ Vue รวม logic ดึงข้อมูล pokemon
export default function usePokemon() {
  // ประกาศตัวแปร reactive โดยใช้ ref<data type | datatype> (defualt)
  const pokemons = ref<Pokemon[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  // function ทำงานแบบ async/await เพื่อดึงข้อมูลจาก API Pokemon
  const fetchPokemons = async () => {
    try {
      // loading.value = true (กำลังโหลด)
      loading.value = true
      // error.value = null (ไม่มีปัญหา)
      error.value = null

      // ขอข้อมูลแบบ GET และบอก TS ว่าโครงสร้าง response มี results: Pokemon[]
      const response = await Axios.get<{ results: Pokemon[] }>(
        `https://pokeapi.co/api/v2/pokemon?limit=200`,
      )
      // ดึงข้อมูลที่ GET ได้ลงใน pokemons.value
      pokemons.value = response.data.results
    } catch (err) {
      // ถ้า error ให้ error.value แสดง log ข้อผิดพลาด
      error.value = 'Error fetching Pokemon'
      console.error(err)
    } finally {
      // ปิดการโหลด ไม่ว่าจะ ได้ข้อมูล หรือ error ก็ตาม
      loading.value = false
    }
  }
  return {
    // ส่งตัวแปร และ function ออกไปให้ component อื่นใช้
    pokemons,
    loading,
    error,
    fetchPokemons,
  }
}
