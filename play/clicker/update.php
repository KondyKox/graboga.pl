<?php
    session_start();

    $sesID = $_SESSION['id'];
    require "../../config.php";
    $sq0 = "UPDATE `users` SET `money_count` = money_count + 1 WHERE id = $sesID;";
    mysqli_query($link, $sq0);

?>