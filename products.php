<?php 
    require 'conn_products.php';

    //  Functii ajutatoare
    function executaGET($cnx) {
        $articole = [];
        $cda = "SELECT * FROM products";
        if ($rez = mysqli_query($cnx,$cda)) {
            // Se preiau liniile pe rand
            while ($linie = mysqli_fetch_assoc($rez)) {
                $articole[] = $linie;
            }
            // Eliberez memoria ocupata de multimea de selectie 
            mysqli_free_result($rez);
        }
        echo json_encode($articole);
    }  
    
    function executaPOST($cnx) {
        $sir = citeste();
        $name = $sir['name']; 
        $image = $sir['image']; 
        $price = $sir['price']; 
        $availability = $sir['availability'];
        $best_seller = $sir['best_seller'];

        $raspuns = [];
        $stmt = mysqli_prepare($cnx, "INSERT INTO products(name, image, price, availability, best_seller) VALUES (?, ?, ?, ?, ?)");
        mysqli_stmt_bind_param($stmt, 'ssiss', $name, $image, $price, $availability, $best_seller);
        
        if(mysqli_stmt_execute($stmt)) {
            $raspuns[] = ['rezultat' => "OK"];
            $raspuns[] = ['id' => mysqli_stmt_insert_id ($stmt)];
        } else {
            $raspuns[] = ['rezultat' => 'Eroare: ' . mysqli_error($cnx)];
        }
        echo json_encode($raspuns); 
    }
  
    function executaPATCH($cnx) {
        $sir = citeste();
        $id = $sir['id']; 
        $name = $sir['name']; 
        $image = $sir['image']; 
        $price = $sir['price']; 
        $availability = $sir['availability'];
        $best_seller = $sir['best_seller'];

        $raspuns = [];
        $stmt = mysqli_prepare($cnx, "update products SET name=?, image=?, price=?, availability=?, best_seller=? WHERE id=?");
        mysqli_stmt_bind_param($stmt, 'ssissi', $name, $image, $price, $availability, $best_seller, $id);
        if(mysqli_stmt_execute($stmt)) {
            $raspuns[] = ['rezultat' => "OK"];
        } else {
            $raspuns[] = ['rezultat' => 'Eroare: ' . mysqli_error($cnx)];
        }
        echo json_encode($raspuns);
    }

    function executaDELETE($cnx) {
        $sir = citeste();
        $id = $sir['id'];

        $cda = "DELETE FROM products WHERE id = $id";
        $raspuns = [];

        if (mysqli_query($cnx, $cda)) {
            $raspuns[] = ['rezultat' => "OK"];
        } else {
            $raspuns[] = ['rezultat' => 'Eroare: ' . mysqli_error($cnx)];
        }
        echo json_encode($raspuns);
    } 

    function citeste() {
        $json = file_get_contents('php://input');
        // Apoi se creaza sirul asociativ $sir
        $sir = json_decode($json, true); // decodificare json
        // print_r($sir);
        return $sir;
    }
    
    $metoda = $_SERVER['REQUEST_METHOD'];
    switch ($metoda) {
        case 'GET':
            executaGET($cnx);  
            break;
        
        case 'POST':
            executaPOST($cnx);  
            break;
      
        case 'PATCH':
            executaPATCH($cnx);  
            break;

        case 'DELETE':
            executaDELETE($cnx);  
            break;
    }

    mysqli_close($cnx);
?>