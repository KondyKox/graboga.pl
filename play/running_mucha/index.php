<?php
    session_start();
    if(!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
        header("location: ../../login");
        exit;
    }
    require "../../config.php";
    $sesID = $_SESSION['id'];
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

    <script src="../../jquery-3.6.1.min.js"></script>
    <script src="../../draw/array.js"></script>

    <?php 
        $sq4 = "SELECT best_record FROM users WHERE id = $sesID";
        $resul = mysqli_query($link, $sq4);
        while($row = mysqli_fetch_assoc($resul)) {
            echo "<script>let rekord = ".$row['best_record'].";</script>";
        }
    ?>
    
    <script src="skrypt.js" type="module"></script>
    <script src="skins.js"></script>
</head>
<body>
    <button id="skins" class="button lead" onclick="location.href='skin.html'">SKLEP</button>
    <div id="jump" class="world" style="float:left" data-world>
        <div class="score" id="wynik" data-score>
            0
        </div>
        <div class="best-score" data-score>
            Twój rekord: <span id="rekord" style="color: #398AD7;"><?php 
                $sq4 = "SELECT best_record FROM users WHERE id = $sesID";
                $resul = mysqli_query($link, $sq4);
                while($row = mysqli_fetch_assoc($resul)) {
                    echo $row['best_record'];
                }?></span>
        </div>
        <div class="start-screen" data-start-screen>
            Klikaj cokolwiek, żeby zacząć
        </div>
        <img src="./assets/ground.png" class="ground" data-ground />
        <img src="./assets/ground.png" class="ground" data-ground />
        <img src="./assets/white/ludzik-stoi.png" class="dino" data-dino />
    </div>

    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</body>
</html>