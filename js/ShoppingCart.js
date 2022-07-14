//目标数据 cartList
		//[
		// 	{
		// 		img:'a.png',
		// 		price:300,
		// 		tit:小米11
		// 	},{
		// 		img:'a.png',
		// 		price:300,
		// 		tit:小米11
		// 	}
		// ]
//获取指定Cookie数据
var productInfo=getCookie('cartList');
console.log(productInfo);
if(productInfo){
	var productList=JSON.parse(productInfo);
	console.log(productList);
	productList.forEach(function(product){//遍历productList的值
		var tr=document.createElement('tr');
		tr.innerHTML=`
			<td>
				<input class="check-box" type="checkbox" name="" id="" value=""/>
			</td>
			<td>
				<a href="javascript:void(0);">
					<img src="${product.img}">
				</a>
			</td>
			<td>
				<a href="javascript:void(0);">
					${product.tit}
				</a>
			</td>
			
			<td><!-- 单价 -->
				<span class="price">${product.price}</span>
				<span>元</span>
			</td>
			<td class="setquantity" data-pid='${product.id}'>
					<button class="minus fl" type="button" >-</button><!-- disabled 属性规定应该禁用的 <input> 元素。被禁用的 input 元素是无法使用和无法点击的。 -->
					<input class="inputtxt" type="text" value="${product.num}" /><!-- readonlyreadonly 属性规定输入字段是只读的,不可修改。 -->
					<button class="plus fr" type="button">+</button>
			</td>
			<td><!-- 小计 -->
				<span class="sum-price">${product.price*product.num}</span>
				<span>元</span>
			</td>
			<td>
				<span class="del">×</span>
			</td>
		`
		document.querySelector('tbody').appendChild(tr);
	})
}

//数量递减计算方法
function minus(n){
//1.小计金额变化
	//1)获取当前按钮的下一个兄弟节点自减1
	if(n.nextElementSibling.value==1){
		alert("数量不能小于1");
		return;
	}
	n.nextElementSibling.value--;//此时形参n==e.target
	//2)改变当前节点小计金额
	//当前产品小计金额=数量*单价
	var price=n.parentNode.previousElementSibling.querySelector('.price').innerText,//单价格
		pNum=n.nextElementSibling.value;//数量
		n.parentNode.nextElementSibling.querySelector('.sum-price').innerText=price*pNum;
//2.当前复选框为选中状态，执行减操作时合计金额变化
	//合计金额=原合计金额-当前商品单价
	if(n.parentNode.parentNode.querySelector('.check-box').checked){
		document.querySelector('.total-price').innerText-=price;
	}
	
	
/* 3同步商品数量到cookie方法 */
	if(n.classList.contains('minus')){
		/* 当前商品数量同步到cookie */
		//1.获取cookie已有信息列表
			cartList=getCookie('cartList');
		//2.将JSON转换为数组格式,并将产品信息添入arr(注意：产品列表要不为空才能转换,为空报错)
		//获取当前行产品ID pid
		var arr=[],existProduct='';
		var pid=n.parentElement.getAttribute('data-pid')
		if(cartList){
			arr=JSON.parse(cartList);
			//find() 方法返回通过测试（函数内判断）的数组的第一个元素的值。
			// find() 返回符合条件的元素，之后的值不会再调用执行函数。
			var existProduct=arr.find(function(item){//遍历数组内容返回满足条件的内容
				return item.id==pid;//判断遍历到的id是否与当前点击的商品id一致
				
			})
		};
		//3.将cookie中当前产品放数量更新
			if(existProduct){
				//更新数量
				existProduct.num=pNum;
				//更新数量的同时更新小计字段
				n.parentElement.nextElementSibling.querySelector('.sum-price').innerText
				=existProduct.num*existProduct.price;
			}
		//4.把数组类型转换为JSON写入cookie（JSON 通常用于与服务端交换数据。）
		var jsonCartList=JSON.stringify(arr);
		setCookie('cartList',jsonCartList,1);
	}

}

