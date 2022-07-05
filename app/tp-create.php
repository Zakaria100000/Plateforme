<?php
// Include config file
require_once "config.php";
require_once "helpers.php";

// Define variables and initialize with empty values
$titre = "";
$enonce = "";
$simulation = "";
$tag = "";
$id_teacher = "";

$titre_err = "";
$enonce_err = "";
$simulation_err = "";
$tag_err = "";
$id_teacher_err = "";


// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
        $titre = trim($_POST["titre"]);
		$enonce = trim($_POST["enonce"]);
		$simulation = trim($_POST["simulation"]);
		$tag = trim($_POST["tag"]);
		$id_teacher = trim($_POST["id_teacher"]);
		

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
          exit('Une erreur est survenu'); //something a user can understand
        }

        $vars = parse_columns('tp', $_POST);
        $stmt = $pdo->prepare("INSERT INTO tp (titre,enonce,simulation,tag,id_teacher) VALUES (?,?,?,?,?)");

        if($stmt->execute([ $titre,$enonce,$simulation,$tag,$id_teacher  ])) {
                $stmt = null;
                header("location: tp-index.php");
            } else{
                echo "Une erreur est survenu. S'il vous plaît réessayer plus tard.";
            }

}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Ajout d'un TP</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
</head>
<?php require_once('navbar.php'); ?>

<body>
    <section class="pt-5">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6 mx-auto">
                    <div class="page-header">
                        <h2>Ajouter un TP</h2>
                    </div>
                    <p>Veuillez remplir ce formulaire et le soumettre pour ajouter un TP à la base de données.</p>
                    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">

                        <div class="form-group">
                            <label>Titre</label>
                            <input type="text" name="titre" maxlength="100" class="form-control"
                                value="<?php echo $titre; ?>">
                            <span class="form-text"><?php echo $titre_err; ?></span>
                        </div>
                        <div class="form-group">
                            <label for="text">Enoncé</label>
                            <input type="text" id="enonce" name="enonce" class="form-control">
                            <?php echo $enonce; ?>
                            <div>
                                <span class="form-text"><?php echo $enonce_err; ?></span>
                            </div>

                            <div class="form-group">
                                <label for="text">Parties</label>
                                <input type="text" id="enonce" name="enonce" name="text" class="form-control">
                                <?php echo $enonce; ?>
                                <div class="form-group">
                                    <label for="text">Questions</label>
                                    <input type="text" id="enonce" name="enonce" name="text" multiple
                                        class="form-control">
                                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js">
                                    </script>
                                    <div class="form-group">
                                        <button id="Add" class="form-control">Ajouter une partie </button> <button
                                            id="Remove" class="form-control">Supprimer
                                            une partie</button>


                                        <div id="textboxDiv" class="form-control"></div>
                                        <script>
                                        $(document).ready(function() {
                                            $("#Add").on("click", function() {
                                                $("#textboxDiv").append(
                                                    "<div><br><input type='text'/><br></div>");
                                            });
                                            $("#Remove").on("click", function() {
                                                $("#textboxDiv").children().last().remove();
                                            });
                                        });
                                        </script>
                                        <?php echo $enonce; ?>
                                        <input type="reset" class="btn btn-success" value="Ajouter une Partie">
                                        <div>
                                            <span class="form-text"><?php echo $enonce_err; ?></span>
                                        </div>



                                        <div class="form-group">
                                            <label for="file">Simulation</label>
                                            <input type="file" id="simulation " name="simulation" multiple
                                                class="form-control" value="<?php echo $simulation; ?>">
                                            <span class="form-text"><?php echo $simulation_err; ?></span>
                                        </div>
                                        <div class="form-group">
                                            <label>Tag</label>
                                            <input type="text" name="tag" maxlength="100" class="form-control"
                                                value="<?php echo $tag; ?>">
                                            <span class="form-text"><?php echo $tag_err; ?></span>
                                        </div>
                                        <div class="form-group">
                                            <label>Enseignant</label>
                                            <select class="form-control" id="id_teacher" name="id_teacher">
                                                <?php
                                        $sql = "SELECT *,id FROM teacher";
                                        $result = mysqli_query($link, $sql);
                                        while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
                                            array_pop($row);
                                            $value = implode(" | ", $row);
                                            if ($row["id"] == $id_teacher){
                                            echo '<option value="' . "$row[id]" . '"selected="selected">' . "$value" . '</option>';
                                            } else {
                                                echo '<option value="' . "$row[id]" . '">' . "$value" . '</option>';
                                        }
                                        }
                                    ?>
                                            </select>
                                            <span class="form-text"><?php echo $id_teacher_err; ?></span>
                                        </div>

                                        <input type="submit" class="btn btn-success" value="Génerer votre PDF">


                                        <input type="submit" class="btn btn-primary" value="Submit">
                                        <a href="tp-index.php" class="btn btn-secondary">Annuler</a>
                    </form>
                </div>
            </div>
        </div>
    </section>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"
        integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous">
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
        integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous">
    </script>
</body>

</html>