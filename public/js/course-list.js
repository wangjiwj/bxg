define(['jquery','template','util'], function ($,template,util) {
    //���õ����˵�ѡ��
    util.setMenu(location.pathname);
    //��ȡ���еĿγ��б�����
    $.ajax({
        type:'get',
        url:'/api/course',
        dataType:'json',
        success: function (data) {
           //�������ݣ���Ⱦҳ��
            var html=template('courseTpl',{list:data.result});
            $('#courseInfo').html(html);
        }
    })
})
