var productInfo=getCookie('cartList');
if(productInfo){
	var productList=JSON.parse(productInfo);
	productList.forEach(function(product){//遍历productList的值
		var li=document.createElement('li');
		li.innerHTML=`
			<div class="figure">
				<a href="javascript:void(0);" target="_blank">
					<img src="${product.img}">
				</a>
			</div>
			<div>
				<a class="name" href="javascript:void(0);" target="_blank">
					${product.tit}
				</a>
				<p class="price">
					<span>${product.price}</span>元&nbsp;×
					<span>${product.num}</span>
				</p>
			</div>
		`
		document.querySelector('.order-items>ul.goods-list').appendChild(li);
	})
}