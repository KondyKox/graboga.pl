<?php
    session_start();

    $sesID = $_SESSION['id'];
    require "config.php";
?>

<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="keywords" content="mechan, mechanik, card game, mechan card game, gra-bo.ga">
    <title>MECHAN - The Card Game</title>
    <link rel="icon" href="img/mechan_logo.png">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/index_style.css">

    <script src="jquery-3.6.1.min.js"></script>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2534586073857624"
     crossorigin="anonymous"></script>
</head>
<body>
    <nav class="navbar navbar-dark" role="navigation">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="index.php"><img src="img/mechan_logo.png"></a>
                <h1>MECHAN - The Card Game</h1>
                <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbar-collapse-main">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
            <div class="collapse navbar-collapse" id="navbar-collapse-main">
                <ul class="nav navbar-nav navbar-right">
                    <li class="dropdown-item"><a href="index.php" class="nav-link active">Strona główna</a></li>
                    <li class="dropdown-item">
                        <?php
                            if(!isset($_SESSION["username"]))
                                echo '<a href="login" class="nav-link">Rejestracja / Logowanie</a>';
                            else 
                                echo '<a href="logout" class="nav-link">Wyloguj</a>';
                        ?>
                    </li>
                    <li class="dropdown-item"><a href="https://www.paypal.me/megakoks" target="_blank" class="nav-link">Donate</a></li>
                    <li class="dropdown-item"><a href="https://github.com/KondyKox/MECHAN-The-Card-Game" target="_blank" class="nav-link">Github</a></li>
                    <li class="dropdown-item"><a href="https://erenglish.pl" class="nav-link">ER ENGLISH - Polecamy :)</a></li>
                    <li class="dropdown-item"><a href="https://youtu.be/Slz3vTqsKLg" target="_blank" class="nav-link">Zwiastun</a></li>
                    <li class="dropdown-item"><a href="contact/" class="nav-link">Kontakt</a></li>
                    <li style="margin: 3%;">
                        <?php
                            $sq4 = "SELECT money_count as monety FROM users WHERE id = $sesID";
                            $resul = mysqli_query($link, $sq4);

                            if(isset($_SESSION["username"])) {
                                while($row = mysqli_fetch_assoc($resul))   
                                    echo "Zalogowany: <span style='color: #398AD7' id='monety'>" . htmlspecialchars($_SESSION["username"]) . " (" . $row['monety'] . " <img src='img/boski_dukat.png' alt='Boski Dukat' style='width: 20px; height: 20px;'>)</span>";
                            }                           
                        ?>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="padding">
        <div class="container">
            <div class="row">
                <div class="col-sm-6">
                    <img src="./img/dyrektor.png" alt="Dyrektor Mechanika">
                </div>
                <div class="col-sm-6 text-center">
                    <a href="./play"><input type="submit" class="lead buttonMain button" value="GRAJ"></a>
                    <a href="./draw"><input type="submit" class="lead buttonMain button" value="LOSUJ"></a>
                    <a href="./ranking"><input type="submit" class="lead buttonMain button" value="RANKING"></a>
                </div>
            </div>
        </div>
    </div>

    <div class="padding">
        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <img src="img/donejtor.png" alt="Donejtor = Giga Chad" class="ad" Loading="lazy">
                </div>

                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <img src="img/nig.png" alt="NIGGER" class="ad" Loading="lazy">
                </div>

                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <img src="img/tworcy.png" alt="Twórcy gry" class="ad" Loading="lazy">
                </div>

                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <img src="img/idol_blogoslawi.png" alt="Idolu Ufam Tobie" class="ad" Loading="lazy">
                </div>
            </div>
        </div>
    </div>

    <footer class="container-fluid text-center">
        <div class="row">
            <div class="col-sm-12">
                <p style="font-size: 1.5em;">Wykonali: <span style="color: #398AD7;">Konrad Ciesielski</span> i <span style="color: #398AD7;">Michał Wachowski (4ir)</span></p>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</body>
</html>