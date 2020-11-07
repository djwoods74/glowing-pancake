<?php
session_save_path ("/home/tderado1/public_html/PW/project2test/session/");
session_start();
include "header.php";
include "kill.php";
include "congrat.php";
?>
<?php
		$file = 'users.txt';
		$current = file_get_contents($file);
		$information = explode(",", $current);
		$temp = implode("\n", $information);
		$information = explode("\n", $temp);
		$UserScoreID = 0;
		//$current .= $_POST["name"].",".$_POST["password"].",".$_POST["email"].",0,0,0,0"."\n";
		//file_put_contents($file, $current);
		if(empty($_SESSION['name']) != true){
			for($i = 0; $i < count($information)/7; $i++){
				if($information[(($i)*7)] == $_SESSION['name']){
					$UserScoreID = (($i)*7)+4;
				}
			}
		}
require_once'functions.php';

$letters = array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');

if (empty($_POST)) {
    $words = explode("\n", file_get_contents('medium.txt'));
    $right = array_fill_keys($letters, '_ ');
    $wrong = array();
    shuffle($words);
    $word = strtolower($words[0]);
    $rightstr = serialize($right);
    $wrongstr = serialize($wrong);
    $wordletters = str_split($word);
    $show = '';
    foreach ($wordletters as $letter) {
        $show .= $right[$letter];
    }
} else {
    $word = $_POST['word'];
    $guess = strtolower($_POST['guess']);
    $right = unserialize($_POST['rightstr']);
    $wrong = unserialize($_POST['wrongstr']);
    $wordletters = str_split($word);
    if (stristr($word, $guess)) {
        $show = '';
        $right[$guess] = $guess;
        $wordletters = str_split($word);
        foreach ($wordletters as $letter) {
            $show .= $right[$letter];
        }
		if (strcmp($show, $word) == 0 || strcmp($show, $word) == -2) {
			congratPlayer($word);
			if(empty($_SESSION['name']) != true) {
				$current = file_get_contents($file);
				$information = explode(",", $current);
				$temp = implode("\n", $information);
				$information = explode("\n", $temp);
				$information[$UserScoreID] += 1;
				echo 'Current Number of Medium Wins: '.$information[$UserScoreID];
				$current = "";
				for($i = 0; $i < (count($information)-1)/7; $i++){
					$current .= $information[(($i)*7)+0].",".$information[(($i)*7)+1].",".$information[(($i)*7)+2].",".$information[(($i)*7)+3].",".$information[(($i)*7)+4].",".$information[(($i)*7)+5].",".$information[(($i)*7)+6]."\n";
				}
				file_put_contents($file, $current);
			}
		}
        
    } else {
        $show = '';
        $wrong[$guess] = $guess;
        if (count($wrong) == 6) {
            killPlayer($word);
		} else {
            foreach ($wordletters as $letter) {
                $show .= $right[$letter];
            }
		}
    }
    $rightstr = serialize($right);
    $wrongstr = serialize($wrong);
}

?>
<br><br>
Bad Guesses : <?php echo implode(', ', $wrong) ?><br />
<?php echo $show ?><br />
<!DOCTYPE html>
<html>
 <head>
 <meta charset="utf-8"/>
        <link href="hang.css" rel="stylesheet" type="text/css" />
        <link rel="icon" href="icon.jpg" type="image/gif" sizes="16x16">
        <link href="https://fontmeme.com/super-mario-font/">
        <link href="https://fonts.googleapis.com/css2?family=Henny+Penny&display=swap" rel="stylesheet">  
  </head>
  <body>
          <form method='post'>
              <br>
              <input name='guess' />
              <input type='hidden' name='word' value='<?php echo $word ?>' />
              <input type='hidden' name='rightstr' value='<?php echo $rightstr ?>' />
              <input type='hidden' name='wrongstr' value='<?php echo $wrongstr ?>' />
              <input type='submit' value='GUESS' />
            </form>
            <br>
			<div class="hangman"><p><img src="<?= $hang[count($wrong)];?>"/></p></div>
			<br>
			<a href='medium.php'>Start Over</a>
			<br>
			<a href='main.html'>Back To Menu</a>
  </body>
</html>