import React, { useState, useEffect } from 'react';
import './form/form.css';
import ServicesApi from '../../services/api/ServicesApi';

const ClienteForm = () => {
  const [formData, setFormData] = useState({
    cedula_cliente: '',
    nombre_cliente: '',
    apellido_cliente: '',
    direccion_cliente: '',
    telefono_cliente: '',
    telefono2_cliente: '',
    correo_cliente: '',
  });

  const [clientes, setClientes] = useState([]); // Estado para almacenar los clientes
  const [searchTerm, setSearchTerm] = useState('');
  const [editId, setEditId] = useState(null);

  // Obtener clientes desde la API
  const obtenerClientes = async () => {
    try {
      const service = new ServicesApi({}, 'GetClient');
      const response = await service.getUrl();
      if (response && response.data) {
        setClientes(response.data);
      } else {
        console.error("No se recibieron datos.");
      }
    } catch (error) {
      console.error("Error al obtener los clientes:", error);
    }
  };

  // Llamar a obtenerClientes cuando el componente se monta
  useEffect(() => {
    obtenerClientes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const service = new ServicesApi(formData, 'saveClient');
    await service.PostUrl();
    setFormData({
      cedula_cliente: '',
      nombre_cliente: '',
      apellido_cliente: '',
      direccion_cliente: '',
      telefono_cliente: '',
      telefono2_cliente: '',
      correo_cliente: '',
    });
    obtenerClientes(); // Actualiza la lista de clientes
  };

  const seleccionarCliente = (cliente) => {
    setEditId(cliente.id_cliente);
    setFormData(cliente);
  };

  const handleChangeEdit = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const actualizarCliente = async () => {
    const service = new ServicesApi(formData, 'updateClient');
    await service.PutUrl();
    setEditId(null); // Resetear el id de edición
    obtenerClientes(); // Actualiza la lista de clientes
    setFormData({ // Limpia el formulario
      cedula_cliente: '',
      nombre_cliente: '',
      apellido_cliente: '',
      direccion_cliente: '',
      telefono_cliente: '',
      telefono2_cliente: '',
      correo_cliente: '',
    });
  };

  const eliminarCliente = async (cedula_cliente) => {
    if (window.confirm("¿Desea eliminar este cliente?")) {
      const service = new ServicesApi({ cedula_cliente }, 'deleteClient');
      await service.DeleteUrl();
      obtenerClientes();
    }
  };

  const filteredClientes = clientes.filter(cliente =>
    cliente.cedula_cliente.includes(searchTerm)
  );

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <label>
          Cédula:
          <input
            type="text"
            name="cedula_cliente"
            value={formData.cedula_cliente}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Nombre:
          <input
            type="text"
            name="nombre_cliente"
            value={formData.nombre_cliente}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Apellido:
          <input
            type="text"
            name="apellido_cliente"
            value={formData.apellido_cliente}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Dirección:
          <input
            type="text"
            name="direccion_cliente"
            value={formData.direccion_cliente}
            onChange={handleChange}
          />
        </label>

        <label>
          Teléfono:
          <input
            type="tel"
            name="telefono_cliente"
            value={formData.telefono_cliente}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Teléfono Alternativo:
          <input
            type="tel"
            name="telefono2_cliente"
            value={formData.telefono2_cliente}
            onChange={handleChange}
          />
        </label>

        <label>
          Correo:
          <input
            type="email"
            name="correo_cliente"
            value={formData.correo_cliente}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Enviar</button>
        {editId && (
          <button type="button" onClick={actualizarCliente}>Actualizar</button>
        )}
      </form>

      <label>
        Buscar por Cédula:
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </label>

      <table>
        <thead>
          <tr>
            <th>ID Cliente</th>
            <th>Cédula</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Teléfono 2</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredClientes.length > 0 ? (
            filteredClientes.map((cliente) => (
              <tr key={cliente.id_cliente}>
                <td>{cliente.id_cliente}</td>
                <td>{cliente.cedula_cliente}</td>
                <td>
                  <input
                    type="text"
                    value={cliente.nombre_cliente}
                    onChange={(e) =>
                      handleChangeEdit('nombre_cliente', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={cliente.apellido_cliente}
                    onChange={(e) =>
                      handleChangeEdit('apellido_cliente', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={cliente.direccion_cliente}
                    onChange={(e) =>
                      handleChangeEdit('direccion_cliente', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="tel"
                    value={cliente.telefono_cliente}
                    onChange={(e) =>
                      handleChangeEdit('telefono_cliente', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="tel"
                    value={cliente.telefono2_cliente}
                    onChange={(e) =>
                      handleChangeEdit('telefono2_cliente', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="email"
                    value={cliente.correo_cliente}
                    onChange={(e) =>
                      handleChangeEdit('correo_cliente', e.target.value)
                    }
                  />
                </td>
                <td>
                  <button onClick={() => seleccionarCliente(cliente)}>Editar</button>
                  <button onClick={() => eliminarCliente(cliente.cedula_cliente)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No hay clientes disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClienteForm;
