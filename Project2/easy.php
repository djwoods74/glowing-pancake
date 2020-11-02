<?php
include "header.php";
?>
<?php

require_once'functions.php';
/*
 * 3d10-hangman-generator.php
 * by Duane O'Brien - http://chaoticneutral.net
 * written for IBM DeveloperWorks
 */

$letters = array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');


if (empty($_POST)) {
    $words = explode("\n", file_get_contents('easy.txt'));
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

function killPlayer($word) {
    echo <<<ENDPAGE
  <!DOCTYPE html>
  <html>
   <head>
      <title>Hangman</title>
    </head>
    <body>
      <h1>You lost!</h1>
      <p>The word you were trying to guess was <em>$word</em>.</p>
    </body>
  </html>
  ENDPAGE;
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
            <a href='generator.php'>Start Over</a>
  </body>
</html>


