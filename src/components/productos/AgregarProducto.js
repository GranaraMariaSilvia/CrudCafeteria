import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom"; //sirve para redireccionar

const AgregarProducto = (props) => {
  const [nombreProducto, setNombreProducto] = useState("");
  const [precioProducto, setPrecioProducto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [error, setError] = useState(false);

  const leerCategoria = (e) => {
    setCategoria(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validar campos
    if (
      nombreProducto.trim() === "" ||
      precioProducto.trim() === "" ||
      categoria === ""
    ) {
      //mostrar cartel del error
      setError(true);
      return;
    }

    setError(false);
    //preparar el objeto que voy a mandar
    const datos = {
      nombreProducto,
      precioProducto,
      categoria,
    };
    try {
      const cabecera = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      };
      const resultado = await fetch(
        "http://localhost:3000/cafeteria",
        cabecera
      );
      console.log(resultado);
      if (resultado.status === 201) {
        Swal.fire(
          "Producto Creado",
          "El producto se creo correctamente",
          "success"
        );
      }

      // recargar la API de productos
      props.setRecargarProductos(true);

      //redireccionar al usuario a otra pagina ej:productos
      props.history.push("/productos");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="d-flex justify-content-center">
      <Form className="w-75 mb-5" onSubmit={handleSubmit}>
        <h1 className="text-center">Agregar Producto</h1>
        {error ? (
          <Alert variant="danger"> Todos los campos son obligatorios</Alert>
        ) : null}

        <Form.Group controlId="nombreProducto">
          <Form.Label>Nombre de Producto *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej:medialunas"
            name="producto"
            onChange={(e) => setNombreProducto(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="precioProducto">
          <Form.Label> Precio</Form.Label>
          <Form.Control
            type="number"
            placeholder=""
            name="precio"
            onChange={(e) => setPrecioProducto(e.target.value)}
          />
        </Form.Group>
        <h3 className="text-center">
          {" "}
          <b>Categoria</b>
        </h3>

        <div className="text-center my-4">
          <Form.Check
            inline
            type="radio"
            label="Bebida caliente"
            value="bebida-caliente"
            name="categoria"
            onChange={leerCategoria}
          />

          <Form.Check
            inline
            type="radio"
            label="Bebida fria"
            value="bebida-fria"
            name="categoria"
            onChange={leerCategoria}
          />

          <Form.Check
            inline
            type="radio"
            label="Dulce"
            value="dulce"
            name="categoria"
            onChange={leerCategoria}
          />

          <Form.Check
            inline
            type="radio"
            label="Salado"
            value="salado"
            name="categoria"
            onChange={leerCategoria}
          />
        </div>

        <Button variant="primary" type="submit" className="w-100 shadow">
          Agregar
        </Button>
      </Form>
    </Container>
  );
};

export default withRouter(AgregarProducto);
