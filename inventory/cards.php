<?php 
    session_start();
    $con = mysqli_connect("localhost", "root", "rumcajs", "mechan_card_game");

    $sesUser = $_SESSION['id'];
    $dropId = $_POST['drop_id'];
    $sq = "DELETE FROM 'drops' WHERE 'user_id' = $sesUser AND 'item_id' = $dropId;
            UPDATE 'users' SET 'money_count' = 'money_count' + $value WHERE 'id' = $sesUser";

    mysqli_query($con, $sq);
?>