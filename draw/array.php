<?php
$con = mysqli_connect("localhost", "root", "rumcajs", "mechan_card_game");
echo "<script>";
    echo "let tab = [";
    $sq1 = "SELECT * FROM `items` WHERE case_id=1;";
    $result = mysqli_query($con, $sq1);
    while($row = mysqli_fetch_assoc($result)) {
        echo "{name:'";
        echo $row['name'];
        echo "',id:";
        echo $row['id'];
        echo ",chances:";
        echo $row['chances'];
        echo ",rarity:'";
        echo $row['rarity_id'];
        echo "',photo:'";
        echo $row['resource'];
        echo "'},";
    }
    echo "]";
echo "</script>";