//数量递加计算方法
function plus(n){

//1.小计金额变化
	if(n.previousElementSibling.value==10){
		alert("数量不能大于10");
		return;
	}
	//1)获取当前按钮的上一个兄弟节点自增1
	n.previousElementSibling.value++;
	//2)改变当前节点小计金额
	//当前产品小计金额=数量*单价
	var price=n.parentNode.previousElementSibling.querySelector('.price').innerText,
		pNum=n.previousElementSibling.value;
		n.parentNode.nextElementSibling.querySelector('.sum-price').innerText=price*pNum;
		
//2执行减操作当前复选框为选中状态时合计金额变化
	//合计金额=原合计金额+当前商品单价
	//合计金额
	var totalPrice=parseFloat(document.querySelector('.total-price').innerText);
	if(n.parentNode.parentNode.querySelector('.check-box').checked){
		//加号是拼接字符串所以需要提前转换类型再计算；减号不需要
		document.querySelector('.total-price').innerText=totalPrice+parseFloat(price);
		
	}

/* 3同步商品数量到cookie方法 */
	if(n.classList.contains('plus')){
		/* 当前商品数量同步到cookie */
		//1.获取cookie已有信息列表
			cartList=getCookie('cartList');
		//2.将JSON转换为数组格式,并将产品信息添入arr(注意：产品列表要不为空才能转换,为空报错)
		//获取当前行产品ID pid
		var arr=[],existProduct='';
		var pid=n.parentElement.getAttribute('data-pid')
		if(cartList){
			arr=JSON.parse(cartList);
			//find() 方法返回通过测试（函数内判断）的数组的第一个元素的值。
			// find() 返回符合条件的元素，之后的值不会再调用执行函数。
			var existProduct=arr.find(function(item){//遍历数组内容返回满足条件的内容
				return item.id==pid;//判断遍历到的id是否与当前点击的商品id一致
				
			})
			
		};
		
		//3.将cookie中当前产品放数量更新
			if(existProduct){
				//更新数量
				existProduct.num=pNum;
			}
		//4.把数组类型转换为JSON写入cookie（JSON 通常用于与服务端交换数据。）
		var jsonCartList=JSON.stringify(arr);
		setCookie('cartList',jsonCartList,1);
	}
}

// 数量输入框的输入方法inputTxt/
function inputTxt(n){
	//保存输入框失去焦点之前的内容
	var numValue=n.value;
	n.onblur=function(){
		//当前输入把内容如果包含空格,则将空格去掉
		n.value=n.value.trim();
		//isNaN表示当前值为非数字时,则为true执行以下条件
		if(isNaN(n.value)){//n.value当前的输入框内的值
			n.value=numValue;//初始化当前值为失焦之前的值
			alert("输入的数量只能是数字！");
			return;
		}else if(n.value>10){
			//限制最大数量
			n.value=10;
			alert("数量不能大于10")
		}else if(n.value<=0){
			n.value=numValue;//初始化当前值为失焦之前的值
		}
		//1.小计金额变化
			//当前产品小计金额=数量*单价
			var price=n.parentNode.previousElementSibling.querySelector('.price').innerText;//单价格
				pNum=n.value;//数量
				//保存修改小计金额之前的价格
				var a=n.parentNode.nextElementSibling.querySelector('.sum-price').innerText;
				//修改当前小计金额=数量*单价
				n.parentNode.nextElementSibling.querySelector('.sum-price').innerText=price*pNum;
				//保存修改小计金额之后的价格
				var b=n.parentNode.nextElementSibling.querySelector('.sum-price').innerText;
		//2.当前复选框为选中状态，执行减操作时合计金额变化
			//合计金额=原合计金额-当前商品单价
			if(n.parentNode.parentNode.querySelector('.check-box').checked){
				var totalPrice=parseFloat(document.querySelector('.total-price').innerText);
				if(b>a){//如果修改小计金额之后的价格大于之前小计金额，则通过b-a求出新增的小计金额，并让合计金额加上新增的小计金额，以此求出最终合计价格
					document.querySelector('.total-price').innerText=totalPrice+parseFloat(b-a);
				}else{//如果修改小计金额之后的价格大于之前小计金额，则通过a-b求出减少的小计金额，并让合计金额减掉减少的小计金额，以此求出最终合计价格
					document.querySelector('.total-price').innerText-=a-b;
				}
				
			}

	}
	
}

