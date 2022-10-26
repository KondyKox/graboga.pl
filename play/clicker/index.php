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
    <link rel="icon" href="../../img/mechan_logo.png">

    <link rel="stylesheet" href="../../css/style.css">

</head>
<body>
    <div id="container">
        <div id="header">
            <a href="../../index.php"><h1>MECHAN - The Card Game</h1><hr></a>
        </div>

        <div id="user">
            <?php
                if(isset($_SESSION["username"]))
                    echo "Zalogowany: <span style='color: #398AD7'>" . htmlspecialchars($_SESSION["username"]) . "</span>";
            ?>
        </div>

        <div id="click">
            <center>
                <img src="../../img/cards/kartaMucha2.png">
            </center>
            
             <form action="index.php" method="post">
                <input type="submit" name="submit" value="klik">
            </form>

            <?php
                require "../../config.php";
                $sesID = $_SESSION("id");
                $sq0 = "UPDATE 'profiles' SET 'money_count' = 'money_count' + 1 WHERE 'user_id' = $sesID";

                if(isset($_POST))
                    mysqli_query($link, $sq0);
            ?>
        </div>
    </div>
</body>
</html>