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
		<form action="./signup-submit.php" method="post">
			<fieldset class="column">
			  <legend>New User Signup</legend>
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
				  <li>
					  <label class="left" for="passwordCheck">Confirm Password:</label>
					  <input type="text" id="passwordCheck" name="passwordCheck" size="16">
				  </li>
					<br>
				  <li>
					  <label class="left" for="email">email:</label>
					  <input type="email" id="email" name="email" size="20">
				  </li>
					<br>
					<input type="submit" value="Sign Up">
			  </ul>
			</fieldset>
		</form>
			<a href='main.html'>Back To Menu</a>
  </body>
</html>