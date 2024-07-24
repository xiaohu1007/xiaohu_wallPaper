// 获取当前设备信息hooks；
const useMpSystem = () => {
	const systemInfo = reactive({
		systemInfo: null,
		statusBarHeight: 15, // 状态栏高度
		titleBarHeight: 40, // 标题高度
		navBarHeight: 40, // 导航栏高度
		leftIconLeft: 0, // 抖音左边距离
	})
	
	onMounted(() => {
		systemInfo.systemInfo = uni.getSystemInfoSync();
		systemInfo.statusBarHeight = systemInfo.systemInfo.statusBarHeight || 15;
		
		// 兼容微信
		if (uni.getMenuButtonBoundingClientRect) {
			let {top, height} = uni.getMenuButtonBoundingClientRect();
			systemInfo.titleBarHeight = height + (top - systemInfo.statusBarHeight) * 2;
		}
		systemInfo.navBarHeight = systemInfo.statusBarHeight + systemInfo.titleBarHeight;
		
		// 兼容抖音
		try {
			if (tt?.getMenuButtonBoundingClientRect) {
				const { leftIcon : {left, width} } = tt.getMenuButtonBoundingClientRect();
				 systemInfo.leftIconLeft = left + parseInt(width) + 5;
			}
		} catch (err) {}
		
	});
	
	return toRefs(systemInfo);
}

export default useMpSystem;