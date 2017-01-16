# Images-Uploader
a simple images uploader with preview
![image](https://github.com/sallency/images-uploader/blob/master/images/show.png)
1 container
<!-- uploader container -->
<div class="prev_container" id="container">
    <!-- add button -->
    <div class="prev_add">
        <div class="prev" id="upload"></div>
    </div>
</div>
import js/uploader.js after jquery library
//container_id add_button_id key_name single_image_max_size max_count image_type_limit
FileUploader.createUploader("container", "upload", 'poster', 2000, 10);
when you post to server, you can get this files by $_FILES['poster']
