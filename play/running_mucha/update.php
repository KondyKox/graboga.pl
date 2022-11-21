<?php
    session_start();
    $sesID = 1;
    $rekord = $_POST['rekord'];
    require "../../config.php";
    $sq0 = "UPDATE users SET best_record = $rekord WHERE id = $sesID;";
    $run = mysqli_query($link, $sq0);
