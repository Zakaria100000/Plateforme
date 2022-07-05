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
if(isset($_POST["id_matiere"]) && !empty($_POST["id_matiere"])){
    // Get hidden input value
    $id_matiere = $_POST["id_matiere"];

    $id = trim($_POST["id"]);
		$id_matiere = trim($_POST["id_matiere"]);
		$_tag = trim($_POST["_tag"]);
		

    // Prepare an update statement
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
        exit('Something weird happened');
    }

    $vars = parse_columns('catalogue', $_POST);
    $stmt = $pdo->prepare("UPDATE catalogue SET id=?,id_matiere=?,_tag=? WHERE id_matiere=?");

    if(!$stmt->execute([ $id,$id_matiere,$_tag,$id_matiere  ])) {
        echo "Something went wrong. Please try again later.";
        header("location: error.php");
    } else {
        $stmt = null;
        header("location: catalogue-read.php?id_matiere=$id_matiere");
    }
} else {
    // Check existence of id parameter before processing further
	$_GET["id_matiere"] = trim($_GET["id_matiere"]);
    if(isset($_GET["id_matiere"]) && !empty($_GET["id_matiere"])){
        // Get URL parameter
        $id_matiere =  trim($_GET["id_matiere"]);

        // Prepare a select statement
        $sql = "SELECT * FROM catalogue WHERE id_matiere = ?";
        if($stmt = mysqli_prepare($link, $sql)){
            // Set parameters
            $param_id = $id_matiere;

            // Bind variables to the prepared statement as parameters
			if (is_int($param_id)) $__vartype = "i";
			elseif (is_string($param_id)) $__vartype = "s";
			elseif (is_numeric($param_id)) $__vartype = "d";
			else $__vartype = "b"; // blob
			mysqli_stmt_bind_param($stmt, $__vartype, $param_id);

            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                $result = mysqli_stmt_get_result($stmt);

                if(mysqli_num_rows($result) == 1){
                    /* Fetch result row as an associative array. Since the result set
                    contains only one row, we don't need to use while loop */
                    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);

                    // Retrieve individual field value

                    $id = htmlspecialchars($row["id"]);
					$id_matiere = htmlspecialchars($row["id_matiere"]);
					$_tag = htmlspecialchars($row["_tag"]);
					

                } else{
                    // URL doesn't contain valid id. Redirect to error page
                    header("location: error.php");
                    exit();
                }

            } else{
                echo "Oops! Something went wrong. Please try again later.<br>".$stmt->error;
            }
        }

        // Close statement
        mysqli_stmt_close($stmt);

    }  else{
        // URL doesn't contain id parameter. Redirect to error page
        header("location: error.php");
        exit();
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Update Record</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
</head>
<?php require_once('navbar.php'); ?>
<body>
    <section class="pt-5">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6 mx-auto">
                    <div class="page-header">
                        <h2>Update Record</h2>
                    </div>
                    <p>Please edit the input values and submit to update the record.</p>
                    <form action="<?php echo htmlspecialchars(basename($_SERVER['REQUEST_URI'])); ?>" method="post">

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

                        <input type="hidden" name="id_matiere" value="<?php echo $id_matiere; ?>"/>
                        <input type="submit" class="btn btn-primary" value="Submit">
                        <a href="catalogue-index.php" class="btn btn-secondary">Cancel</a>
                    </form>
                </div>
            </div>
        </div>
    </section>
</body>
</html>
