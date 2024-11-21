import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import './style/card.css';
import { useState, useEffect } from 'react';
import ServicesApi from '../../services/api/ServicesApi';

const CardClient = () => {
    const [clientCount, setClientCount] = useState(null); // Estado inicial como null

    useEffect(() => {
        const ApiExcute = async () => {
            const requirements = {
                "name": "action"
            };
            const apiCountClient = new ServicesApi(requirements, "ClientCount");
            const result = await apiCountClient.GeneratorUrl();
            
            // Asegurarse de extraer el campo correcto del objeto
            if (result && result.data) {
                setClientCount(result.data.total_clients); // Suponiendo que 'data' es el campo que contiene el número de clientes
            } else {
                console.error('Error: La API no devolvió los datos esperados.');
            }
        };

        ApiExcute(); // Llamar solo una vez al montar el componente
    }, []); // Arreglo vacío para ejecutar solo en el montaje del componente

    return (
        <>
            <div className="card-single">
                <div className="card-flex">
                    <div className="card-info">
                        <div className="card-head">
                            <span>N° clientes</span>
                            <small>Number of purchases</small>
                        </div>
                        {/* Mostrar clientCount o un mensaje de carga */}
                        <h2 id="valores">{clientCount !== null ? `N° ${clientCount}` : 'Cargando...'}</h2>
                        <small>2% less purchase</small>
                    </div>
                    <div className="card-chart success">
                        <FontAwesomeIcon icon={faUserGroup} size="2xl" className="chart" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardClient;

