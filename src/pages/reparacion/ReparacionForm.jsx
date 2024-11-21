import React, { useState, useEffect } from 'react';
import './form/form.css';
import ServicesApi from '../../services/api/ServicesApi';

const ReparacionForm = () => {
  const [formData, setFormData] = useState({
    comentario: '',
    procedimientos: '',
    precio_reparacion: '',
    id_usuario_reparaciones: '',
    id_cliente_reparaciones: '',
    id_dispositivo_reparaciones: '',
    fecha: '', // Nueva columna de fecha
  });

  const [reparaciones, setReparaciones] = useState([]); // Estado para almacenar las reparaciones
  const [searchTerm, setSearchTerm] = useState('');
  const [editId, setEditId] = useState(null);

  // Obtener reparaciones desde la API
  const obtenerReparaciones = async () => {
    try {
      const service = new ServicesApi({}, 'GetReparacion');
      const response = await service.getUrl();

      if (response && response.data) {
        setReparaciones(response.data);
      } else {
        console.error("No se recibieron datos de reparaciones.");
      }
    } catch (error) {
      console.error("Error al obtener las reparaciones:", error);
    }
  };

  // Llamar a obtenerReparaciones cuando el componente se monta
  useEffect(() => {
    obtenerReparaciones();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const service = new ServicesApi(formData, 'saveReparacion');
    await service.PostUrl();
    setFormData({
      comentario: '',
      procedimientos: '',
      precio_reparacion: '',
      id_usuario_reparaciones: '',
      id_cliente_reparaciones: '',
      id_dispositivo_reparaciones: '',
      fecha: '', // Resetear fecha
    });
    obtenerReparaciones(); // Actualiza la lista de reparaciones
  };

  const seleccionarReparacion = (reparacion) => {
    setEditId(reparacion.id);
    setFormData(reparacion);
  };

  const handleChangeEdit = (id, name, value) => {
    setFormData({ ...formData, [name]: value });
    setEditId(id);
  };

  const actualizarReparacion = async () => {
    const service = new ServicesApi(formData, 'updateReparacion');
    await service.PutUrl();
    setEditId(null); // Resetear el id de edición
    obtenerReparaciones(); // Actualiza la lista de reparaciones
    setFormData({
      comentario: '',
      procedimientos: '',
      precio_reparacion: '',
      id_usuario_reparaciones: '',
      id_cliente_reparaciones: '',
      id_dispositivo_reparaciones: '',
      fecha: '', // Resetear fecha
    });
  };

  const eliminarReparacion = async (id) => {
    if (window.confirm("¿Desea eliminar esta reparación?")) {
      const service = new ServicesApi({ id }, 'deleteReparacion');
      await service.DeleteUrl();
      obtenerReparaciones(); // Actualiza la lista de reparaciones
    }
  };

  const filteredReparaciones = reparaciones.filter(reparacion =>
    reparacion.comentario.includes(searchTerm) || reparacion.procedimientos.includes(searchTerm)
  );

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <label>
          Comentario:
          <input
            type="text"
            name="comentario"
            value={formData.comentario}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Procedimientos:
          <input
            type="text"
            name="procedimientos"
            value={formData.procedimientos}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Precio de la reparación:
          <input
            type="number"
            name="precio_reparacion"
            value={formData.precio_reparacion}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          ID Usuario Reparaciones:
          <input
            type="text"
            name="id_usuario_reparaciones"
            value={formData.id_usuario_reparaciones}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          ID Cliente Reparaciones:
          <input
            type="text"
            name="id_cliente_reparaciones"
            value={formData.id_cliente_reparaciones}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          ID Dispositivo Reparaciones:
          <input
            type="text"
            name="id_dispositivo_reparaciones"
            value={formData.id_dispositivo_reparaciones}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Fecha:
          <input
            type="datetime-local"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Enviar</button>
        {editId && (
          <button type="button" onClick={actualizarReparacion}>Actualizar</button>
        )}
      </form>

      <label>
        Buscar por Comentario o Procedimientos:
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </label>

      <table>
        <thead>
          <tr>
            <th>ID Reparación</th>
            <th>Fecha</th>
            <th>Comentario</th>
            <th>Procedimientos</th>
            <th>Precio</th>
            <th>ID Usuario</th>
            <th>ID Cliente</th>
            <th>ID Dispositivo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredReparaciones.length > 0 ? (
            filteredReparaciones.map((reparacion) => (
              <tr key={reparacion.id_reparaciones}>
                <td>{reparacion.id_reparaciones}</td>
                <td>{reparacion.fecha}</td>
                <td>
                  <input
                    type="text"
                    value={reparacion.comentario}
                    onChange={(e) =>
                      handleChangeEdit(reparacion.id_reparaciones, 'comentario', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={reparacion.procedimientos}
                    onChange={(e) =>
                      handleChangeEdit(reparacion.id_reparaciones, 'procedimientos', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={reparacion.precio_reparacion}
                    onChange={(e) =>
                      handleChangeEdit(reparacion.id_reparaciones, 'precio_reparacion', e.target.value)
                    }
                  />
                </td>
                <td>{reparacion.id_usuario_reparaciones}</td>
                <td>{reparacion.id_cliente_reparaciones}</td>
                <td>{reparacion.id_dispositivo_reparaciones}</td>
                <td>
                  <button onClick={() => seleccionarReparacion(reparacion)}>Editar</button>
                  <button onClick={() => eliminarReparacion(reparacion.id_reparaciones)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No hay reparaciones disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReparacionForm;