//点击实现选中所有复选框
function selectAll(n){
	//获取tbody内的所有复选框
	 var tbodyCheckEle=document.querySelectorAll('tbody input[type="checkbox"]')
//1.合计金额变化
	//合计金额
	var totalPrice=parseFloat(document.querySelector('.total-price').innerText);
	//小计金额初始值
	var sumPriceAll=0;
//2.控制复选框选中状态变化
	if(n.checked){//true
		//有checked属性时执行全选
		//遍历tbody内的所有复选框取出每一个复选框中的元素
		for(var x=0; x<tbodyCheckEle.length;x++){
			//将遍历到tbody内的所有复选框设置为选中状态
			tbodyCheckEle[x].checked=true;
			//通过遍历获取所有商品的小计金额
			//加号是拼接字符串所以需要提前转换类型再计算；减号不需要
			sumPriceAll+=parseFloat(tbodyCheckEle[x].parentNode.parentNode.querySelector('.sum-price').innerText);
		
		}
		//合计金额=所有商品小计金额的总和(即所有选中状态的小计金额)
		document.querySelector('.total-price').innerText=sumPriceAll;
		
	}else{//false
		//取消全选
		//遍历tbody内的所有复选框取出每一个复选框中的元素
		for(x in tbodyCheckEle){
			//将遍历到的复选框的设置为未选中状态
			tbodyCheckEle[x].checked=false;
		}
		//合计金额=0
		document.querySelector('.total-price').innerText=0
	}
//3.获取已选择商品件数
	//1)查找选中状态的所有复选框
	//获取tbody内的所有复选框
	 var tbodyCheckAll=document.querySelectorAll('tbody input[type="checkbox"]');
	console.log(tbodyCheckAll)
	//2)计算当前选中状态复选框的数量
	var num=0;
	for(x in tbodyCheckAll){
		//每遍历到一个为选中状态的复选框则数量在原基础上加一
		if(tbodyCheckAll[x].checked){
			num++;
		}
	}
	//3)修改当前已选择商品件数
	document.querySelector('.num2').innerText=num;
	//根据购物车内已选择商品件数切换结算按钮颜色
	if(num==0){
	
		//改变结算按钮颜色
		document.querySelector('.total-price-box>.settlementbtn').classList.remove('Change-color');
		//添加提示信息
		document.querySelector('.no-select-tip').classList.remove('txtTip');
	}else{
		//改变结算按钮颜色
		document.querySelector('.total-price-box>.settlementbtn').classList.add('Change-color');
		//移除提示信息
		document.querySelector('.no-select-tip').classList.add('txtTip');
	}			
		
}
var settlementBtn=document.querySelector('.total-price-box>.settlementbtn');
settlementBtn.onclick=function(){
	if(!settlementBtn.classList.contains('Change-color')){
		return false;
	}	
}


