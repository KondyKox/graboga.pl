<?php
    session_start();
    $con = mysqli_connect("localhost", "root", "rumcajs", "mechan_card_game");

    //$money = $_POST['money'];
    $sesUser = $_SESSION['id'];
    $dropID = $_POST['drop_id'];
    $sql = "INSERT INTO `drops`(`item_id`, `user_id`) VALUES (`$dropID`, `$sesUser`)";
    $sq3 = mysqli_query($con, "SELECT `value` FROM `items` WHERE id = $dropID;");
    $money = mysqli_fetch_assoc($sq3)['value'];
    //sq2 = "UPDATE `profiles` SET `money_count` = money_count + $money WHERE user_id = $sesUser;";

    mysqli_query($con, $sql);
    //mysqli_query($con, $sq2);
?>