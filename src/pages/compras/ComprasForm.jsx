import React, { useState, useEffect } from 'react';
import './form/form.css';
import ServicesApi from '../../services/api/ServicesApi';

const ComprasForm = () => {
  const [formData, setFormData] = useState({
    total_compra: '',
    metodo_pago: '',
    usuario_compras: '',
    compras_proveedor: ''
  });

  const [detallesCompra, setDetallesCompra] = useState([
    { Cantidad_Detalles_compra: '', Precio_Detalles_compra: '', id_compras_Detalles: '', id_producto_compras: '' }
  ]);

  const [compras, setCompras] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCompras, setFilteredCompras] = useState([]);
  const [editId, setEditId] = useState(null);

  const obtenerCompras = async () => {
    try {
      const service = new ServicesApi({}, 'GetCompra');
      const response = await service.getUrl();
      if (response && response.data) {
        setCompras(response.data);
      } else {
        console.error("No se recibieron datos.");
      }
    } catch (error) {
      console.error("Error al obtener las compras:", error);
    }
    console.log(compras)
  };

  useEffect(() => {
    obtenerCompras();
  },[]);

  useEffect(() => {
    const resultadosFiltrados = compras.filter((compra) =>
      compra.id_compras.toString().includes(searchTerm)
    );
    setFilteredCompras(resultadosFiltrados);
  }, [searchTerm, compras]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCompraChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDetalleChange = (index, e) => {
    const { name, value } = e.target;
    const detalles = [...detallesCompra];
    detalles[index][name] = value;
    setDetallesCompra(detalles);
  };

  const agregarDetalle = () => {
    setDetallesCompra([...detallesCompra, { Cantidad_Detalles_compra: '', Precio_Detalles_compra: '', id_compras_Detalles: '', id_producto_compras: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await actualizarCompra();
    } else {
      const service = new ServicesApi(formData, 'saveCompra');
      await service.PostCompras();
    }

    if (!editId) {
      const service = new ServicesApi(detallesCompra, 'saveCompraDetalles');
      await service.PostComprasDetalles();
    }

    setFormData({ total_compra: '', metodo_pago: '', usuario_compras: '', compras_proveedor: '' });
    setDetallesCompra([{ Cantidad_Detalles_compra: '', Precio_Detalles_compra: '', id_compras_Detalles: '', id_producto_compras: '' }]);
    obtenerCompras();
  };

  const seleccionarCompra = (compra) => {
    setEditId(compra.id_compras);
    setFormData({
      total_compra: compra.total_compra,
      metodo_pago: compra.metodo_pago,
      usuario_compras: compra.usuario_compras,
      compras_proveedor: compra.compras_proveedor,
    });
    setDetallesCompra(compra.detalles_compra.map(detalle => ({
      ...detalle,
    })));
  };

  const actualizarCompra = async () => {
    const compraData = { compra: formData, detalles_compra: detallesCompra };
    const service = new ServicesApi(compraData, 'updateCompra');
    await service.PutUrl();
    setEditId(null);
    obtenerCompras();
    setFormData({ total_compra: '', metodo_pago: '', usuario_compras: '', compras_proveedor: '' });
    setDetallesCompra([{ Cantidad_Detalles_compra: '', Precio_Detalles_compra: '', id_compras_Detalles: '', id_producto_compras: '' }]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <label>
          Total Compra:
          <input
            type="number"
            name="total_compra"
            value={formData.total_compra}
            onChange={handleCompraChange}
            required
          />
        </label>

        <label>
          Método de Pago:
          <input
            type="text"
            name="metodo_pago"
            value={formData.metodo_pago}
            onChange={handleCompraChange}
            required
          />
        </label>

        <label>
          ID Usuario:
          <input
            type="number"
            name="usuario_compras"
            value={formData.usuario_compras}
            onChange={handleCompraChange}
            required
          />
        </label>

        <label>
          ID Proveedor:
          <input
            type="number"
            name="compras_proveedor"
            value={formData.compras_proveedor}
            onChange={handleCompraChange}
            required
          />
        </label>

        <h3>Detalles de Compra</h3>
        {detallesCompra.map((detalle, index) => (
          <div key={index} className="detalle-container">
            <label>
              Cantidad:
              <input
                type="number"
                name="Cantidad_Detalles_compra"
                value={detalle.Cantidad_Detalles_compra}
                onChange={(e) => handleDetalleChange(index, e)}
                required
              />
            </label>

            <label>
              Precio:
              <input
                type="number"
                name="Precio_Detalles_compra"
                value={detalle.Precio_Detalles_compra}
                onChange={(e) => handleDetalleChange(index, e)}
                required
              />
            </label>

            <label>
              ID Producto:
              <input
                type="number"
                name="id_producto_compras"
                value={detalle.id_producto_compras}
                onChange={(e) => handleDetalleChange(index, e)}
                required
              />
            </label>
          </div>
        ))}
        <button type="button" onClick={agregarDetalle}>Agregar Detalle</button>
        <button type="submit">{editId ? "Actualizar" : "Enviar"}</button>
      </form>

      <label>
        Buscar por Usuario:
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </label>

      <table>
        <thead>
          <tr>
            <th>ID Compra</th>
            <th>Fecha de Compra</th>
            <th>cantidad</th>
            <th>Nombre Producto</th>
            <th>Correo Usuario</th>
            <th>Categoria</th>
            <th>Nit</th>
            <th>Telefono</th>
            <th>Acciones</th>
            
            
          </tr>
        </thead>
        <tbody>
          {filteredCompras.length > 0 ? (
            filteredCompras.map((compra) => (
              <tr key={compra.id_compras}>
                <td>{compra.id_compras}</td>
                <td>{compra.fecha_compra}</td>
                <td>{compra.cantidad}</td>
                <td>{compra.nombre_producto}</td>
                <td>{compra.correo_usuario}</td>
                <td>{compra.categoria}</td>
                <td>{compra.nit}</td>
                <td>{compra.telefono}</td>
                
                <td>
                  <button onClick={() => seleccionarCompra(compra)}>Editar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No hay compras disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ComprasForm;
