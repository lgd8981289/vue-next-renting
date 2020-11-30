import { ref, onMounted } from 'vue';
import { getAreaRecommend } from '/@api/map';

export default function initRecommendRoomList(props) {
  const list = ref([]);

  onMounted(async () => {
    list.value = await getAreaRecommend({
      id: props.houseId
    });
  });

  return {
    list
  };
}
