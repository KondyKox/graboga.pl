<?php
session_start();
?>

<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="keywords" content="mechan, mechanik, card game, mechan card game">
    <title>MECHAN - The Card Game</title>

    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/draw_style.css">

    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
    <script src="array.js"></script>
    <script src="./function.js"></script>
    <script>
        function disableF5(e) { 
            if ((e.which || e.keyCode) == 116 || (e.which || e.keyCode) == 82)
                e.preventDefault(); 
        };
        $(document).ready(function(){
            $(document).on("keydown", disableF5);
        });
    </script>
</head>
<body>
    <center>
        <div id="result_container" style="display: none;" class="droppedCard">
            &nbsp;
        </div>
    </center>

    <div id="container" style="z-index: 1;">
        <div id="header">
            <a href="../index.php"><h1>MECHAN - The Card Game</h1><hr></a>
        </div>

        <div id="main">
            <div class="raffle-roller">
                <div class="raffle-roller-holder">
                    <div class="raffle-roller-container" style="margin-left: 0px;">
                    </div>
                </div>
            </div>
            
            <center>
                <button onclick="Generate()" id="Generate" class="buttonDraw button">Losuj</button>
                <button onclick="window.location='';" class="buttonDraw button">Reset</button><br>
            </center>
        </div>
    </div>
    <div id="inventory">
        <h3> Ekwipunek:</h3><hr style="border-color: #398AD7;">
    </div>
</body>
</html>
