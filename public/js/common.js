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
					//������ת����¼ҳ
					location.href='/main/login';
				}
			}
		});
	});

	//����û��Ƿ��¼
	var flag=$.cookie('PHPSESSID');
	console.log(flag);
	if(!flag && location.pathname != '/main/login'){
		//���cookie�����ڣ���ת��¼ҳ
		location.href='/main/login';
	}

	//�����û�ͷ����Ϣ
	var loginInfo=$.cookie('loginInfo');
	loginInfo=loginInfo && JSON.parse(loginInfo);
	//�����û���ͷ����Ϣ
	//$('.aside .profile img').attr('src',loginInfo.tc_avatar);
	//$('.aside .profile h4').html(loginInfo.tc_name);
});
