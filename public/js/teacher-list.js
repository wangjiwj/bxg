define(['jquery','template'], function ($, template) {

    $.ajax({
        type:'get',
        url:'/api/teacher',
        dataType:'json',
        success: function (data) {
            //�������ݣ���Ⱦҳ��
            var html=template('teacherTpl',{list:data.result});
            $('#teacherInfo').html(html);
        }
    })
})
