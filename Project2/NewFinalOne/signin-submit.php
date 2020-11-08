<?php 
session_save_path ("/home/tderado1/public_html/PW/project2test/session/");
session_start();
?>
<html>
 <head>
 <meta charset="utf-8"/>
		<title>Sign Up</title>
        <link href="hang.css" rel="stylesheet" type="text/css" />
        <link rel="icon" href="icon.jpg" type="image/gif" sizes="16x16">
        <link href="https://fontmeme.com/super-mario-font/">
        <link href="https://fonts.googleapis.com/css2?family=Henny+Penny&display=swap" rel="stylesheet">  
  </head>
  <body>
	<?php
		$file = 'users.txt';
		$current = file_get_contents($file);
		$information = explode(",", $current);
		$temp = implode("\n", $information);
		$information = explode("\n", $temp);
		$match = 0;
		
		if(empty($_POST["name"])) echo '<h1>No username input</h1><br>';
		if(empty($_POST["password"])) echo '<h1>No password input</h1><br>';
		
		if(empty($_POST["name"]) != true && empty($_POST["password"]) != true){
			for($i = 0; $i < (count($information)-1)/7; $i++){
				if($information[(($i)*7)] == $_POST["name"] && $information[(($i)*7)+1] == $_POST["password"]){
					$match = 1;
					$_SESSION['name'] = $_POST["name"];
					//$_SESSION['password'] = $_POST["password"];
					echo '<h1>You are Signed In '.$_SESSION['name'].'</h1><br>';
				}		
			}
			if($match == 0){
				echo '<h1>No User with the password found</h1>';
				echo '<a href="main.html">Back To Menu</a>';
			}else{
				echo '<a href="playing.html">Back To Menu</a>';
			}
		}
	?>
  </body>
</html>