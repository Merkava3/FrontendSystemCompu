import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/login'; 
import Dashboard from './pages/dashboard/Dashboard';
import ClienteForm from './pages/cliente/Cliente';
import UsuarioForm from './pages/usurio/UsuarioForm';
import DispositivoForm from './pages/dispositivo/DispositivoForm';
import ReparacionForm from './pages/reparacion/ReparacionForm';
import ProductoForm from './pages/productos/ProductoForm';
import VentaForm from './pages/ventas/VentaForm';
import ProveedoreForm from './pages/proveedores/ProveedoreForm';
import ComprasForm from './pages/compras/ComprasForm';

function App() {
  return (

    <Router>
    <Routes>
      {/* Ruta para Login */}
      <Route path="/" element={<Login />} />

      {/* Ruta protegida para el Dashboard y otras páginas (por ahora se puede acceder directamente) */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/cliente" element={<ClienteForm />} />
      <Route path="/usuario" element={<UsuarioForm />} />
      <Route path="/dispositivo" element={<DispositivoForm />} />
      <Route path="/reparacion" element={<ReparacionForm />} />
      <Route path="/producto" element={<ProductoForm />} />
      <Route path="/venta" element={<VentaForm />} />
      <Route path="/proveedor" element={<ProveedoreForm />} />
      <Route path="/compras" element={< ComprasForm />} />
      {/* Redirección a Login si la ruta no existe */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Router>
 
  );
}

export default App;