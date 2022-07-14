
/* 遮罩层 打开*/
function shadow() {
	shadowBtn.classList.add('shadow');
}
/* 遮罩层关闭方法*/
function CloseBtn() {
	//1清空表单
	document.querySelector('.address-box form').reset(); //reset重置
	//2.移除遮罩层
	shadowBtn.classList.remove('shadow');
	/* 3还原弹出框默认样式 */
	//3.1清空输入框样式，还原默认输入框样式
	document.querySelector('.address-box textarea').classList.remove('inputBorColor'); //移除边框样式
	var labelList = document.querySelectorAll('.address-box label');
	var inputList = document.querySelectorAll('.address-box input');
	//移除字体样式
	for (var i = 0; i < labelList.length; i++) {
		labelList[i].classList.remove('lab-change');
	}
	//移除边框样式
	for (var i = 0; i < inputList.length; i++) {
		inputList[i].classList.remove('inputBorColor');
	}
	/*3.2.还原收货地址弹出框标题 */
	document.querySelector('.address-add>.title>span:first-child').innerText="添加收货地址";
	/*3.3.隐藏省市地区联动 */
	document.querySelector('.address-select').style.display="none";
}
/* 遮罩层关闭-点击收获地址弹出框取消按钮时执行*/
document.querySelector('.btn-gray').onclick = function() {
	CloseBtn();
}
/* 新增收获地址方法 */
//点击收获地址弹出框内的确定按钮时执行
function AddrBtn() {
	if (!Name.value.trim() || !addrLabel.value.trim() || !Phone.value.trim() || !Addr.value.trim() || !detailedAddr
		.value.trim()) {
		alert("内容不能为空！");
		return;
	}
	
	if (Phone.value.trim().length != 11) {
		Phone.value=Phone.value.trim();
		alert("请输入正确的手机号！");
		return;
	}
	//判断是否处于编辑状态-通过判断确定按钮是否存在class标记
	if(document.querySelector('.addr-footer>.AddrBtn').classList.contains('modify')){
		//1获取修改内容
		editNode.parentNode.innerHTML =
						`<div class="address-info">
							<div class="name">
								<span>
									${Name.value}
								</span>
								<span style="color: rgb(117, 117, 117);">
									${addrLabel.value}
								</span>
							</div>
							<div class="tel">
								${Phone.value.replace(Phone.value.substr(3,4),"****")}
							</div>
							<div class="address-con">
								<span>${Addr.value}</span>
								
								<p class="info">
									${detailedAddr.value}
								</p>
							</div>
							<div class="address-action">
								<span class="editAddr">修改</span>
								<span class="addrDelBtn">删除</span>
							</div>
						</div>
						`
		//执行关闭遮罩层事件
		CloseBtn();
		//移除之前处于编辑状态时给确定按钮添加的class标记
		document.querySelector('.modify').classList.remove("modify");
		//提示信息
		alert("保存成功");
		return;
	}
	
	
	/* 新增内容 */
	//1创建要保存的元素
	var div = document.createElement("div");
	//2为创建的元素添加内容
	div.innerHTML =
				`<div class="address-list">
					<div class="address-info">
						<div class="name">
							<span>
								${Name.value}
							</span>
							<span style="color: rgb(117, 117, 117);">
								${addrLabel.value}
							</span>
						</div>
						<div class="tel">
							${Phone.value.replace(Phone.value.substr(3,4),"****")}
						</div>
						<div class="address-con">
							<span>${Addr.value}</span>
							
							<p class="info">
								${detailedAddr.value}
							</p>
						</div>
						<div class="address-action">
							<span class="editAddr">修改</span>
							<span class="addrDelBtn">删除</span>
						</div>
					</div>
				</div>`
	//3将创建的元素添加指定节点
	document.querySelector('.address-box').appendChild(div);
	//执行关闭遮罩层事件
	CloseBtn();

}


/* 已添加收获地址编辑方法 */
var editNode = null; //声明全局变量，目的:存当前点击对象
function editAddr(n) {
	
	/* 1打开遮罩层 */
	shadow();
	/* 修改收货地址弹出框标题 */
	document.querySelector('.address-add>.title>span:first-child').innerText="修改收货地址";
	/* 2添加聚焦样式 */
	document.querySelector('.address-box textarea').classList.add('inputBorColor'); //添加边框样式
	var labelList = document.querySelectorAll('.address-box label');
	var inputList = document.querySelectorAll('.address-box input');
	//添加字体样式
	for (var i = 0; i < labelList.length; i++) {
		labelList[i].classList.add('lab-change');
	}
	//添加边框样式
	for (var i = 0; i < inputList.length; i++) {
		inputList[i].classList.add('inputBorColor');
	}
	/* 3获取当前点击编辑按钮所有输入框的父级节点 */
	editNode = n.parentNode.parentNode;
	//3.1获取编辑内容 
	//3.2点击编辑按钮-将当前行数据还原到表单 
	var addrList = editNode.children;
	//收获地址名称
	Name.value = addrList[0].querySelector('span:first-child').innerText;
	//收获地址标签
	addrLabel.value = addrList[0].querySelector('span:first-child').innerText;
	//收获地址手机号
	Phone.value = addrList[1].innerText;
	//收获地址
	Addr.value = addrList[2].querySelector('span').innerText;
	//收获地址详细信息
	detailedAddr.value = addrList[2].querySelector('p').innerText;
	//4保存修改 
	//1给当前处于编辑状态的收获地址弹出框添加修改标记--通过添加class类名
	document.querySelector('.addr-footer>.AddrBtn').classList.add('modify');
}


/* 删除已添加地址 */
function addrDelBtn(n) {
	document.querySelector('.address-box').removeChild(n.parentNode.parentNode.parentNode.parentNode)
	//提示信息
	alert("删除成功");
}

/* 事件委托-添加收货地址 */
document.querySelector('.address-box').onclick = function(e) {
	//添加收货地址弹出框内输入框失焦/聚焦事件
	//判断当前聚焦是否是输入框
	if (e.target.tagName == "INPUT" || e.target.tagName == "TEXTAREA") {
		//如果是则添加聚焦样式
		e.target.previousElementSibling.classList.add('lab-change'); //添加字体样式
		e.target.classList.add('inputBorColor'); //添加边框颜色样式
		//失焦事件
		//条件1-输入框内容为空时执行才会除法失焦事件
		e.target.onblur = function() {
			if (!e.target.value.trim()) {
				e.target.previousElementSibling.classList.remove('lab-change'); //移除字体样式
				e.target.classList.remove('inputBorColor'); //移除边框颜色样式
			}
		}
		//显示隐藏省市地区联动
		if (e.target.classList.contains('address-target')) {
			document.querySelector('.address-select').style.display="block";
		}
	}
	
	//执行事件
	switch (e.target.classList[0]) {
		case "AddrBtn":
			AddrBtn(e.target);
			break;
		case "addrDelBtn":
			addrDelBtn(e.target);
			break;
		case "editAddr":
			editAddr(e.target);
			break;
	}


}
