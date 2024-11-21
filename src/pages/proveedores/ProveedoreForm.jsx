import React, { useState, useEffect } from 'react';
import './form/form.css';
import ServicesApi from '../../services/api/ServicesApi';

const ProveedorForm = () => {
  const [formData, setFormData] = useState({
    id_proveedores: '',
    direccion: '',
    estado: 1, // Estado por defecto
    nit: '',
    telefono: '',
  });

  const [proveedores, setProveedores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editId, setEditId] = useState(null);

  const obtenerProveedores = async () => {
    try {
      const service = new ServicesApi({}, 'GetProveedor'); // Cambia la URL según tu API
      const response = await service.getUrl();
      if (response && response.data) {
        setProveedores(response.data);
      } else {
        console.error("No se recibieron datos.");
      }
    } catch (error) {
      console.error("Error al obtener los proveedores:", error);
    }
  };

  useEffect(() => {
    obtenerProveedores();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Verificar si estamos editando o creando un nuevo proveedor
    if (editId) {
      // Si editId está presente, actualizamos el proveedor
      const service = new ServicesApi(formData, 'updateProveedor'); // Cambia la URL según tu API
      await service.PutUrl();
      setEditId(null); // Resetear el ID de edición
    } else {
      // Si no hay editId, creamos un nuevo proveedor
      const service = new ServicesApi(formData, 'saveProveedor'); // Cambia la URL según tu API
      await service.PostUrl();
    }

    // Resetear el formulario después de la operación
    setFormData({
      id_proveedores: '',
      direccion: '',
      estado: 1,
      nit: '',
      telefono: '',
    });
    
    obtenerProveedores();
  };

  const seleccionarProveedor = (proveedor) => {
    setEditId(proveedor.id_proveedores);
    setFormData(proveedor);
  };

  const eliminarProveedor = async (nit) => {
    if (window.confirm("¿Desea eliminar este proveedor?")) {
      const service = new ServicesApi({ nit }, 'deleteProveedor'); // Cambia la URL según tu API
      await service.DeleteUrl();
      obtenerProveedores();
    }
  };

  const filteredProveedores = proveedores.filter(proveedor =>
    proveedor.nit.includes(searchTerm) || proveedor.direccion.includes(searchTerm)
  );

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">       
        <label>
          Dirección:
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          NIT:
          <input
            type="text"
            name="nit"
            value={formData.nit}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Teléfono:
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">{editId ? 'Actualizar' : 'Crear'}</button>
      </form>

      <label>
        Buscar por NIT o Dirección:
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </label>

      <table>
        <thead>
          <tr>
            <th>ID Proveedor</th>
            <th>Dirección</th>
            <th>NIT</th>
            <th>Teléfono</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredProveedores.length > 0 ? (
            filteredProveedores.map((proveedor) => (
              <tr key={proveedor.id_proveedores}>
                <td>{proveedor.id_proveedores}</td>
                <td>{proveedor.direccion}</td>
                <td>{proveedor.nit}</td>
                <td>{proveedor.telefono}</td>
                <td>{proveedor.estado}</td>
                <td>
                  <button onClick={() => seleccionarProveedor(proveedor)}>Editar</button>
                  <button onClick={() => eliminarProveedor(proveedor.nit)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No hay proveedores disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProveedorForm;
