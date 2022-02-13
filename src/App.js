import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import Product_cards from "./product_cards";
import { Route, Link, Switch, useHistory } from "react-router-dom";
import NotFound from "./notfound";
import Product_form from "./product_form";
import Contact from "./contact";
import "./style/style.css";

export default function App() {
  const [card_list, setCard_list] = useState([]);
  const [modif, setModif] = useState(false);
  // Add "edit" in "states"
  const [edit, setEdit] = useState({
    id: 0,
    price: "",
    name: "",
    availability: "",
    best_seller: "",
    image: ""
  });

  useEffect(() => {
    fetch("https://ottosportfolio.com/products/products.php")
      .then((rezult) => rezult.text())
      .then((productlist) => setCard_list(JSON.parse(productlist)));
  }, [modif]);

  // The delete button has been selected in the table
  const deleteCard = (id) => {
    const dateScript = JSON.stringify({ id: parseInt(id, 10) });
    const config = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: dateScript
    };
    // I'm correcting in the database
    fetch("https://ottosportfolio.com/products/products.php", config).then(() => {
      setModif(!modif); // Modify the variable "modif", so useEffect () is triggered
    });
  };

  // Add the object created in "Product_form" to "card_list"
  const addCard = (elm) => {
    const dateScript = JSON.stringify(elm);
    const config = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: dateScript
    };

    // I'm correcting in the database
    fetch("https://ottosportfolio.com/products/products.php", config).then(() => {
      setModif(!modif); // Modify the variable "modif", so useEffect () is triggered
    });
  };

  const history = useHistory();
  // Function triggered by selecting the "edit_item" button in "ACard"
  const editingCard = (id) => {
    var object = card_list.find((item) => {
      return parseInt(item.id, 10) === parseInt(id, 10);
    });
    if (object) {
      setEdit({
        id: object.id,
        price: object.price,
        name: object.name,
        availability: object.availability,
        best_seller: object.best_seller,
        image: object.image
      });
      history.push("/product_form"); // I impose the path "/ product_form", so I trigger the display of the form
    }
  };

  // Replace in "card_list" the object edited in "Product_form"
  const editCard = (elm) => {
    const dateScript = JSON.stringify(elm);
    const config = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: dateScript
    };

    // I'm correcting in the database
    fetch("https://ottosportfolio.com/products/products.php", config).then(() => {
      setModif(!modif); // Modify the variable "modif", so useEffect () is triggered
    });
    
    // Empty the "edit" object from "states"
    setEdit({});
    history.push("/"); // Force route "/", so the "Product_cards" component will be displayed
  };

  return (
    <Container fluid>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">Products Sales Company</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link as={Link} to="/">
              Products
            </Nav.Link>
            <Nav.Link as={Link} to="/product_form">
              New Product
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route exact path="/">
          <Product_cards cards={card_list} delete_item={deleteCard} edit_item={editingCard} />
        </Route>
        <Route path="/product_form">
          <Product_form deliver={addCard} editing={editCard} obedit={edit} />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Container>
  );
}
