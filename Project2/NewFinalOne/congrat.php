<?php
function congratPlayer($word) {
    echo <<<ENDPAGE
  <!DOCTYPE html>
  <html>
   <head>
      <title>Hangman</title>
    </head>
    <body>
      <div class="result"><div class="win"><h1>You won!</h1></div></div>
    </body>
  </html>
  ENDPAGE;
  }
?>