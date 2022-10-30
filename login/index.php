<?php
    session_start();

    if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
        header("location: ../index.php");
        exit;
    }

    require_once "../config.php";

    $username = $password = "";
    $username_err = $password_err = $login_err = "";

    if($_SERVER["REQUEST_METHOD"] == "POST"){

        if(empty(trim($_POST["username"]))){
            $username_err = "Please enter username.";
        } else{
            $username = trim($_POST["username"]);
        }

        if(empty(trim($_POST["password"]))){
            $password_err = "Please enter your password.";
        } else{
            $password = trim($_POST["password"]);
        }
        
        if(empty($username_err) && empty($password_err)){
            $sql = "SELECT id, username, password FROM users WHERE username = ?";
            
            if($stmt = mysqli_prepare($link, $sql)){
                mysqli_stmt_bind_param($stmt, "s", $param_username);
                
                $param_username = $username;
                
                if(mysqli_stmt_execute($stmt)){
                    mysqli_stmt_store_result($stmt);
                    
                    if(mysqli_stmt_num_rows($stmt) == 1){
                        mysqli_stmt_bind_result($stmt, $id, $username, $hashed_password);

                        if(mysqli_stmt_fetch($stmt)){
                            if(password_verify($password, $hashed_password)){
                                session_start();
                                
                                $_SESSION["loggedin"] = true;
                                $_SESSION["id"] = $id;
                                $_SESSION["username"] = $username;                            
                                
                                header("location: ../index.php");
                            } else{
                                $login_err = "Nieprawidłowa nazwa użytkownika lub hasło.";
                            }
                        }
                    } else{
                        $login_err = "Nieprawidłowa nazwa użytkownika lub hasło.";
                    }
                } else{
                    echo "Spróbuj ponownie później";
                }

                // Close statement
                mysqli_stmt_close($stmt);
            }
        }
        
        // Close connection
        mysqli_close($link);
} 
?>


<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="keywords" content="mechan, mechanik, card game, mechan card game">
    <title>MECHAN - The Card Game</title>
    <link rel="icon" href="../img/mechan_logo.png">
    
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="../css/login_style.css">
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
    <nav class="navbar navbar-expand-lg" role="navigation">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse-main">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#"><img src="../img/mechan_logo.png"></a>
            </div>
            <div class="collapse navbar-collapse" id="navbar-collapse-main">
                <ul class="nav navbar-nav navbar-right">
                    <li class="nav-item"><a href="index.php" class="nav-link active">Strona główna</a></li>
                    <li class="nav-item">
                        <?php
                            if(!isset($_SESSION["username"]))
                                echo '<a href="login" class="nav-link"><input type="submit" class="button" value="Rejestracja / Logowanie"></a>';
                            else 
                                echo '<a href="logout" class="nav-link"><input type="submit" class="button" value="Wyloguj"></a>';
                        ?>
                    </li>
                    <li class="nav-item"><a href="https://www.paypal.me/megakoks" target="_blank" class="nav-link">Donate</a></li>
                    <li class="nav-item"><a href="https://github.com/KondyKox/MECHAN-The-Card-Game" target="_blank" class="nav-link">Github</a></li>
                    <li class="nav-item"><a href="contact/" class="nav-link">Kontakt</a></li>
                    <li class="nav-item">
                        <?php
                            if(isset($_SESSION["username"]))
                                echo "Zalogowany: <span style='color: #398AD7'>" . htmlspecialchars($_SESSION["username"]) . "</span>";
                        ?>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

        <?php 
            if(!empty($login_err)){
                echo '<div class="alert alert-danger">' . $login_err . '</div>';
            }        
        ?>

        <div id="login" class="col-sm-6">
            <form action="" method="post">
                <h2>Rejestracja</h2>
                <div class="txtField">
                    <input type="text" name="username" required class="form-control <?php echo (!empty($username_err)) ? 'is-invalid' : ''; ?>" value="<?php echo $username; ?>">
                    <span class="invalid-feedback"><?php echo $username_err; ?></span>
                    <label>Login</label>
                </div>    
                <div class="txtField">
                    <input type="password" name="password" required class="<?php echo (!empty($password_err)) ? 'is-invalid' : ''; ?>" value="<?php echo $password; ?>">
                    <span class="invalid-feedback"><?php echo $password_err; ?></span>
                    <label>Hasło</label>
                </div>
                <br><br>
                <div class="txtField">
                    <input type="submit" class="button" value="Zarejestruj się">
                </div>
                <p style="text-align: center;">Masz już konto? <a href="../login">Zaloguj się tutaj</a>.</p>
            </form> 
        </div>

    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</body>
</html>