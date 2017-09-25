define(['jquery','template','ckeditor','uploadify','region','datepicker','language'],function($,template,CKEDITOR){
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

            //����ʡ������������
            $('#pcd').region({
                url:'/public/assets/jquery-region/region.json'
            });

            //�����ı�
            CKEDITOR.replace('editor',{
                toolbarGroups:[
                    { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
                    { name: 'colors', groups: [ 'colors' ] },
                ]
            })
        }
    })
});
