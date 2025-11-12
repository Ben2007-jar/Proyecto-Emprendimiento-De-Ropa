import React from 'react';

const Ubicacion = () => {
  const horarios = [
    { dia: 'Lunes', horario: '9:00 a 14:00 y 18:00 a 21:00' },
    { dia: 'Martes', horario: '9:00 a 14:00 y 18:00 a 21:00' },
    { dia: 'Miércoles', horario: '9:00 a 14:00 y 18:00 a 21:00' },
    { dia: 'Jueves', horario: '9:00 a 14:00 y 18:00 a 21:00' },
    { dia: 'Viernes', horario: '9:00 a 14:00 y 18:00 a 21:00' },
    { dia: 'Sábados', horario: '17:00 a 22:00' },
    { dia: 'Domingo', horario: 'Cerrado' }
  ];

  return (
    <main>
      <br />
      <div className="ubicacion-contenedor">
        <div className="ubicacion">
          <h1><strong>Ubicación</strong></h1>
          <h2>Lavalle 220 (entre Colon y Mitre) - Orán, Salta</h2>
          <div className="horarios-contenido">
            <h3>Horarios de atención:</h3>
            <ul className="horarios">
              {horarios.map((item, index) => (
                <li key={index} className="horarios-list">
                  {item.dia}: {item.horario}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mapa">
          <iframe 
            width="600" 
            height="600" 
            scrolling="no" 
            src="https://maps.google.com/maps?width=500&amp;height=500&amp;hl=en&amp;q=Lavalle%20220%20Oran%20Salta+(Alma)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            title="Mapa de ubicación"
          />
        </div>
      </div>
    </main>
  );
};

export default Ubicacion;