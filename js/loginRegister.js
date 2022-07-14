/* login/register切换效果*/
/* 登录按钮 */
var loginTitle=document.querySelector(".login-title");
loginTitle.onclick=function(){
	/* 隐藏 */
	document.querySelector(".yellow-block2").style.display="none";//register小黄杠 
	document.querySelector(".box-QR-code").style.display="none";//扫码码登录模块
	/* 显示 */
	document.querySelector(".login").classList.remove('margin-lf');// login模块
	document.querySelector(".yellow-block1").style.display="block";// login小黄杠 
	
	
	
}
/* 注册按钮 */
var registerTitle=document.querySelector(".register-title");
registerTitle.onclick=function(){
	/* 隐藏 */
	document.querySelector(".yellow-block1").style.display="none";// login小黄杠 
	document.querySelector(".box-QR-code").style.display="none";//扫码码登录模块
	/* 显示 */
	document.querySelector(".login").classList.add('margin-lf');// login模块
	document.querySelector(".yellow-block2").style.display="block";//register小黄杠
}

/* 显示/隐藏扫码码登录 */
var iconCodeBtn=document.querySelector(".triangle-code");
var temp=true;
iconCodeBtn.onclick=function(){
	if(temp){
		/* 隐藏 */
		document.querySelector(".box-title").style.display="none";// login/register选项 
		document.querySelector(".login").style.display="none";// login模块
		document.querySelector(".register").style.display="none";//register模块
		/* 显示 */
		document.querySelector(".triangle-code>.icon").classList.toggle("triangle-icon2");//切换图标
		document.querySelector(".box-QR-code").style.display="inline-block";//扫码码登录模块
	}else{
		
		/* 隐藏 */
		document.querySelector(".yellow-block2").style.display="none";//register小黄杠
		document.querySelector(".register").style.display="none";//register模块
		document.querySelector(".box-QR-code").style.display="none";//扫码码登录模块
		/* 显示 */
		document.querySelector(".box-title").style.display="block";// login/register选项 
		document.querySelector(".login").style.display="inline-block";// login模块
		document.querySelector(".register").style.display="inline-block";// login模块
		document.querySelector(".yellow-block1").style.display="block";// login小黄杠 
		document.querySelector(".triangle-code>.icon").classList.toggle("triangle-icon2");//切换图标
	}
	temp=!temp;
}

/* 输入框显示隐藏/眼睛图标切换 */
var passBtn=document.querySelector("#password");
var eyeBtn=document.querySelector(".icon-eye");

eyeBtn.onclick = function() {
	var attr = passBtn.getAttribute('type'); //获取指定属性值
	if (attr=='password') {
		passBtn.setAttribute('type','text');
		eyeBtn.className="icon-eye2";
	}else{
		passBtn.setAttribute('type','password');//设置指定属性名和对应属性值
		eyeBtn.className="icon-eye";
	}
}



/* 登录页面输入框聚焦失焦样式 */
var textInputEle=document.querySelector('.text-input-box>#text-input');
var passEle=document.querySelector('.password-box>#password');
//账号输入框
//添加聚焦样式
textInputEle.onfocus=function(){
	document.querySelector('.text-input-box>label').classList.add("focus");
}
//添加失焦样式
textInputEle.onblur=function(){
	textInputEle.value=textInputEle.value.trim();//去除空格
	console.log(textInputEle)
	if(!textInputEle.value.trim()){
		document.querySelector('.text-input-box>label').classList.remove('focus')
		document.querySelector('.text-input-box>label').style.color="#f04645";
		document.querySelector('.text-input-box>p.tips').style.display="block";
	}else{
		document.querySelector('.text-input-box>label').style.color="rgba(0,0,0,.4)";
		document.querySelector('.text-input-box>p.tips').style.display="none";
	}
	
}
//密码框
//添加聚焦样式
passEle.onfocus=function(){
	document.querySelector('.password-box>label').classList.add("focus");
}
//添加失焦样式
passEle.onblur=function(){
	passEle.value=passEle.value.trim();
	console.log(textInputEle)
	//内容为空时
	if(!passEle.value.trim()){
		document.querySelector('.password-box>label').classList.remove('focus')
		document.querySelector('.password-box>label').style.color="#f04645";
		document.querySelector('.password-box>p.tips').style.display="block";
	
		
	}else{//有内容时
		document.querySelector('.password-box>label').style.color="rgba(0,0,0,.4)";
		document.querySelector('.password-box>p.tips').style.display="none";
	}
	
}




/* 登陆表单验证 */
var textInpuBtn=document.querySelector("#text-input");
var loginBtn=document.querySelector("#loginbtn");
loginBtn.onclick = function() {
	/* <!-- isNaN() 函数用于检查其参数是否是非数字值 --> */
	if(!textInpuBtn.value||!passBtn.value){
		alert("内容不能为空！");
		return;
	}else if(isNaN(textInpuBtn.value)||textInpuBtn.value.length!=11){/* 匹配手机号 */
			//输入内容非数值或长度不等于11则执行该带代码内容
			alert("请输入正确的手机号！");
			return;
	}
	alert("登陆成功！");
	location.href="index.html";
	//loginBtntxts.innerText="张三";
}

/* 注册表单验证 */
var regPhoneV=document.querySelector("#regPhone");
var regVerifyV=document.querySelector("#regVerify");
function registerBtn(){
	/* <!-- isNaN() 函数用于检查其参数是否是非数字值 --> */
	if(!regPhoneV.value||!regVerifyV.value){
		alert("内容不能为空！");
		return;
	}else if(isNaN(regPhoneV.value)||regPhoneV.value.length!=11){/* 匹配手机号 */
			//输入内容非数值或长度不等于11则执行该带代码内容
			alert("请输入正确的手机号！");
			return;
	}
	//注册成功后转到登陆页面
	//1、执行登录方法
	loginTitle.onclick();
	//2、填入登录表单信息为注册时内容
	document.querySelector('.loginTxt').value=document.querySelector('.registerTxt').value;
	document.querySelector('.loginPass').value=document.querySelector('.registerPass').value;
	//执行添加聚焦样式
	textInputEle.onfocus()//账户框
	passEle.onfocus()//密码框
	//location.href="index.html";
			
}

//box-left.
var boxLeftW=document.querySelector('.box-left').style.width
// if(boxLeftW<="100px"){
// 	document.querySelector('.box-left').style.display="none";
// }