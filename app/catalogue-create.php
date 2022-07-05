<?php
// Include config file
require_once "config.php";
require_once "helpers.php";

// Define variables and initialize with empty values
$id = "";
$id_matiere = "";
$_tag = "";

$id_err = "";
$id_matiere_err = "";
$_tag_err = "";


// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
        $id = trim($_POST["id"]);
		$id_matiere = trim($_POST["id_matiere"]);
		$_tag = trim($_POST["_tag"]);
		

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

        $vars = parse_columns('catalogue', $_POST);
        $stmt = $pdo->prepare("INSERT INTO catalogue (id,id_matiere,_tag) VALUES (?,?,?)");

        if($stmt->execute([ $id,$id_matiere,$_tag  ])) {
                $stmt = null;
                header("location: catalogue-index.php");
            } else{
                echo "Something went wrong. Please try again later.";
            }

}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Ajout d'un catalogue</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
</head>
<?php require_once('navbar.php'); ?>
<body>
    <section class="pt-5">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6 mx-auto">
                    <div class="page-header">
                        <h2>Ajouter un catalogue</h2>
                    </div>
                    <p>Veuillez remplir ce formulaire et le soumettre pour ajouter un catalogue à la base de données.</p>
                    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">

                        <div class="form-group">
                                <label>Catalogue</label>
                                    <select class="form-control" id="id" name="id">
                                    <?php
                                        $sql = "SELECT *,id FROM tp";
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
                                <label>Matière </label>
                                    <select class="form-control" id="id_matiere" name="id_matiere">
                                    <?php
                                        $sql = "SELECT *,id FROM matiere";
                                        $result = mysqli_query($link, $sql);
                                        while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
                                            array_pop($row);
                                            $value = implode(" | ", $row);
                                            if ($row["id"] == $id_matiere){
                                            echo '<option value="' . "$row[id]" . '"selected="selected">' . "$value" . '</option>';
                                            } else {
                                                echo '<option value="' . "$row[id]" . '">' . "$value" . '</option>';
                                        }
                                        }
                                    ?>
                                    </select>
                                <span class="form-text"><?php echo $id_matiere_err; ?></span>
                            </div>
						<div class="form-group">
                                <label>Tags</label>
                                <input type="text" name="_tag" maxlength="100"class="form-control" value="<?php echo $_tag; ?>">
                                <span class="form-text"><?php echo $_tag_err; ?></span>
                            </div>

                        <input type="submit" class="btn btn-primary" value="Submit">
                        <a href="catalogue-index.php" class="btn btn-secondary">Annuler</a>
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