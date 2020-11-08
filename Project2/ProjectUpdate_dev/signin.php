<?php session_start(); 
?>
<html>
 <head>
 <meta charset="utf-8"/>
		<title>Sign In</title>
        <link href="hang.css" rel="stylesheet" type="text/css" />
        <link rel="icon" href="icon.jpg" type="image/gif" sizes="16x16">
        <link href="https://fontmeme.com/super-mario-font/">
        <link href="https://fonts.googleapis.com/css2?family=Henny+Penny&display=swap" rel="stylesheet">  
  </head>
  <body>
		<form action="signin-submit.php" method="post">
			<fieldset class="column">
			  <legend>Sign In</legend>
			  <ul class="field">
				  <li>
					  <label class="left" for="name">Username:</label>
					  <input type="text" id="name" name="name" size="16">
				  </li>
					<br>
				  <li>
					  <label class="left" for="password">Password:</label>
					  <input type="text" id="password" name="password" size="16">
				  </li>
					<br>
					<input type="submit" value="Sign In">
			  </ul>
			</fieldset>
		</form>
			<a href='main.html'>Back To Menu</a>
  </body>
</html>