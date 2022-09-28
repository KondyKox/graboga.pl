<?php
// ----------------------------------------------------------------------- Variables
    $login = $_POST['username'];
    $password = $_POST['password'];

    $connect = mysqli_connect('localhost', 'root', '', 'mechan_card_game');
    if (!$connect) {
        die("Nie nawiązano połączenia!");
    }

    $query1 = 'SELECT login FROM users';
    
    $result1 = mysqli_query($connect, $query1);  

// ------------------------------------------------------ Saving data to logins array
    $i = 0;
    while ($row = mysqli_fetch_row($result1)) {
        $logins[$i] = $row;
        $i++;
    }

// ------------------------------------------------------------------------ Functions
    function loginUser($login, $password) {
        for ($i = 0; $i < count($logins); $i++) {
            if ($login != $logins[$j]) {
                
                break;
            }
        }

        $query2 = 'SELECT password FROM users';
        $result2 = mysqli_query($connect, $query2);

        $j = 0;
        while ($row = mysqli_fetch_row($result2)) {
            $passwords[$j] = $row;
            $j++;
        }
    }


    function createUser($login, $password) {
        for ($i = 0; $i < count($logins); $i++) {
            if ($login == $logins[$i]) {
                echo '<script>alert("Istnieje już taki użytkownik! Może spróbuj się zalogować.")</script>';
                break;
            }
        }

        $createQuery = "INSERT INTO users VALUES (null, '$login', '$password')";
        $createResult = mysqli_query($connect, $createQuery);

        echo "<script>alert('Utworzono użytkownika!')</script>"
    }

// ------------------------------------------------------------------- Click on buttons
    if (isset($_POST['signIN']))
        loginUser($login, $password);

    else if (isset($_POST['signUp']))
        createUser($login, $password);


    mysqli_close($connect);
?>