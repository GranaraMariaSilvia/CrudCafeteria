import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const LineaProducto = (props) => {
  const eliminarProducto = (id) => {
    console.log(id);

    Swal.fire({
      title: "¿Estas seguro de eliminar el producto?",
      text: "No puedes recuperar un producto eliminado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then(async (result) => {
      if (result.value) {
        // aqui elimino realmente al producto

        try {
          const resultado = await fetch(
            `mongodb+srv://mariasilvia:buscandoaromeo@cluster0.ne88u.mongodb.net/test/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(resultado);
          if (resultado.status === 200) {
            Swal.fire(
              "Producto eliminado",
              "producto correctamente eliminado",
              "success"
            );
          }

          // recargar la lista de productos
          props.setRecargarProductos(true);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <div>
      <ListGroup.Item>
        <p>
          {props.product.nombreProducto}{" "}
          <span> ${props.product.precioProducto}</span>
      

        <Link
          className=" btn btn-secondary float-right my-2"
          to={`/productos/editar/${props.product._id}`}
        >
         
          <FontAwesomeIcon icon={faEdit} />
        </Link>

        <Button
          variant="primary"
          className="float-right my-2 mr-2"
          
          onClick={() => eliminarProducto(props.product._id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
        </p>
      </ListGroup.Item>
    </div>
  );
};

export default LineaProducto;
