import React, { useState, useEffect } from 'react';
import './form/form.css';
import ServicesApi from '../../services/api/ServicesApi';

const ProductoForm = () => {
  const [formData, setFormData] = useState({
    nombre_producto: '',
    codigo_producto: '',
    precio_compra_producto: '',
    precio_venta_producto: '',
    cantidad_producto: '',
    stock: '',
    detalle_producto: '',
    categoria: '',
  });

  const [productos, setProductos] = useState([]); // Estado para almacenar los productos
  const [searchTerm, setSearchTerm] = useState('');
  const [editId, setEditId] = useState(null);

  // Obtener productos desde la API
  const obtenerProductos = async () => {
    try {
      const service = new ServicesApi({}, 'GetProduct');
      const response = await service.getUrl();
      if (response && response.data) {
        setProductos(response.data);
      } else {
        console.error("No se recibieron datos.");
      }
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  // Llamar a obtenerProductos cuando el componente se monta
  useEffect(() => {
    obtenerProductos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const service = new ServicesApi(formData, 'saveProduct');
    await service.PostUrl();
    setFormData({
      nombre_producto: '',
      codigo_producto: '',
      precio_compra_producto: '',
      precio_venta_producto: '',
      cantidad_producto: '',
      stock: '',
      detalle_producto: '',
      categoria: '',
    });
    obtenerProductos(); // Actualiza la lista de productos
  };

  const seleccionarProducto = (producto) => {
    setEditId(producto.codigo_producto);
    setFormData(producto);
  };

  const handleChangeEdit = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const actualizarProducto = async () => {
    const service = new ServicesApi(formData, 'updateProduct');
    await service.PutUrl();
    setEditId(null); // Resetear el id de edición
    obtenerProductos(); // Actualiza la lista de productos
    setFormData({ // Limpia el formulario
      nombre_producto: '',
      codigo_producto: '',
      precio_compra_producto: '',
      precio_venta_producto: '',
      cantidad_producto: '',
      stock: '',
      detalle_producto: '',
      categoria: '',
    });
  };

  const eliminarProducto = async (codigo_producto) => {
    if (window.confirm("¿Desea eliminar este producto?")) {
      const service = new ServicesApi({ codigo_producto }, 'deleteProduct');
      await service.DeleteUrl();
      obtenerProductos();
    }
  };

  const filteredProductos = productos.filter(producto =>
    producto.nombre_producto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <label>
          Nombre del Producto:
          <input
            type="text"
            name="nombre_producto"
            value={formData.nombre_producto}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Código del Producto:
          <input
            type="text"
            name="codigo_producto"
            value={formData.codigo_producto}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Precio de Compra:
          <input
            type="number"
            name="precio_compra_producto"
            value={formData.precio_compra_producto}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Precio de Venta:
          <input
            type="number"
            name="precio_venta_producto"
            value={formData.precio_venta_producto}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Cantidad:
          <input
            type="number"
            name="cantidad_producto"
            value={formData.cantidad_producto}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Stock:
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
          />
        </label>

        <label>
          Detalle:
          <input
            type="text"
            name="detalle_producto"
            value={formData.detalle_producto}
            onChange={handleChange}
          />
        </label>

        <label>
          Categoría:
          <input
            type="text"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Enviar</button>
        {editId && (
          <button type="button" onClick={actualizarProducto}>Actualizar</button>
        )}
      </form>

      <label>
        Buscar por Nombre del Producto:
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </label>

      <table>
        <thead>
          <tr>
            <th>Código Producto</th>
            <th>Nombre</th>
            <th>Precio de Compra</th>
            <th>Precio de Venta</th>
            <th>Cantidad</th>
            <th>Stock</th>
            <th>Detalle</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredProductos.length > 0 ? (
            filteredProductos.map((producto) => (
              <tr key={producto.codigo_producto}>
                <td>{producto.codigo_producto}</td>
                <td>
                  <input
                    type="text"
                    value={producto.nombre_producto}
                    onChange={(e) =>
                      handleChangeEdit('nombre_producto', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={producto.precio_compra_producto}
                    onChange={(e) =>
                      handleChangeEdit('precio_compra_producto', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={producto.precio_venta_producto}
                    onChange={(e) =>
                      handleChangeEdit('precio_venta_producto', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={producto.cantidad_producto}
                    onChange={(e) =>
                      handleChangeEdit('cantidad_producto', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={producto.stock}
                    onChange={(e) =>
                      handleChangeEdit('stock', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={producto.detalle_producto}
                    onChange={(e) =>
                      handleChangeEdit('detalle_producto', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={producto.categoria}
                    onChange={(e) =>
                      handleChangeEdit('categoria', e.target.value)
                    }
                  />
                </td>
                <td>
                  <button onClick={() => seleccionarProducto(producto)}>Editar</button>
                  <button onClick={() => eliminarProducto(producto.codigo_producto)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No hay productos disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductoForm;
