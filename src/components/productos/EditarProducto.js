import React, { useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";

const EditarProducto = (props) => {
  //genero los ref
  const nombreProductoRef = useRef("");
  const precioProductoRef = useRef("");

  const [categoria, setCategoria] = useState("");
  const [error, setError] = useState(false);

  const leerCategoria = (e) => {
    setCategoria(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //revisar si cambio la categoria
    let _categoria =
      categoria === "" ? props.productoEncontrado.categoria : categoria;
    console.log(_categoria);
    console.log(nombreProductoRef.current.value);
    console.log(precioProductoRef.current.value);
    //validar los datos
    if (
      nombreProductoRef.current.value.trim() === "" ||
      precioProductoRef.current.value.trim() === "" ||
      _categoria === ""
    ) {
      //mostrar el cartel de error
      setError(true);
      return;
    }
    // aqui ya tengo los datos validados
    setError(false);
    //obtener los nuevos datos del formulario y enviar la modificacion
    const datosEditados = {
      nombreProducto:nombreProductoRef.current.value,
      precioProducto:precioProductoRef.current.value,
      categoria: _categoria,
    };
    console.log(datosEditados)
    // enviar los datos
    try {
      //enviar el request
      const consulta = await fetch(
        `https://crudbackendcafeteria.herokuapp.com/api/cafeteria/${props.productoEncontrado._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datosEditados),
        }
      );
      console.log(consulta);
      if (consulta.status === 200) {
        Swal.fire(
          "Producto Modificado ",
          "El producto se modifico correctamente",
          "success"
        );
        props.setRecargarProductos(true);
        props.history.push("/productos");
      }
    } catch (errorInfo) {
      console.log(errorInfo);
    }
  };

  return (
    <Container className="d-flex justify-content-center">
      <Form className="w-75 mb-5" onSubmit={handleSubmit}>
        <h1 className="text-center">Editar</h1>
        {error ? (
          <Alert variant="danger"> Todos los campos son obligatorios</Alert>
        ) : null}

        <Form.Group controlId="nombreProducto">
          <Form.Label>Nombre de Producto *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej:medialunas"
            name="producto"
            ref={nombreProductoRef}
            defaultValue={props.productoEncontrado.nombreProducto}
          />
        </Form.Group>

        <Form.Group controlId="precioProducto">
          <Form.Label>Precio *</Form.Label>
          <Form.Control
            type="number"
            placeholder=" Ej.$20"
            name="precio"
            ref={precioProductoRef}
            defaultValue={props.productoEncontrado.precioProducto}
          />
        </Form.Group>
        <h3 className="text-center">Categoria</h3>

        <div className="text-center my-4">
          <Form.Check
            inline
            type="radio"
            label="Bebida caliente"
            value="bebida-caliente"
            name="categoria"
            onChange={leerCategoria}
            defaultChecked={
              props.productoEncontrado.categoria === "bebida-caliente"
            }
          />

          <Form.Check
            inline
            type="radio"
            label="Bebida fria"
            value="bebida-fria"
            name="categoria"
            onChange={leerCategoria}
            defaultChecked={
              props.productoEncontrado.categoria === "bebida-fria"
            }
          />

          <Form.Check
            inline
            type="radio"
            label="Dulce"
            value="dulce"
            name="categoria"
            onChange={leerCategoria}
            defaultChecked={props.productoEncontrado.categoria === "dulce"}
          />

          <Form.Check
            inline
            type="radio"
            label="Salado"
            value="salado"
            name="categoria"
            onChange={leerCategoria}
            defaultChecked={props.productoEncontrado.categoria === "salado"}
          />
        </div>

        <Button variant="primary" type="submit" className="w-100 shadow">
          Guardar
        </Button>
      </Form>
    </Container>
  );
};

export default withRouter(EditarProducto);
