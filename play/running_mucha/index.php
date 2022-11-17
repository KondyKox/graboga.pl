<?php
    session_start();
?>

<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="keywords" content="mechan, mechanik, card game, mechan card game, gra-bo.ga">
    <title>MECHAN - The Card Game</title>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="icon" href="../../img/mechan_logo.png">
    <link rel="stylesheet" href="../../css/runner_style.css"/>

    <script src="skrypt.js" type="module"></script>
    <script src="../../jquery-3.6.1.min.js"></script>
</head>
<body>
    <button id="btn" class="button lead">SKOK</button>
    <div class="world" style="float:left" data-world>
        <div class="score" data-score>
            0
        </div>
        <div class="best-score" data-score>
            Twój rekord: <span style="color: #398AD7;">0</span>
        </div>
        <div class="start-screen" data-start-screen>
            Klikaj cokolwiek, żeby zacząć
        </div>
        <img src="./assets/ground.png" class="ground" data-ground />
        <img src="./assets/ground.png" class="ground" data-ground />
        <img src="./assets/ludzik-stoi.png" class="dino" data-dino />
    </div>

    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</body>
</html>