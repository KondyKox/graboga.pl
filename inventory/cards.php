<?php 
    session_start();
    $con = mysqli_connect("localhost", "root", "rumcajs", "mechan_card_game");

    $sesUser = $_SESSION['id'];
    $dropId = $_POST['drop_id'];
    $sq = "DELETE FROM 'drops' WHERE 'user_id' = $id AND 'drop_id' = $dropId;";

    mysqli_query($con, $sq);
?>