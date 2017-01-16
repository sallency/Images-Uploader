/**
 * @author: Mr.wang 32448732@qq.com
 * 一款简单的图片上传组件
 * 可定制表单键名、单个图片大小限制、图片个数限制、图片类型限制
 * 图片可预览
 * version 0.0.1
 */
(function(root) {
    root.FileUploader = {
        createUploader: function(containerId, uploadBtnId) {
            //图组容器ID
            var container = "#" + containerId;
            //上传按钮ID
            var uploadBtn = "#" + uploadBtnId;
            //表单键名 默认 files
            var ARR_FILE_NAME = arguments[2] ? arguments[2] : 'files';
            //文件大小限制 默认 400 KB
            var MAX_FILE_SIZE = arguments[3] ? arguments[3] * 1024 : 400 * 1024;
            //文件数目限制 默认不限制
            var MAX_FILE_NUM  = arguments[4] ? arguments[4] : null;
            //默认类型
            var ACCEPT_TYPE = arguments[5] ? arguments[5] : ['jpg', 'bmp', 'png'];

            //上传按钮监听
            $(uploadBtn).click(function() {
                //模版
                var template = '<div class="prev_row"><div class="delete">删除</div><div class="prev">添加图片</div><input name="' + ARR_FILE_NAME +'[]" type="file" /><span class="file_input_mask">上传图片</span></div>';
                //当前插入块儿
                var curDiv = $(template);
                //添加的图片数量
                var num = $(container).children(".prev_row").size();
                //当前最后一个插入块
                var lastInput = $(container).find('.prev_row input[type="file"]').last();
                if (lastInput && lastInput.val() == '') {
                    lastInput.trigger('click');
                } else if (MAX_FILE_NUM != null && num >= MAX_FILE_NUM) {
                    alert("上传数量超出限制！");
                    return false;
                } else {
                    curDiv.insertBefore('.prev_add');
                    curDiv.find('input[type="file"]').trigger('click');
                } 
            });

            //删除动作
            $(container).on("mouseenter mouseleave", ".prev_row", function(event) {
                if (event.type == "mouseenter") {
                    $(this).find(".delete").stop(true, true).fadeIn();
                } else if (event.type == "mouseleave") {
                    $(this).find(".delete").stop(true, true).fadeOut();
                }
            });

            //删除上传块儿
            $(container).on("click", ".prev_row .delete", function(event) {
                $(this).parent().remove();
            });

            $(container).on("change", "input[type='file']", function(event) {
                //预览的容器块儿
                var prevDiv = $(this).siblings("div.prev");
                var file = $(this).get()[0];
                if (file.files && file.files[0]) {
                    curFile = file.files[0];

                    var file_allowed = true;

                    if (curFile.size > MAX_FILE_SIZE) {
                        file_allowed = false;
                        alert("图片大小超出限制，请上传 " + MAX_FILE_SIZE / 1024 + "KB 以内的图片！");
                    } else {
                        var type_allowed = false;
                        var type = curFile.name.substring(curFile.name.indexOf(".") + 1);
                        for (var i = 0; i < ACCEPT_TYPE.length; i ++) {
                            if (type == ACCEPT_TYPE[i]) {
                                type_allowed = true;
                                break;
                            }
                        }
                        if (!type_allowed) {
                            file_allowed = false;
                            alert("图片格式不允许！");
                        }
                    }

                    if (!file_allowed) {
                        //超出限制 回退删除挂载的预览块儿
                        prevDiv.parent().remove();
                        file.value = '';
                        return false;
                    }

                    var reader = new FileReader();
                    reader.onload = function(evt) {
                        prevDiv.html('<img src="' + evt.target.result + '" />');
                    }

                    reader.readAsDataURL(file.files[0]);
                } else {
                    prevDiv.html('<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>');
                }
            });
        }
    }
})(window);