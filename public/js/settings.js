define(['jquery','template','uploadify'],function($,template){
    //���ýӿڻ�ȡ������Ϣ
    $.ajax({
        type:'get',
        url:'/api/teacher/profile',
        dataType:'json',
        success: function (data) {
            //�������ݣ���Ⱦҳ��
            var html=template('settingsTpl',data.result);
            $('#settingsInfo').html(html);

            //����ͷ���ϴ�
            $('#upfile').uploadify({
                width:120,
                height:120,
                buttonText:'',
                itemTemplate:'<span></span>',
                swf:'/public/assets/uploadify/uploadify.swf',
                uploader:'/api/uploader/avatar',
                fileObjName:'tc_avatar',
                onUploadSuccess:function(a,b){
                    var obj=JSON.parse(b);
                    $('.preview img').attr('src',obj.result.path);
                }
            })
        }
    })
});
