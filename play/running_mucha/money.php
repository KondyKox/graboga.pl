<?php
    session_start();
    $sesID = $_SESSION['id'];
    $rekord = $_POST['rekord'];
    require "../../config.php";
    $monety = intval($rekord/10);

    $sq1 = "UPDATE users SET money_count = money_count + $monety WHERE id = $sesID;";
    mysqli_query($link, $sq1);
