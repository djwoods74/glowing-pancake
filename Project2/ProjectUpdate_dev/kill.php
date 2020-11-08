<?php
function killPlayer($word) {
    echo <<<ENDPAGE
  <!DOCTYPE html>
  <html>
   <head>
      <title>Hangman</title>
    </head>
    <body>
      <h1>You lost!</h1>
      <div class="result"><div class="lost"><p>The word you were trying to guess was <em>$word</em>.</p></div></div>
    </body>
  </html>
  ENDPAGE;
  }
?>