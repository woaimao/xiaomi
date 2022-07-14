//搜索框内容定时切换
var searchArr = [];
searchStr = document.querySelector('.search-text').getAttribute('data-search-config');
searchArr = searchStr.split(',');
var index = 0;
//搜索框定时器
setInterval(function() {
	if (index == searchArr.length) {
		//遍历完初始化index值，重新循环
		index = 0;
	}
	document.querySelector('.search-text').setAttribute('placeholder', searchArr[index]);
	index++;
}, 4000);

/* -------滑动下拉列表显示隐藏---------- */
//获取元素节点
var liSpanEle = document.querySelectorAll('li.nav-item.as>a>span');

/* 隐藏列表内容的方法 */
//1恢复列表内容display默认显示--display="none"
function contentHide() {
	for (var i = 0; i <liSpanEle.length; i++) {
		//li=liSpanEle[i].parentNode.parentNode
		liSpanEle[i].parentNode.parentNode.querySelector('ul').style.display = "none";
	}
}
//2恢复列表内容默认高度方法--默认高度=0
function contentHeight() {
	for (var i = 0; i <liSpanEle.length; i++) {
		//item-content=liSpanEle[i].parentNode.nextElementSibling
		liSpanEle[i].parentNode.nextElementSibling.classList.remove("item-contentHeight");
	}
}

/* 移除字体颜色#ff6700方法 */
function ff6700Remove() {
	for (var i = 0; i < liSpanEle.length; i++) {
		liSpanEle[i].classList.remove("ff6700");
	}
}


/* 1移入事件 */
//获取元素节点
var liEle = document.querySelectorAll('li.nav-item.as');
//判断是否是第一次显示滑动下拉列表面板
var lock=true;//锁对象，默认开锁状态

for (var i = 0; i < liEle.length; i++) {
	//1.1移入每个导航选项内的span时触发的事件
	liSpanEle[i].onmouseover = function() {
		//调用隐藏列表内容方法
		contentHide();
		contentHeight();
		//移除字体颜色#ff6700
		ff6700Remove();
		//显示的列表内容
		this.parentNode.nextElementSibling.classList.add('item-contentHeight');
		this.parentNode.parentNode.querySelector('ul').style.display = "block";
		this.classList.add("ff6700");
	}
	
	
	/*1.2 移入每个导航选项li时触发的事件 */
	liEle[i].onmouseover = function() {
		//1让显示区域有高度
		document.querySelector('.site-header .white-panel').classList.add("white-panelHeight");
		//2第一次显示滑动下拉列表面板执行的方法
		if(lock){//保证显示区域有高度时执行不到
			this.querySelector('span').classList.add("ff6700");
			//2显示当前移入导航选项li下的列表内容
			// item-content=this.children[1]=this.querySelector('.item-content')
			this.querySelector('.item-content').classList.add('item-contentHeight');
			this.querySelector('ul').style.display = "block";
			//关锁
			lock=false;
		}
	}
	
}


/* 2移出事件 */
var ulEle= document.querySelector('.header-nav>ul.nav-list');
/*移出滑动下拉列表范围外时触发的事件 */
ulEle.onmouseleave=function(){
	
	document.querySelector('.site-header .white-panel').classList.remove("white-panelHeight");
	//调用隐藏列表内容方法
	contentHide();//隐藏
	contentHeight();//高度为0
	//移除字体颜色#ff6700
	ff6700Remove();
	//开锁
	lock=true;
}

/*解决：移入商品分类导航选项时--移出事件效果不正常执行问题 */
document.querySelector('li.nav-category').onmouseover=function(){
	//显示滑动下拉列表面板
	document.querySelector('.site-header .white-panel').classList.remove("white-panelHeight");
	//调用隐藏列表内容方法
	contentHide();//隐藏
	contentHeight();//高度为0
	//移除字体颜色#ff6700
	ff6700Remove();
	//开锁
	lock=true;
}