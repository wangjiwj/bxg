define(['jquery','template'],function($,template){
    //���ýӿڻ�ȡ������Ϣ
    $.ajax({
        type:'get',
        url:'/api/teacher/profile',
        dataType:'json',
        success: function (data) {
            //�������ݣ���Ⱦҳ��
            var html=template('settingsTpl',data.result);
            $('#settingsInfo').html(html);
        }
    })
});
