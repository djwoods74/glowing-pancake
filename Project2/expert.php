<?php
include "header.php";
include "kill.php";
include "congrat.php";
include "guessed.php";
?>
<?php

require_once'functions.php';

$letters = array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');

if (empty($_POST)) {
    $words = explode("\n", file_get_contents('expert.txt'));
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
    if (stristr($word, $guess) && !(stristr($show, $guess))) {
        $show = '';
        $right[$guess] = $guess;
        $wordletters = str_split($word);
        foreach ($wordletters as $letter) {
            $show .= $right[$letter];
        }
		if (strcmp($show, $word) == 0 || strcmp($show, $word) == -2) {
			congratPlayer($word);
		} 
    } elseif (stristr($show, $guess)) {
		alreadyGuessed($word);
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
              <input name='guess' maxlength="1" />
              <input type='hidden' name='word' value='<?php echo $word ?>' />
              <input type='hidden' name='rightstr' value='<?php echo $rightstr ?>' />
              <input type='hidden' name='wrongstr' value='<?php echo $wrongstr ?>' />
              <input type='submit' value='GUESS' />
            </form>
            <br>
			<div class="hangman"><p><img src="<?= $hang[count($wrong)];?>"/></p></div>
			<br>
			<a href='expert.php'>Start Over</a>
			<br>
			<a href='main.html'>Back To Menu</a>
  </body>
</html>