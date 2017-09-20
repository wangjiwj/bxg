
define(['jquery','cookie'], function ($) {
    //��¼����
    $("#loginBtn").click(function () {
        $.ajax({
            type:'post',
            url:'/api/login',
            data:$('#loginForm').serialize(),//��ȡ���еı�����
            dataType:'json',
            success:function(data){
                if(data.code==200){
                    //���û��ĵ�¼��Ϣ�洢��cookie�У������ҳ�湲������
                    $.cookie('loginInfo',JSON.stringify(data.result),{path:'/'});

                    //��¼�ɹ�����ת��ҳ��
                    location.href= '/main/index';
                }
            }
        });
        return false;//��ֹ��ťĬ����Ϊ
    })
})