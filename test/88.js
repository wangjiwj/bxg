define(['jquery','template','util','uploadify','jcrop','form'],function($,template,util){
    // ���õ����˵�ѡ��
    util.setMenu('/course/add');
    // ��ȡ�γ�ID
    var csId = util.qs('cs_id');
    // ��ȡ�γ̷�������
    $.ajax({
        type : 'get',
        url : '/api/course/picture',
        data : {cs_id : csId},
        dataType : 'json',
        success : function(data){
            // �������ݣ���Ⱦҳ��
            var html = template('pictureTpl',data.result);
            $('#pictureInfo').html(html);

            // ѡ��ͼƬ
            var img = $('.preview img').eq(0);
            var nowCrop = null;

            // ��������ϴ�
            $('#myfile').uploadify({
                width : 80,
                height : 'auto',
                itemTemplate : '<span></span>',
                buttonText : 'ѡ��ͼƬ',
                buttonClass : 'btn btn-success btn-sm',
                swf : '/public/assets/uploadify/uploadify.swf',
                uploader : '/api/uploader/cover',
                fileObjName : 'cs_cover_original',
                formData : {cs_id : csId},
                onUploadSuccess : function(a,b,c){
                    var obj = JSON.parse(b.trim());
                    $('.preview img').attr('src',obj.result.path);
                    // �ϴ��ɹ�֮��ֱ��ѡ��ѡ��
                    cropImage();
                    $('#cropBtn').text('����ͼƬ').attr('data-flag',true);
                }
            });
            // ����������

            $('#cropBtn').click(function(){
                var flag = $(this).attr('data-flag');
                if(flag){
                    // ��ת����һ������
                    $('#cropForm').ajaxSubmit({
                        type : 'post',
                        url : '/api/course/update/picture',
                        data : {cs_id : csId},
                        dataType : 'json',
                        success : function(data){
                            if(data.code == 200){
                                // ��ת����һ������
                                location.href = '/course/lesson?cs_id=' + data.result.cs_id;
                            }
                        }
                    });
                }else{
                    // ��һ�ε��
                    $(this).text('����ͼƬ').attr('data-flag',true);
                    // ʵ�ֲ��й���
                    cropImage();
                }
            });


            // ��װһ�������ķ���ʵ�ֲ���ͼƬ����
            function cropImage(){
                img.Jcrop({
                    aspectRatio : 2
                },function(){
                    // ����֮ǰ�Ĳ���ʵ��
                    nowCrop && nowCrop.destroy();
                    nowCrop = this;

                    // ��ȡͼƬ�Ŀ�Ⱥ͸߶�
                    var width = this.ui.stage.width;
                    var height = this.ui.stage.height;
                    // ����ѡ���Ĳ���
                    var x = 0;
                    var y = (height - width/2)/2;
                    var w = width;
                    var h = width/2;
                    // ��ʼ��Ĭ��ѡ������
                    var aInput = $('#cropForm').find('input');
                    aInput.eq(0).val(x);
                    aInput.eq(1).val(y);
                    aInput.eq(2).val(w);
                    aInput.eq(3).val(h);
                    // ��̬����һ��ѡ��
                    this.newSelection();
                    this.setSelect([x,y,w,h]);
                    // ��ʼ������Ԥ��ͼ
                    this.initComponent('Thumbnailer',{
                        width : 240,
                        height : 120,
                        mythumb : '.thumb'
                    });
                    $('.jcrop-thumb').css({
                        position : 'absolute',
                        top : 0,
                        left : 0
                    });
                    // ���ѡ���仯�¼�
                    img.parent().on('cropstart cropmove cropend',function(a,b,c){
                        var aInput = $('#cropForm').find('input');
                        aInput.eq(0).val(c.x);
                        aInput.eq(1).val(c.y);
                        aInput.eq(2).val(c.w);
                        aInput.eq(3).val(c.h);
                    });
                });
            }
        }
    });
});