define(['jquery','cookie'], function ($) {
	//NProgress.start();
	//NProgress.done();

	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});


	$('#logoutBtn').click(function () {
		$.ajax({
			type:'post',
			url:'/api/logout',
			dataType:'json',
			success: function (data) {
				//console.log(222);
				if(data.code==200){
					//重新跳转到登录页
					location.href='/main/login';
				}
			}
		});
	});

	//检测用户是否登录
	var flag=$.cookie('PHPSESSID');
	console.log(flag);
	if(!flag && location.pathname != '/main/login'){
		//如果cookie不存在，跳转登录页
		location.href='/main/login';
	}

	//设置用户头像信息
	var loginInfo=$.cookie('loginInfo');
	loginInfo=loginInfo && JSON.parse(loginInfo);
	//设置用户的头像信息
	//$('.aside .profile img').attr('src',loginInfo.tc_avatar);
	//$('.aside .profile h4').html(loginInfo.tc_name);
});
