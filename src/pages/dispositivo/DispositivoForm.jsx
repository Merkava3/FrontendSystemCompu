import React, { useState, useEffect } from 'react';
import './form/form.css';
import ServicesApi from '../../services/api/ServicesApi';

const DispositivoForm = () => {
  const [formData, setFormData] = useState({
    serial_dispositivo: '',
    marca: '',
    tipo: '',
    cargador: '',
    serial_cargador: '',
    modelo: '',
  });

  const [dispositivos, setDispositivos] = useState([]); // Estado para almacenar los dispositivos
  const [searchTerm, setSearchTerm] = useState('');
  const [editId, setEditId] = useState(null);

  // Obtener dispositivos desde la API
  const obtenerDispositivos = async () => {
    try {
      const service = new ServicesApi({}, 'GetDispositivo');
      const response = await service.getUrl();

      console.log('Respuesta de la API:', response); // Verificación de la respuesta

      if (response && response.data) {
        setDispositivos(response.data);
      } else {
        console.error("No se recibieron datos de dispositivos.");
      }
    } catch (error) {
      console.error("Error al obtener los dispositivos:", error);
    }
  };

  // Llamar a obtenerDispositivos cuando el componente se monta
  useEffect(() => {
    obtenerDispositivos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const service = new ServicesApi(formData, 'saveDispositivo');
    await service.PostUrl();
    setFormData({
      serial_dispositivo: '',
      marca: '',
      tipo: '',
      cargador: '',
      serial_cargador: '',
      modelo: '',
    });
    obtenerDispositivos(); // Actualiza la lista de dispositivos
  };

  const seleccionarDispositivo = (dispositivo) => {
    setEditId(dispositivo.serial_dispositivo);
    setFormData(dispositivo);
  };

  const handleChangeEdit = (id, name, value) => {
    setFormData({ ...formData, [name]: value });
    setEditId(id);
  };

  const actualizarDispositivo = async () => {
    const service = new ServicesApi(formData, 'updateDispositivo');
    await service.PutUrl();
    setEditId(null); // Resetear el id de edición
    obtenerDispositivos(); // Actualiza la lista de dispositivos
    setFormData({
      serial_dispositivo: '',
      marca: '',
      tipo: '',
      cargador: '',
      serial_cargador: '',
      modelo: '',
    });
  };

  const eliminarDispositivo = async (serial_dispositivo) => {
    if (window.confirm("¿Desea eliminar este dispositivo?")) {
      const service = new ServicesApi({ serial_dispositivo }, 'deleteDispositivo');
      await service.DeleteUrl();
      obtenerDispositivos(); // Actualiza la lista de dispositivos
    }
  };

  const filteredDispositivos = dispositivos.filter(dispositivo =>
    dispositivo.serial_dispositivo.includes(searchTerm) || dispositivo.modelo.includes(searchTerm)
  );

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <label>
          Serial del dispositivo:
          <input
            type="text"
            name="serial_dispositivo"
            value={formData.serial_dispositivo}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Marca:
          <input
            type="text"
            name="marca"
            value={formData.marca}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Tipo:
          <input
            type="text"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Cargador:
          <select
            name="cargador"
            value={formData.cargador}
            onChange={handleChange}
            required
          >
            <option value="Si">Sí</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Serial del cargador:
          <input
            type="text"
            name="serial_cargador"
            value={formData.serial_cargador}
            onChange={handleChange}
            disabled={formData.cargador === 'No'} // Deshabilita si no hay cargador
          />
        </label>

        <label>
          Modelo:
          <input
            type="text"
            name="modelo"
            value={formData.modelo}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Enviar</button>
        {editId && (
          <button type="button" onClick={actualizarDispositivo}>Actualizar</button>
        )}
      </form>

      <label>
        Buscar por Marca o Modelo:
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </label>

      <table>
        <thead>
          <tr>
            <th>Serial</th>
            <th>Marca</th>
            <th>Tipo</th>
            <th>Cargador</th>
            <th>Serial Cargador</th>
            <th>Modelo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredDispositivos.length > 0 ? (
            filteredDispositivos.map((dispositivo) => (
              <tr key={dispositivo.serial_dispositivo}>
                <td>{dispositivo.serial_dispositivo}</td>
                <td>
                  <input
                    type="text"
                    value={dispositivo.marca}
                    onChange={(e) =>
                      handleChangeEdit(dispositivo.serial_dispositivo, 'marca', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={dispositivo.tipo}
                    onChange={(e) =>
                      handleChangeEdit(dispositivo.serial_dispositivo, 'tipo', e.target.value)
                    }
                  />
                </td>
                <td>
                  <select
                    value={dispositivo.cargador}
                    onChange={(e) =>
                      handleChangeEdit(dispositivo.serial_dispositivo, 'cargador', e.target.value)
                    }
                  >
                    <option value="Si">Sí</option>
                    <option value="No">No</option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    value={dispositivo.serial_cargador}
                    disabled={dispositivo.cargador === 'No'}
                    onChange={(e) =>
                      handleChangeEdit(dispositivo.serial_dispositivo, 'serial_cargador', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={dispositivo.modelo}
                    onChange={(e) =>
                      handleChangeEdit(dispositivo.serial_dispositivo, 'modelo', e.target.value)
                    }
                  />
                </td>
                <td>
                  <button onClick={() => seleccionarDispositivo(dispositivo)}>Editar</button>
                  <button onClick={() => eliminarDispositivo(dispositivo.serial_dispositivo)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No hay dispositivos disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DispositivoForm;
