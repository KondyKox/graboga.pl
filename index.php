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

    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/index_style.css">

    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2534586073857624" crossorigin="anonymous"></script>
</head>
<body>
    <div id="container">
        <div id="header">
            <a href="index.php"><h1>MECHAN - The Card Game</h1><hr></a>
        </div>

        <div id="user">
            <?php
                if(isset($_SESSION["username"]))
                    echo "Zalogowany: <span style='color: #398AD7'>ja" . htmlspecialchars($_SESSION["username"]) . "</span>";
            ?>
        </div>

        <div id="left">
            <img src="./img/dyrektor.png" alt="Dyrektor Mechanika" style="height: 70vh;">
        </div>

        <div id="centerTop">
            <a href="./play"><input type="submit" class="buttonMain button" value="Graj"></a>
            <a href="./draw"><input type="submit" class="buttonMain button" value="Losuj"></a>
        </div>

        <div id="centerBottom">
            <div class="links">
                <?php
                    if(!isset($_SESSION["username"]))
                        echo '<a href="login"><input type="submit" class="button" value="Rejestracja / Logowanie"></a>';
                    else 
                        echo '<a href="logout"><input type="submit" class="button" value="Wyloguj"></a>';
                ?>
            </div>

            <div class="links">
                <a href="#"><input type="submit" class="button" value="Opinie"></a>
            </div>
            <div class="links">
                <a href="https://github.com/KondyKox/MECHAN-The-Card-Game" target="_blank"><input type="submit" class="button" value="Github"></a>
            </div>
            <div class="links">
                <a href="https://www.paypal.me/megakoks" target="_blank"><input type="submit" class="button" value="Donate"></a>
            </div>
            <div class="links">
                <a href="contact"><input type="submit" class="button" value="Kontakt"></a>
            </div>
            <div style="text-align: center; margin-top: 15%;">
                <p>Wykonali: <span style="color: #398AD7;">Konrad Ciesielski</span> i <span style="color: #398AD7;">Michał Wachowski (4ir)</span></p>
            </div>
        </div>

        <div id="right">
            <img src="img/praktykant.png" alt="ad" class="ad">
            <img src="img/nig.png" alt="ad" class="ad">
            <img src="img/grafika.png" alt="ad" class="ad">
        </div>
    </div>
</body>
</html>