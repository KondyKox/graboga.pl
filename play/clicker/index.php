<?php
    session_start();
    if(!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
        header("location: ../../login");
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
    <link rel="icon" href="../../img/mechan_logo.png">
    <style>
      input[type="submit"]{
        background-image: url("../../img/cards/kartaMucha2.png"); 
        height: 80vh;
        width: 50vh;
      }
    </style>
    <link rel="stylesheet" href="../../css/style.css">

</head>
<body>
    <div id="container">
        <div id="header">
            <a href="../../index.php"><h1>MECHAN - The Card Game</h1><hr></a>
        </div>

        <div id="user">
            <?php
            require "../../config.php";
              $sesID = $_SESSION['id'];
                if(isset($_SESSION["username"]))
                    echo "Zalogowany: <span style='color: #398AD7'>" . htmlspecialchars($_SESSION["username"]) . "</span>";
                echo "<br>";
                $sq4 = "SELECT money_count as counts FROM profiles WHERE user_id = $sesID";

                $result4 = mysqli_query($link, $sq4);
                echo "Ilość monet: <span style='color: #398AD7'>".mysqli_fetch_assoc($result4)['counts']."</span>";
                echo "<br>";
      
        ?>
        </div>

        <div id="click">
            <center>
                <!--<img src="../../img/cards/kartaMucha2.png">-->
            
            
             <form action="index.php" method="post">
                <input type="submit" name="submit" value="">
            </form>
            </center>
            <?php 
              $sq0 = "UPDATE `profiles` SET `money_count` = money_count + 1 WHERE user_id = $sesID;";
              $run = mysqli_query($link, $sq0);
            ?>
               
        </div>
    </div>
</body>
</html>