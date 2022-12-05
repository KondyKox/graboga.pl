<?php
    session_start();

    $sesUser = $_SESSION['id'];
    $skinId = $_POST['skin_id'];

    $sq = "SELECT 'id' FROM 'transactions' WHERE 'user_id' = $sesUser AND 'skin_id' = $skinId;";
    mysqli_query($link, $sq);
?>