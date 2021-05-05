import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import LineaProducto from "./LineaProducto";

const ListaProductos = (props) => {
  return (
    <article className="container my-4">
      <h1 className="text-center my-4">Lista de Productos</h1>
      <ListGroup>
        {props.productosAPI.map((product) => (
          <LineaProducto
            key={product.id}
            product={product}
            setRecargarProductos={props.setRecargarProductos}
          ></LineaProducto>
        ))}
      </ListGroup>
    </article>
  );
};

export default ListaProductos;
