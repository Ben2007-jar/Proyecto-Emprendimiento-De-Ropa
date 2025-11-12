import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navegar = useNavigate();

  const manejarEnvio = (e) => {
    e.preventDefault();
    
    if (usuario && contraseña) {
      alert(`¡Bienvenida ${usuario}! Iniciando sesión...`);
      navegar('/');
    }
  };

  return (
    <main>
      <form onSubmit={manejarEnvio} autoComplete="off">
        <h1 className="textLogin">Login</h1>
        <br />
        <label className="usuario"><strong>Usuario</strong></label><br />
        <input 
          type="text" 
          className="login" 
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          autoComplete="off"
          name="username"
          required
        />  
        <br />
        <label className="contraseña"><strong>Contraseña</strong></label><br />
       <input 
        type="password" 
        className="login" 
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
        autoComplete="new-password"
        name={`password-${Math.random()}`}
        required
        />
        <br />
        <input type="submit" className="enviar" value="Ingresar" />
      </form>
      <div className="registro-link">
        <p>¿No tenés cuenta? <a href="#">Registrate aquí</a></p>
      </div>
    </main>
  );
};

export default Login;