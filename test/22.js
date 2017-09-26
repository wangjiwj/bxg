define(['jquery','template','util','ckeditor','validate','form'],function($,template,util,CKEDITOR){
    // ���õ����˵�ѡ��
    util.setMenu('/course/add');
    // ��ȡ�γ�ID
    var csId = util.qs('cs_id');
    // ��ȡ������־λ
    var flag = util.qs('flag');
    // ���ݿγ�ID��ѯ�γ������Ϣ
    $.ajax({
        type : 'get',
        url : '/api/course/basic',
        data : {cs_id : csId},
        dataType : 'json',
        success : function(data){
            if(flag){
                data.result.operate = '�γ̱༭';
            }else{
                data.result.operate = '�γ����';
            }
            var html = template('basicTpl',data.result);
            $('#basicInfo').html(html);


            // ��������������������
            $('#firstType').change(function(){
                var pid = $(this).val();
                // ����һ�������ID��ѯ�������������
                $.ajax({
                    type : 'get',
                    url : '/api/category/child',
                    data : {cg_id : pid},
                    dataType : 'json',
                    success : function(data){
                        // ƴ�Ӷ������������ѡ��
                        var tpl = '<option value="">��ѡ���������...</option>{{each list}}<option value="{{$value.cg_id}}">{{$value.cg_name}}</option>{{/each}}';
                        var html = template.render(tpl,{list : data.result});
                        $('#secondType').html(html);
                    }
                });
            });
            // �����ı�
            CKEDITOR.replace('editor',{
                toolbarGroups : [
                    { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
                    { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] }
                ]
            });
            // ������ύ
            $('#basicForm').validate({
                sendForm : false,
                valid : function(){
                    // �����ı�����ͬ��
                    for(var instance in CKEDITOR.instances){
                        CKEDITOR.instances[instance].updateElement();
                    }
                    // �ύ��
                    $(this).ajaxSubmit({
                        type : 'post',
                        url : '/api/course/update/basic',
                        data : {cs_id : csId},
                        dataType : 'json',
                        success : function(data){
                            if(data.code == 200){
                                location.href = '/course/picture?cs_id=' + data.result.cs_id;
                            }
                        }
                    });
                }
            });

        }
    });

});
