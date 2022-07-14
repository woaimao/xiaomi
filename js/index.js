
//banner切换
//点击左切换按钮执行的事件
var bannerIdx = 0;
document.querySelector('.left').onclick = function() {
	// 当前选中的是第一个时执行(判断条件当前选中节点是否包class样式first)
	if (document.querySelector('.switch-icons .select').classList.contains('first')) {
		console.log(document.querySelector('.switch-icons .select').classList.contains('first'))
		// 如果是第一个，则选择最后一个节点为其添加选中时的class样式：select
		//移除被选中色块的选中样式--class选中样式：select
		document.querySelector('.switch-icons .select').classList.remove('select');
		//为将要切换的新的色块添加选中时的class样式：select
		document.querySelector('.switch-icons .last').classList.add('select');
		//移除当前banner--通过下标控制切换新banner
		document.querySelector('.banner').classList.remove('banner' + bannerIdx);
		//获取最后一个banner--通过下标控制切换新banner
		bannerIdx = document.querySelectorAll('.switch-icons li').length - 1;
		//添加新banner--最后一个banner
		document.querySelector('.banner').classList.add('banner' + bannerIdx);

	} else {
		// 如果不是第一个，则选择前一个节点previousElementSibling(注：选择后一个节点用nextElementSibling)
		var pre = document.querySelector('.switch-icons .select').previousElementSibling;
		//移除被选中色块的选中样式--class选中样式：select
		document.querySelector('.switch-icons .select').classList.remove('select');
		//为之前获取前的一个的节点添加选中时的class样式：select
		pre.classList.add('select');
		//清除当前banner
		document.querySelector('.banner').classList.remove('banner' + bannerIdx);
		//bannner下标减一--目的：切换上一个banner样式
		bannerIdx--;
		//添加新bannner--前一个
		document.querySelector('.banner').classList.add('banner' + bannerIdx);

	}
}

//点右切换按钮切换banner
function rightOnclick() {
	// 当前选中的是最后一个时执行(判断条件当前选中节点是否包class样式last)
	if (document.querySelector('.switch-icons .select').classList.contains('last')) {
		// 如果是最后一个，则选择第一个节点为其添加选中时的class样式：select
		//移除被选中色块的选中样式--class选中样式：select
		document.querySelector('.switch-icons .select').classList.remove('select');
		//为将要切换的新的色块添加选中时的class样式：select
		document.querySelector('.switch-icons .first').classList.add('select');
		//移除当前banner--通过下标控制切换新banner
		document.querySelector('.banner').classList.remove('banner' + bannerIdx);
		//当前选中为最后一个节点时初始化bannerIdx的值，让banner恢复成默认
		bannerIdx = 0
		//document.querySelector('.banner').classList.add('banner'+bannerIdx);//设置banner0--暂未用

	} else {
		// 如果不是最后一个，则选择后一个节点并保存到变量next
		var next = document.querySelector('.switch-icons .select+li'); //先将当前拥有select属性的节点选择中并保存到该变量
		//移除被选中色块的选中样式--class选中样式：select
		document.querySelector('.switch-icons .select').classList.remove('select');
		//为之前获取的后一个节点添加选中时的class样式：select
		next.classList.add('select');
		//移除当前banner
		document.querySelector('.banner').classList.remove('banner' + bannerIdx); //删除背景色
		//bannner下标加一--目的：切换下一个banner样式
		bannerIdx++;
		//添加新bannner--后一个
		document.querySelector('.banner').classList.add('banner' + bannerIdx);

	}
}

//* setInterval() ：按照指定的周期（以毫秒计）来调用函数或计算表达式。
//方法会不停地调用函数，直到 clearInterval() 被调用或窗口被关闭。 */
//给当前显示时间设置定时器
//通过定时器控制bannner切换时间
setInterval(function() {
	rightOnclick();
}, 5000)
