import { ref } from 'vue';
import { getList } from '/@api/house';

export default function initHomeRoomList(props) {
  const pageSize = ref(5);
  const pageNum = ref(1);
  const list = ref([]);
  const loading = ref(false);
  const finished = ref(false);

  const onLoad = async () => {
    // 加载数据
    const data = await getList({
      name: props.name,
      pageSize: pageSize.value,
      pageNum: pageNum.value
    });
    list.value.push(...data);
    // 加载状态结束
    loading.value = false;
    // 进入下一页
    pageNum.value++;
    // 数据全部加载完成
    if (data.length === 0) {
      finished.value = true;
    }
  };

  return {
    list,
    loading,
    finished,
    pageSize,
    pageNum,
    onLoad
  };
}
