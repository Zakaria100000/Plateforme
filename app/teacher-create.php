<?php
// Include config file
require_once "config.php";
require_once "helpers.php";

// Define variables and initialize with empty values
$id = "";
$firstname = "";
$lastname = "";
$username = "";
$password = "";
$role = "";

$id_err = "";
$firstname_err = "";
$lastname_err = "";
$username_err = "";
$password_err = "";
$role_err = "";


// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
        $id = trim($_POST["id"]);
		$firstname = trim($_POST["firstname"]);
		$lastname = trim($_POST["lastname"]);
		$username = trim($_POST["username"]);
		$password = trim($_POST["password"]);
		$role = trim($_POST["role"]);
		

        $dsn = "mysql:host=$db_server;dbname=$db_name;charset=utf8mb4";
        $options = [
          PDO::ATTR_EMULATE_PREPARES   => false, // turn off emulation mode for "real" prepared statements
          PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, //turn on errors in the form of exceptions
          PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, //make the default fetch be an associative array
        ];
        try {
          $pdo = new PDO($dsn, $db_user, $db_password, $options);
        } catch (Exception $e) {
          error_log($e->getMessage());
          exit('Something weird happened'); //something a user can understand
        }

        $vars = parse_columns('teacher', $_POST);
        $stmt = $pdo->prepare("INSERT INTO teacher (id,firstname,lastname,username,password,role) VALUES (?,?,?,?,?,?)");

        if($stmt->execute([ $id,$firstname,$lastname,$username,$password,$role  ])) {
                $stmt = null;
                header("location: teacher-index.php");
            } else{
                echo "Something went wrong. Please try again later.";
            }

}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Ajout d'un enseignant</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
</head>
<?php require_once('navbar.php'); ?>
<body>
    <section class="pt-5">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6 mx-auto">
                    <div class="page-header">
                        <h2>Ajouter un enseignant
                        </h2>
                    </div>
                    <p>Veuillez remplir ce formulaire et le soumettre pour ajouter un enseignant à la base de données.</p>
                    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">

                        <div class="form-group">
                                <label>Enseignant</label>
                                    <select class="form-control" id="id" name="id">
                                    <?php
                                        $sql = "SELECT *,id FROM user";
                                        $result = mysqli_query($link, $sql);
                                        while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
                                            array_pop($row);
                                            $value = implode(" | ", $row);
                                            if ($row["id"] == $id){
                                            echo '<option value="' . "$row[id]" . '"selected="selected">' . "$value" . '</option>';
                                            } else {
                                                echo '<option value="' . "$row[id]" . '">' . "$value" . '</option>';
                                        }
                                        }
                                    ?>
                                    </select>
                                <span class="form-text"><?php echo $id_err; ?></span>
                            </div>
						<div class="form-group">
                                <label>Nom</label>
                                <input type="text" name="firstname" maxlength="50"class="form-control" value="<?php echo $firstname; ?>">
                                <span class="form-text"><?php echo $firstname_err; ?></span>
                            </div>
						<div class="form-group">
                                <label>Prénom</label>
                                <input type="text" name="lastname" maxlength="50"class="form-control" value="<?php echo $lastname; ?>">
                                <span class="form-text"><?php echo $lastname_err; ?></span>
                            </div>
						<div class="form-group">
                                <label>Nom d'utilisateur</label>
                                <input type="text" name="username" maxlength="50"class="form-control" value="<?php echo $username; ?>">
                                <span class="form-text"><?php echo $username_err; ?></span>
                            </div>
						<div class="form-group">
                                <label>Mot de passe </label>
                                <input type="text" name="password" maxlength="50"class="form-control" value="<?php echo $password; ?>">
                                <span class="form-text"><?php echo $password_err; ?></span>
                            </div>
						<div class="form-group">
                                <label>Role </label>
                                <input type="text" name="role" maxlength="50"class="form-control" value="<?php echo $role; ?>">
                                <span class="form-text"><?php echo $role_err; ?></span>
                            </div>

                        <input type="submit" class="btn btn-primary" value="Submit">
                        <a href="teacher-index.php" class="btn btn-secondary">Cancel</a>
                    </form>
                </div>
            </div>
        </div>
    </section>
<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
</body>
</html>