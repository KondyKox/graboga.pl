<?php
    session_start();

    if(!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
        header("location: ../login");
        exit;
    } 

    $sesID = $_SESSION['id'];
    require "../config.php";
?>

<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="keywords" content="mechan, mechanik, card game, mechan card game, gra-bo.ga">
    <title>MECHAN - The Card Game</title>
    <link rel="icon" href="../img/mechan_logo.png">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/inventory_style.css">
    
    <script src="../jquery-3.6.1.min.js"></script>
    <script src="../draw/array.js"></script>
    <script src="cards.js"></script>

        <?php
            require "../config.php";
            $sesID = $_SESSION['id']; 
        ?>

</head>
<body>
    <center>
        <div id="cards" class="droppedCard col-sm-12" style="z-index:3; display:none;"></div>
    </center>

    <nav class="navbar navbar-dark" role="navigation">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="../index.php"><img src="../img/mechan_logo.png"></a>
                <h1>MECHAN - The Card Game</h1>
                <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbar-collapse-main">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
            <div class="collapse navbar-collapse" id="navbar-collapse-main">
                <ul class="nav navbar-nav navbar-right">
                    <li class="dropdown-item"><a href="../index.php" class="nav-link active">Strona główna</a></li>
                    <li class="dropdown-item">
                        <?php
                            if(!isset($_SESSION["username"]))
                                echo '<a href="../login" class="nav-link"><input type="submit" value="Rejestracja / Logowanie"></a>';
                            else 
                                echo '<a href="../logout" class="nav-link"><input type="submit" value="Wyloguj"></a>';
                        ?>
                    </li>
                    <li class="dropdown-item"><a href="https://www.paypal.me/megakoks" target="_blank" class="nav-link">Donate</a></li>
                    <li class="dropdown-item"><a href="https://github.com/KondyKox/MECHAN-The-Card-Game" target="_blank" class="nav-link">Github</a></li>
                    <li class="dropdown-item"><a href="../contact/" class="nav-link">Kontakt</a></li>
                    <li class="dropdown-item"><a href="#" target="_blank" class="nav-link">Zwiastun</a></li>
                    <li style="margin: 3%;">
                        <?php
                            $sq4 = "SELECT money_count as monety FROM users WHERE id = $sesID";
                            $resul = mysqli_query($link, $sq4);

                            if(isset($_SESSION["username"])) {
                                while($row = mysqli_fetch_assoc($resul))                                   
                                    echo "Zalogowany: <span style='color: #398AD7' id='monety'>" . htmlspecialchars($_SESSION["username"]) . " (" . $row['monety'] . " <img src='../img/boski_dukat.png' alt='Boski Dukat' style='width: 20px; height: 20px;'>)</span>";
                            }                           
                        ?>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div id="inventoryMain" class="inv col-sm-12">
        <h2 style="text-align: center;">Twój ekwipunek</h2>
        <p style="margin-left: 10%;">
            <?php
                $sq0 = "SELECT COUNT(drops.id) as counts FROM drops WHERE drops.user_id = $sesID";

                $result = mysqli_query($link, $sq0);
                echo "Ilość kart: <span style='color: #398AD7'>".mysqli_fetch_assoc($result)['counts']."</span>";
                echo "<br>"; 
            ?>
        </p>
        <hr style="border-color: #398AD7;">
            <?php
                $sql = "SELECT drops.id, drops.drop_date, drops.user_id,
                    items.id, items.name, items.rarity, items.resource as photo
                    FROM drops INNER JOIN items ON drops.item_id = items.id
                    WHERE drops.user_id = $sesID
                    ORDER BY drops.id DESC";

                $result = mysqli_query($link, $sql);
                while($row = mysqli_fetch_assoc($result)) {
                    echo "<div class='item class_red_item itemHover' onclick='show(this)' style='background-image: url(".$row["photo"].")'></div>";
                } 
            ?>
    </div>

    <footer class="container-fluid text-center">
        <div class="row">
            <div class="col-sm-12">
                <a href="../draw" style="text-align: center;"><h3>Powrót do losowania</h3></a>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</body>
</html>