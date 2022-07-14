
// //innerHeight	返回窗口的文档显示区的高度。
// //element.offsetTop：当前对象到其上级层上边的距离 。
// //var topHeight=$('.menu-bar').offsetTop;
// document.querySelector('.nav-bar-box').onscroll=function(){
// 	console.log('ss')
// }


//加入购物车
document.querySelector('.addShoppingCartBtn').onclick=function(){
	//获取产品信息
	var product={};//定义对象--保存产品信息
	product.img=document.querySelector('.img-left img').getAttribute('src');
	product.price=document.querySelector('.price-info .price').innerText;
	var title=document.querySelector('.product .title').innerText,
		color=document.querySelector('.color-list .select').innerText,
		size=document.querySelector('.size-list .select').innerText;
	product.tit=title+' '+color+' '+size;
	product.id='product14001'; //在所有产品中，产品唯一的标识位
	 alert(product.id)
	product.num=1;//产品数量
	
	//JSON 通常用于与服务端交换数据。//在向服务器发送数据时一般是字符串。
	//JSON.stringify() 方法将 JavaScript 对象转换为字符串。	

	/* 将产品信息放入cookie */
	//注意：使用cookie数据，更新代码后，需要清空cookie再测试
	//1.获取cookie已有信息列表
		cartList=getCookie('cartList');
		console.log(cartList);
	//2.将JSON转换为数组格式(注意：产品列表要不为空才能转换,为空报错)
	//若产品列表为空，则创建空数组arr,并将产品信息添入arr
	var arr=[],existProduct='';
	if(cartList){
		arr=JSON.parse(cartList);
		//find() 方法返回通过测试（函数内判断）的数组的第一个元素的值。
		// find() 返回符合条件的元素，之后的值不会再调用执行函数。
		existProduct=arr.find(function(item){//遍历数组内容--并返回满足条件的内容
			return item.id==product.id;
		})
	};
	
	/*解释：判断existProduct是否有保存的产品信息，若有：则说明当前产品已加入过购物车，那么只改变其数量
	若有：则说明cookie内没有改产品，则添加产品列表信息到arr并保存到Cookie */
	//3.将产品放入产品列表数组
	//若当前产品已加入过购物车，那么只改变其数量， 否则添加产品列表信息到arr
	existProduct?existProduct.num+=product.num:arr.push(product);
	
	//4.把数组类型转换为JSON写入cookie（JSON 通常用于与服务端交换数据。）
	var jsonCartList=JSON.stringify(arr);
	setCookie('cartList',jsonCartList,1);
	alert('添加成功！');
	location.href="ShoppingCart.html";
}
		