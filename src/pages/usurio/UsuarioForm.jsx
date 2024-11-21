import React, { useState, useEffect } from 'react';
import './form/form.css';
import ServicesApi from '../../services/api/ServicesApi';

const UsuarioForm = () => {
  const [formData, setFormData] = useState({
    nombre_usuario: '',
    apellido_usuario: '',
    correo_usuario: '',
    password: '',
    telefono_usuario: '',
    telefono2_usuario: '',
    direccion: '',
    token: '',
    perfil: '',
  });

  const [usuarios, setUsuarios] = useState([]); // Estado para almacenar los usuarios
  const [searchTerm, setSearchTerm] = useState('');
  const [editId, setEditId] = useState(null);

  // Obtener usuarios desde la API
  const obtenerUsuarios = async () => {
    try {
      const service = new ServicesApi({}, 'GetUser');
      const response = await service.getUrl();
      if (response && response.data) {
        setUsuarios(response.data);
      } else {
        console.error("No se recibieron datos.");
      }
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  // Llamar a obtenerUsuarios cuando el componente se monta
  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const service = new ServicesApi(formData, 'saveUser');
    await service.PostUrl();
    setFormData({
      nombre_usuario: '',
      apellido_usuario: '',
      correo_usuario: '',
      password: '',
      telefono_usuario: '',
      telefono2_usuario: '',
      direccion: '',
      token: '',
      perfil: '',
    });
    obtenerUsuarios(); // Actualiza la lista de usuarios
  };

  const seleccionarUsuario = (usuario) => {
    setEditId(usuario.id_usuario);
    setFormData(usuario);
  };

  const handleChangeEdit = (id, name, value) => {
    setFormData({ ...formData, [name]: value });
    setEditId(id);
  };

  const actualizarUsuario = async () => {
    const service = new ServicesApi(formData, 'updateUser');
    await service.PutUrl();
    setEditId(null); // Resetear el id de edición
    obtenerUsuarios(); // Actualiza la lista de usuarios
    setFormData({ // Limpia el formulario
      nombre_usuario: '',
      apellido_usuario: '',
      correo_usuario: '',
      password: '',
      telefono_usuario: '',
      telefono2_usuario: '',
      direccion: '',
      token: '',
      perfil: '',
    });
  };

  const eliminarUsuario = async (id_usuario) => {
    if (window.confirm("¿Desea eliminar este usuario?")) {
      const service = new ServicesApi({ id_usuario }, 'deleteUser');
      await service.DeleteUrl();
      obtenerUsuarios(); // Actualiza la lista de usuarios
    }
  };

  const filteredUsuarios = usuarios.filter(usuario =>
    usuario.nombre_usuario.includes(searchTerm) || usuario.apellido_usuario.includes(searchTerm)
  );

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <label>
          Nombre:
          <input
            type="text"
            name="nombre_usuario"
            value={formData.nombre_usuario}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Apellido:
          <input
            type="text"
            name="apellido_usuario"
            value={formData.apellido_usuario}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Correo:
          <input
            type="email"
            name="correo_usuario"
            value={formData.correo_usuario}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Teléfono:
          <input
            type="tel"
            name="telefono_usuario"
            value={formData.telefono_usuario}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Teléfono Alternativo:
          <input
            type="tel"
            name="telefono2_usuario"
            value={formData.telefono2_usuario}
            onChange={handleChange}
          />
        </label>

        <label>
          Dirección:
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
          />
        </label>

        <label>
          Token:
          <input
            type="text"
            name="token"
            value={formData.token}
            onChange={handleChange}
          />
        </label>

        <label>
          Perfil:
          <input
            type="text"
            name="perfil"
            value={formData.perfil}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Enviar</button>
        {editId && (
          <button type="button" onClick={actualizarUsuario}>Actualizar</button>
        )}
      </form>

      <label>
        Buscar por Nombre o Apellido:
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </label>

      <table>
        <thead>
          <tr>
            <th>ID Usuario</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Teléfono 2</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsuarios.length > 0 ? (
            filteredUsuarios.map((usuario) => (
              <tr key={usuario.id_usuario}>
                <td>{usuario.id_usuario}</td>
                <td>
                  <input
                    type="text"
                    value={usuario.nombre_usuario}
                    onChange={(e) =>
                      handleChangeEdit(usuario.id_usuario, 'nombre_usuario', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={usuario.apellido_usuario}
                    onChange={(e) =>
                      handleChangeEdit(usuario.id_usuario, 'apellido_usuario', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="email"
                    value={usuario.correo_usuario}
                    onChange={(e) =>
                      handleChangeEdit(usuario.id_usuario, 'correo_usuario', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="tel"
                    value={usuario.telefono_usuario}
                    onChange={(e) =>
                      handleChangeEdit(usuario.id_usuario, 'telefono_usuario', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="tel"
                    value={usuario.telefono2_usuario}
                    onChange={(e) =>
                      handleChangeEdit(usuario.id_usuario, 'telefono2_usuario', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={usuario.direccion}
                    onChange={(e) =>
                      handleChangeEdit(usuario.id_usuario, 'direccion', e.target.value)
                    }
                  />
                </td>
                <td>
                  <button onClick={() => seleccionarUsuario(usuario)}>Editar</button>
                  <button onClick={() => eliminarUsuario(usuario.id_usuario)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No hay usuarios disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsuarioForm;
