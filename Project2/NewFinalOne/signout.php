<?php 
session_save_path ("/home/tderado1/public_html/PW/project2test/session/");
session_start(); /* Starts the session */
session_destroy(); /* Destroy started session */
header("location:signin.php");
exit;
?>