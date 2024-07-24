import dayjs from 'dayjs';

// 获取当前时间变化hooks；
const useDayjs = () => {
	const date = reactive({
		initSuccess: false,
		YYYY: '2024',
		MM: '01',
		DD: '01',
		HH: '00',
		mm: '00',
		ss: '00',
	})
	
	onMounted(() => {
		const getDay = setInterval(() => {
			const nowDate = dayjs()
			Object.keys(date).forEach((key) => {
				if (key == 'initSuccess') {
					return date[key] = true;
				}
				date[key] = nowDate.format(key);
			});
		}, 1000);
			
		onUnmounted(() => {
			clearInterval(getDay);
		})
	});
	
	return toRefs(date);
}

export default useDayjs;