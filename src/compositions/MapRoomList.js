import { ref, onMounted } from 'vue';
import { getAreaHouse } from '/@api/map';

export default function initMapRoomList() {
  const list = ref([]);

  onMounted(async () => {
    list.value = await getAreaHouse();
  });

  return {
    list
  };
}
