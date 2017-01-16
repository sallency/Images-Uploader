<?php
/**
 * 
 */

header('Content-type: image/jpg');
file_put_contents("upload.log", var_export($_FILES, true));
if (!empty($_FILES)) {
    $img_arr = $_FILES['poster'];
    foreach ($img_arr['name'] as $key => $img) {
        echo file_get_contents($img_arr['tmp_name'][$key]);
    }
}