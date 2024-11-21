import React, { useState, useEffect } from 'react';
import './form/form.css';
import ServicesApi from '../../services/api/ServicesApi';

const VentaForm = () => {
  const [formData, setFormData] = useState({
    usuario_venta: '',
    id_cliente_venta: '',
    total_venta: '',
    estado_venta: ''
  });

  const [detallesVentas, setDetallesVentas] = useState([
    { cantidad_detalles_ventas: '', precio_detalles_ventas: '', venta_detalles_ventas: 4, producto_detalles_ventas: '' }
  ]);

  const [ventas, setVentas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVentas, setFilteredVentas] = useState([]);
  const [editId, setEditId] = useState(null);

  const obtenerVentas = async () => {
    try {
      const service = new ServicesApi({}, 'GetVenta');
      const response = await service.getUrl();
      if (response && response.data) {
        setVentas(response.data);
      } else {
        console.error("No se recibieron datos.");
      }
    } catch (error) {
      console.error("Error al obtener las ventas:", error);
    }
  };

  useEffect(() => {
    obtenerVentas();
  }, []);

  useEffect(() => {
    const resultadosFiltrados = ventas.filter((venta) =>
      (venta.cedula_cliente ? venta.cedula_cliente.toString().includes(searchTerm) : false) ||
      (venta.correo_cliente ? venta.correo_cliente.toLowerCase().includes(searchTerm.toLowerCase()) : false)
    );
    setFilteredVentas(resultadosFiltrados);
  }, [searchTerm, ventas]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleVentaChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDetalleChange = (index, e) => {
    const { name, value } = e.target;
    const detalles = [...detallesVentas];
    detalles[index][name] = value;
    setDetallesVentas(detalles);
  };

  const agregarDetalle = () => {
    setDetallesVentas([...detallesVentas, { venta_detalles_ventas: 4, cantidad_detalles_ventas: '', precio_detalles_ventas: '', producto_detalles_ventas: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Enviar la venta
    if (editId) {
      await actualizarVenta();
    } else {
      const service = new ServicesApi(formData, 'saveVenta');
      await service.PostVentas();
    }

    // Enviar los detalles de la venta
    if (editId) {
      await actualizarVenta();
    } else {
      const service = new ServicesApi(detallesVentas, 'saveVentaDetalles');
      await service.PostVentasDetalles();
    }

    // Reiniciar el formulario
    setFormData({ usuario_venta: '', id_cliente_venta: '', total_venta: '', estado_venta: '' });
    setDetallesVentas([{ cantidad_detalles_ventas: '', precio_detalles_ventas: '', venta_detalles_ventas: 4, producto_detalles_ventas: '' }]);
    obtenerVentas(); // Actualiza la lista de ventas
  };

  const seleccionarVenta = (venta) => {
    setEditId(venta.id_venta);
    setFormData({
      id_venta: venta.id_venta,
      id_cliente_venta: venta.id_cliente_venta,
      total_venta: venta.total_venta,
      estado_venta: venta.estado_venta,
    });
    setDetallesVentas(venta.detalles_ventas.map(detalle => ({
      ...detalle,
      venta_detalles_ventas: detalle.venta_detalles_ventas || 4 // Asignar un valor por defecto si es necesario
    })));
  };

  const actualizarVenta = async () => {
    const ventaData = { venta: formData, detalles_ventas: detallesVentas };
    const service = new ServicesApi(ventaData, 'updateVenta');
    await service.PutUrl();
    setEditId(null);
    obtenerVentas();
    setFormData({ usuario_venta: '', id_cliente_venta: '', total_venta: '', estado_venta: '' });
    setDetallesVentas([{ cantidad_detalles_ventas: '', precio_detalles_ventas: '', venta_detalles_ventas: 4, producto_detalles_ventas: '' }]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <label>
          ID Usuario:
          <input
            type="number"
            name="usuario_venta"
            value={formData.usuario_venta}
            onChange={handleVentaChange}
            required
          />
        </label>

        <label>
          ID Cliente Venta:
          <input
            type="text"
            name="id_cliente_venta" 
            value={formData.id_cliente_venta} 
            onChange={handleVentaChange}
            required
          />
        </label>

        <label>
          Total Venta:
          <input
            type="number"
            name="total_venta"
            value={formData.total_venta}
            onChange={handleVentaChange}
            required
          />
        </label>

        <label>
          Estado Venta:
          <input
            type="number"
            name="estado_venta"
            value={formData.estado_venta}
            onChange={handleVentaChange}
            required
          />
        </label>

        <h3>Detalles de Venta</h3>
        {detallesVentas.map((venta, index) => (
          <div key={index} className="detalle-container">
            <label>
              Cantidad:
              <input
                type="number"
                name="cantidad_detalles_ventas"
                value={venta.cantidad_detalles_ventas}
                onChange={(e) => handleDetalleChange(index, e)}
                required
              />
            </label>

            <label>
              Precio:
              <input
                type="number"
                name="precio_detalles_ventas"
                value={venta.precio_detalles_ventas}
                onChange={(e) => handleDetalleChange(index, e)}
                required
              />
            </label>

            <label>
              ID Producto:
              <input
                type="number"
                name="producto_detalles_ventas"
                value={venta.producto_detalles_ventas}
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
        Buscar por Usuario o Cliente:
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </label>

      <table>
        <thead>
          <tr>
            <th>ID Venta detalles</th>
            <th>Cédula Cliente</th>
            <th>Nombre Cliente</th>
            <th>Apellido Cliente</th>
            <th>Dirección Cliente</th>
            <th>Correo Cliente</th>
            <th>Fecha Detalles Ventas</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Nombre Producto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredVentas.length > 0 ? (
            filteredVentas.map((venta) => (
              <tr key={venta.id_detalles_ventas}>
                <td>{venta.id_detalles_ventas}</td>
                <td>{venta.cedula_cliente}</td>
                <td>{venta.nombre_cliente}</td>
                <td>{venta.apellido_cliente}</td>
                <td>{venta.direccion_cliente}</td>
                <td>{venta.correo_cliente}</td>
                <td>{new Date(venta.fecha_detalles_ventas).toLocaleDateString()}</td>
                <td>{venta.cantidad_detalles_ventas}</td>
                <td>{venta.precio_detalles_ventas}</td>
                <td>{venta.nombre_producto}</td>
                <td>
                  <button onClick={() => seleccionarVenta(venta)}>Editar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11">No hay ventas disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VentaForm;
