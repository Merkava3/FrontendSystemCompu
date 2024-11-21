import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'; 
import './style/login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [shakeEmail, setShakeEmail] = useState(false);
  const [shakePassword, setShakePassword] = useState(false);

  // Aquí obtenemos navigate
  const navigate = useNavigate();

  const checkEmail = () => {
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(pattern)) {
      setEmailError(email !== '' ? 'Ingrese correo válido' : 'Ingrese correo');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset shaking effects
    setShakeEmail(false);
    setShakePassword(false);

    let isValid = true;

    if (email === '') {
      setEmailError('Ingrese correo');
      setShakeEmail(true);
      isValid = false;
    } else {
      if (!checkEmail()) {
        setShakeEmail(true);
        isValid = false;
      }
    }

    if (password === '') {
      setPasswordError('Por favor ingrese contraseña');
      setShakePassword(true);
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      if (email === 'admin@gmail.com' && password === '123') {
        // Simula la redirección a Dashboard
        navigate('/dashboard'); // Usa navigate para redirigir
      } else {
        setEmailError('Error de usuario y/o contraseña');
        setShakeEmail(true);
      }
    }

    // Reset shaking after a short period
    setTimeout(() => {
      setShakeEmail(false);
      setShakePassword(false);
    }, 500);
  };

  return (
    <div className="wrapper">
      <img className="logo" src="../src/utils/img/usuario (1).png" alt="Usuario" />

      <form onSubmit={handleSubmit}>
        <div>
          <div className={`field email ${emailError ? 'error' : ''} ${shakeEmail ? 'shake' : ''}`}>
            <div className="input-area">
              <input
                type="text"
                placeholder="Ingrese Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyUp={checkEmail}
              />
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
              {emailError && <FontAwesomeIcon icon={faExclamationCircle} className="error-icon" />}
            </div>
            {emailError && <div className="error-text errorPassword">{emailError}</div>}
          </div>

          <div className={`field password ${passwordError ? 'error' : ''} ${shakePassword ? 'shake' : ''}`}>
            <div className="input-area">
              <input
                type="password"
                placeholder="Ingrese Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyUp={() => {
                  if (password === '') {
                    setPasswordError('Por favor ingrese contraseña');
                  } else {
                    setPasswordError('');
                  }
                }}
              />
              <FontAwesomeIcon icon={faLock} className="icon" />
              {passwordError && <FontAwesomeIcon icon={faExclamationCircle} className="error-icon" />}
            </div>
            {passwordError && <div className="error-text errorEmail">{passwordError}</div>}
          </div>

          <div className="pass-link">
            <a href="#">Recuperar contraseña?</a>
          </div>

          <input type="submit" value="Ingresar" />
        </div>
      </form>
    </div>
  );
};

export default Login;
