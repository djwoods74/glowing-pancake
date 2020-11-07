<?php
function alreadyGuessed($word) {
    echo <<<ENDPAGE
  <!DOCTYPE html>
  <html>
   <head>
      <title>Hangman</title>
    </head>
    <body>
      <p>You have already guessed that one!</p>
    </body>
  </html>
  ENDPAGE;
  }
?>