//复选框选中时合计金额操作
function checkBox(n){
//1判断当前操作对象复选框是否为选中状态
//2.合计金额变化
	//合计金额
	var totalPrice=parseFloat(document.querySelector('.total-price').innerText);
	//当前小计金额
	//此时n.parentNode.parentNode=tbody
	var sumPrice=parseFloat(n.parentNode.parentNode.querySelector('.sum-price').innerText);
	if(n.checked){//选中--合计金额=原合计金额+当前复选框为选中的小计金额
		//加号是拼接字符串所以需要提前转换类型再计算；减号不需要
		document.querySelector('.total-price').innerText=totalPrice+sumPrice;
		
		
	}else{//取消选中状态:合计金额=原合计金额-当前取消选复选框选中状态的小计金额
		document.querySelector('.total-price').innerText=totalPrice-sumPrice;
		
	}
//3.获取已选择商品件数
	//1)查找选中状态的所有复选框
	//获取tbody内的所有复选框
	 var tbodyCheckAll=document.querySelectorAll('tbody input[type="checkbox"]');
	console.log(tbodyCheckAll)
	//2)计算当前选中状态复选框的数量
	var num=0;//初始值
	for(x in tbodyCheckAll){
		//遍历所有复选框每找到一个选中状态复选框，则数量加一
		if(tbodyCheckAll[x].checked){
			num++;
		}
	}
	//3)修改当前已选择商品件数
	document.querySelector('.num2').innerText=num;	
	
	//根据购物车内已选择商品件数切换结算按钮颜色
	if(num==0){
		//改变结算按钮颜色
		document.querySelector('.total-price-box>.settlementbtn').classList.remove('Change-color');
		//添加提示信息
		document.querySelector('.no-select-tip').classList.remove('txtTip');
	}else{
		//改变结算按钮颜色
		document.querySelector('.total-price-box>.settlementbtn').classList.add('Change-color');
		//移除提示信息
		document.querySelector('.no-select-tip').classList.add('txtTip');
	}
	//如果复选框都选中，则全选的复选框也变为选中状态,否则为未选中状态
	if(num==document.querySelectorAll('tbody>tr').length){
		document.querySelector('th>[type="checkbox"]').checked=true;
	}else{
		document.querySelector('th>[type="checkbox"]').checked=false;
	}
	
}




//删除购物车一行商品操作
function Del(n){
//1.合计金额变化--如果删除的当前商品的复选框为选中状态时
	if(n.parentNode.parentNode.querySelector('.check-box').checked){
		//合计金额
		var totalPrice=parseFloat(document.querySelector('.total-price').innerText);
		//当前小计金额
		//此时n.parentNode.parentNode=tr
		var sumPrice=parseFloat(n.parentNode.parentNode.querySelector('.sum-price').innerText);
		//如果删除:合计金额=原合计金额-当前删除的小计金额
		document.querySelector('.total-price').innerText=totalPrice-sumPrice;
	}
//2.执行删除操作
	n.parentNode.parentNode.parentNode.removeChild(n.parentNode.parentNode);
	

//3.获取购物车剩余商品总件数
	document.querySelector('.cart-total>.num1').innerText=document.querySelectorAll('tbody>tr').length;

//4.获取已选择商品件数
	//1)查找选中状态的所有复选框
	//获取tbody内的所有复选框
	 var tbodyCheckAll=document.querySelectorAll('tbody input[type="checkbox"]');
	console.log(tbodyCheckAll)
	//2)计算当前选中状态复选框的数量
	var num=0;
	for(x in tbodyCheckAll){
		//当前复选框未选择状态则数量加一
		if(tbodyCheckAll[x].checked){
			num++;
		}
	}
	//3)修改当前已选择商品件数
	document.querySelector('.num2').innerText=num;
	if(num==0){
		//如果购物车商品为0，则全选的复选框为未选中状态
		document.querySelector('th>[type="checkbox"]').checked=false;
	}
	
}
//购物车每类商品小计金额初始值
var sumPriceAll=document.querySelectorAll('.sum-price');
	for(var i=0;i<sumPriceAll.length;i++){
		//单价
		pNum=sumPriceAll[i].parentNode.previousElementSibling.previousElementSibling.querySelector('.price').innerText;
		//每类商品小计金额初始值=每类商品单价
		sumPriceAll[i].innerText=pNum;
	}
//购物车商品总件数初始值
document.querySelector('.cart-total>.num1').innerText=document.querySelectorAll('tbody>tr').length
document.querySelector('table').onclick=function(e){
	switch (e.target.classList[0]){//classList 属性返回元素的类名;返回值是一个 DOMTokenList, 包含元素的类名列表
		case 'check-box':
			checkBox(e.target);
			break;
		case 'minus':
			minus(e.target);
			break;
		case 'plus':
			plus(e.target);
			break;
		case 'inputtxt':
			inputTxt(e.target);
			break;
		case 'del':
			Del(e.target);
			break;
		case 'select-all':
			selectAll(e.target);
		default:
			break;
	}
}
