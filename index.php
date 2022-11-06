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
    <link rel="icon" href="img/mechan_logo.png">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/index_style.css">

    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2534586073857624" crossorigin="anonymous"></script>
</head>
<body>
    <nav class="navbar navbar-expand-lg" role="navigation">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse-main">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar">---</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#"><img src="img/mechan_logo.png"></a>
            </div>
            <div class="collapse navbar-collapse" id="navbar-collapse-main">
                <ul class="nav navbar-nav navbar-right">
                    <li class="nav-item"><a href="index.php" class="nav-link active">Strona główna</a></li>
                    <li class="nav-item">
                        <?php
                            if(!isset($_SESSION["username"]))
                                echo '<a href="login" class="nav-link"><input type="submit" value="Rejestracja / Logowanie"></a>';
                            else 
                                echo '<a href="logout" class="nav-link"><input type="submit" value="Wyloguj"></a>';
                        ?>
                    </li>
                    <li class="nav-item"><a href="https://www.paypal.me/megakoks" target="_blank" class="nav-link">Donate</a></li>
                    <li class="nav-item"><a href="https://github.com/KondyKox/MECHAN-The-Card-Game" target="_blank" class="nav-link">Github</a></li>
                    <li class="nav-item"><a href="contact/" class="nav-link">Kontakt</a></li>
                    <li class="nav-item">
                        <?php
                            if(isset($_SESSION["username"]))
                                echo "Zalogowany: <span style='color: #398AD7'>" . htmlspecialchars($_SESSION["username"]) . "</span>";
                        ?>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div id="home">
        <div class="landing-text">
            <h1>MECHAN - The Card Game</h1>
        </div>
    </div>

    <div class="padding">
        <div class="container">
            <div class="row">
                <div class="col-sm-6">
                    <img src="./img/dyrektor.png" alt="Dyrektor Mechanika">
                </div>
                <div class="col-sm-6 text-center">
                    <a href="./play"><input type="submit" class="lead buttonMain button" value="GRAJ"></a>
                    <a href="./draw"><input type="submit" class="lead buttonMain button" value="LOSUJ"></a>
                    <input type="submit" class="lead buttonMain button" value="PRZYCISK" onclick="alert('BRAWO! Wcisnąłeś przycisk!')">
                </div>
            </div>
        </div>
    </div>

    <div class="padding">
        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <img src="img/donejtor.png" alt="ad" class="ad">
                </div>

                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <img src="img/nig.png" alt="ad" class="ad">
                </div>

                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <img src="img/grafika.png" alt="ad" class="ad">
                </div>

                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <img src="img/praktykant.png" alt="ad" class="ad">
                </div>
            </div>
        </div>
    </div>

    <footer class="container-fluid text-center">
        <div class="row">
            <div class="col-sm-12">
                <p>Wykonali: <span style="color: #398AD7;">Konrad Ciesielski</span> i <span style="color: #398AD7;">Michał Wachowski (4ir)</span></p>
            </div>
        </div>
    </footer>

    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</body>
</html>