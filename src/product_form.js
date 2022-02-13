import React, { useState } from "react";
import {Form, Button, Container} from "react-bootstrap";

const Product_form = (props) => {
  const [id, setId] = useState(props.obedit.id);
  const [price, setPrice] = useState(props.obedit.price);
  const [name, setName] = useState(props.obedit.name);
  const [availability, setAvailability] = useState(props.obedit.availability);
  const [best_seller, setBest_seller] = useState(props.obedit.best_seller);
  const [image, setImage] = useState(props.obedit.image);

  const stil = {
    h2: { textAlign: "center" }
  };

  const afterSubmit = (evt) => {
    evt.preventDefault();
    const product_card = { price, name, image, availability, best_seller, id };
    if (id > 0) {
      product_card.id = id;
      props.editing(product_card);
    } else {
      props.deliver(product_card);
    }
    // I empty the form controls
    setPrice("");
    setName("");
    setAvailability("");
    setBest_seller("");
    setImage("");
    setId(0);
  };
  
  const stil2 = {
    width: "750px",
};

  return (
    <Container  style={stil2}>
      <h2 className="mt-4" style={stil.h2}>
        {id > 0 ? "Edit product" : "New product"}
      </h2>
      <hr />
      <Form onSubmit={afterSubmit}>
        <Form.Group>
          <Form.Label>Image:</Form.Label>
          <Form.Control
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Price:</Form.Label>
          <Form.Control
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Availability:</Form.Label>
          <Form.Control
            type="text"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Best seller:</Form.Label>
          <Form.Control
            type="text"
            value={best_seller}
            onChange={(e) => setBest_seller(e.target.value)}
          />
        </Form.Group><br />

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Product_form;