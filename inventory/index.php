<?php
    session_start();

    if(!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
        header("location: ../login");
        exit;
    }
?>

<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="keywords" content="mechan, mechanik, card game, mechan card game">
    <title>MECHAN - The Card Game</title>
    <link rel="icon" href="../img/mechan_logo.png">

    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/draw_style.css">
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
    <script src="card.js"></script>

    <?php
    require "../config.php";
        $sesID = $_SESSION['id'];
    ?>

</head>
<body>
<div class="droppedCard" style="z-index:3; display:none;"></div>
    <div id="header">
        <a href="../index.php"><h1>MECHAN - The Card Game</h1><hr></a>
    </div>

    <div id="user">
        <?php
            if(isset($_SESSION["username"]))
                echo "Zalogowany: <span style='color: #398AD7'>" . htmlspecialchars($_SESSION["username"]) . "</span>";
        ?>
        <br>
    </div>

    <div id="inventoryMain" class="inv">
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
                echo "<div class='item class_red_item' onclick='show(this)' style='background-image: url(".$row["photo"].")'></div>";
            }
        ?>
    </div>
    <a href="../draw" style="text-align: center;"><h3>Powót do losowania</h3></a>
</body>
</html>