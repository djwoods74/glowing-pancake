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
	$emailCheck = $_POST["email"];
	$information = explode(",", $current);
	$temp = implode("\n", $information);
	$information = explode("\n", $temp);
	$check = 0;
	
	for($i = 0; $i < (count($information)-1)/7;$i++){
		if($information[(($i)*7)] == $_POST["name"]){
				echo '<h1>Sorry, This Username has already been Taken!</h1>';
				$check = 1;
		}
		if($information[(($i)*7)+2] == $emailCheck){
				echo '<h1>Sorry, This email has already been used!</h1>';
				$check = 1;
		}
	}
	if($_POST["password"] != $_POST["passwordCheck"]){
		echo '<h1>incorrect confirm password!</h1>';
		$check = 1;
	}
	if($check == 0){
		echo '<h1>Thank you for joining!</h1>';
		$current .= $_POST["name"].",".$_POST["password"].",".$_POST["email"].",0,0,0,0"."\n";
		file_put_contents($file, $current);
		echo '
			<a href="main.html">Back To Menu</a>';
	}
  ?>
  </body>
</html>