<?php
    session_start();
    require "../../config.php";

    $sesUser = $_SESSION['id'];
    $skinId = $_POST['skin_id'];
    $value = $_POST['value'];

    $sq = "SELECT money_count FROM users WHERE id = $sesUser;";

    $resul = mysqli_query($link, $sq);
    while($row = mysqli_fetch_assoc($resul)){
    if ($row['money_count'] >= $value) {
        
        $sq1 = "UPDATE users SET money_count = money_count - $value WHERE id = $sesUser;";
        mysqli_query($link, $sq1);

        $transaction = "INSERT INTO transactions (user_id, skin_id) VALUES ($sesUser, $skinId);";
        mysqli_query($link, $transaction);
        

        echo "<script>alert('ZAKUPIONO SKINA!')</script>";
        }
        else 
            echo "<script>alert('ZA MAŁO BOSKICH DUKATÓW!')</script>";
    }
?>