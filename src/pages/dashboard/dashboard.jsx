import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBell,
    faCircleUser,
    faScaleBalanced,
    faChartPie,
    faCalendarDays,
    faUser,
    faCartShopping,
    faEnvelope,
    faCircleCheck,
    faBars,
    faMagnifyingGlass,
    faBookmark,
    faCommentSms,
    faFileExport,
    faScrewdriverWrench,
    faUsers,
    faReceipt,
       
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom
import "./style/admin.css";
import { useState, useEffect } from 'react';
import ServicesApi from '../../services/api/ServicesApi';

const Dashboard = () => {

    const [clientCount, setClientCount] = useState(null); 
    const [ventasCount, setVentaCount] = useState(null);
    const[compras, setComprasCount] = useState(null);
    const [clients, setClients] = useState(null);
   

    useEffect(() => {
        const ApiExcute = async () => {           
            const apiCountClient = new ServicesApi({}, "ClientCount");
            const result = await apiCountClient.getUrl();

            const apiCountventa = new ServicesApi({}, "VentasCount");
            const resultventa = await apiCountventa .getUrl();

            const apiCountcompras = new ServicesApi({}, "ComprasCount");
            const resultcompras = await  apiCountcompras.getUrl();

            const apiultimateClient = new ServicesApi({}, "ultimateClient");
            const resultultimateClient = await  apiultimateClient.getUrl();
            setClients(resultultimateClient.data);         
           
            if (result && result.data) {
                setClientCount(result.data.total_clients);
                setVentaCount(resultventa.data.total_ventas);
                setComprasCount(resultcompras.data.total_compras);
               
                console.log("estamos clientes")              
                console.log(clients)              
            } else {
                console.error('Error: La API no devolvió los datos esperados.');
            }
        };

        ApiExcute(); // Llamar solo una vez al montar el componente
    }, []); // Arreglo vacío para ejecutar solo en el montaje del componente
    return (
        <>
            <input type="checkbox" name="" id="sidebar-toggle" />
            <div className="sidebar">
                <div className="sidebar-brand">
                    <div className="brand-flex">
                        <h4>Hola mundo</h4>
                        <div className="brand-icons">
                            <FontAwesomeIcon icon={faBell} className='valor' />
                            <FontAwesomeIcon icon={faCircleUser} className='valor' />
                        </div>
                    </div>
                </div>
                <div className="sidebar-main">
                    <div className="sidebar-user">
                        <img src="img/WhatsApp Image 2021-12-20 at 11.00.43 AM.jpeg" alt="" />
                        <div>
                            <h3>Hola mundo</h3>
                            <span>hola@gmail.com</span>
                        </div>
                    </div>
                    <div className="sidebar-menu">
                        <div className="menu-head">
                            <span>Dashboard</span>
                        </div>
                        <ul>
                            <li>
                                <a href="">
                                    <FontAwesomeIcon icon={faScaleBalanced} className='scalebalance' /> Finance
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <FontAwesomeIcon icon={faChartPie} className='scalebalance' /> Analytics
                                </a>
                            </li>
                        </ul>
                        <div className="menu-head">
                            <span>Application</span>
                        </div>
                        <ul>
                            <li>
                            <Link to="/cliente">                                
                                    <FontAwesomeIcon icon={faCalendarDays} className='scalebalance' /> Cliente
                             
                                </Link>
                            </li>
                            <li>
                                <Link to="/dispositivo"> {/* Enlace para navegar a DispositivoForm */}
                                    <FontAwesomeIcon icon={faUser} className='scalebalance' /> Dispositivo
                                </Link>
                            </li>
                            <li>
                                <Link to="/usuario">                                
                                <FontAwesomeIcon icon={faCartShopping} className='scalebalance' /> Usuario                                
                                </Link>
                            </li>
                            <li>
                            <Link to="/reparacion">                                
                                <FontAwesomeIcon icon={faEnvelope} className='scalebalance' /> Reparacion                               
                                </Link>
                            </li>
                            <li>
                            <Link to="/producto">                                
                                <FontAwesomeIcon icon={faEnvelope} className='scalebalance' /> producto                              
                                </Link>
                            </li>
                            <li>
                            <Link to="/venta">                                
                                <FontAwesomeIcon icon={faEnvelope} className='scalebalance' /> venta                              
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="main-content">
                <header>
                    <div className="menu-toggle">
                        <label htmlFor="sidebar-toggle">
                            <FontAwesomeIcon icon={faBars} />
                        </label>
                    </div>
                    <div className="header-icons">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <FontAwesomeIcon icon={faBookmark} />
                        <FontAwesomeIcon icon={faCommentSms} />
                    </div>
                </header>
                <main>
                    <div className="page-header">
                        <div>
                            <h1>Analytics Dashboard</h1>
                            <small>Monitor</small>
                        </div>
                        <div className="header-actions">
                            <button>
                                <FontAwesomeIcon icon={faFileExport} className='utils' />
                                Export
                            </button>
                            <button>
                                <FontAwesomeIcon icon={faScrewdriverWrench} className='utils' />
                                Settings
                            </button>
                        </div>
                    </div>
                    <div className="cards">
                        <div className="card-single">
                            <div className="card-flex">
                                <div className="card-info">
                                    <div className="card-head">
                                        <span>Clientes</span>
                                        <small>N° clientes</small>
                                    </div>
                                    <h2 id="valores">{clientCount}</h2>
                                    <small>2% less purchase</small>
                                </div>
                                <div className="card-chart success">
                                    <FontAwesomeIcon icon={faUsers} style={{color: "#f49325",}} className='chart' />
                                </div>
                            </div>
                        </div>
                        <div className="card-single">
                            <div className="card-flex">
                                <div className="card-info">
                                    <div className="card-head">
                                        <span>ventas</span>
                                        <small>N° ventas</small>
                                    </div>
                                    <h2 id="valores">{ventasCount}</h2>
                                    <small>ventas totales</small>
                                </div>
                                <div className="card-chart danger">
                                    <FontAwesomeIcon icon={faCartShopping} style={{color: "#FFD43B",}}  className='chart' />
                                </div>
                            </div>
                        </div>
                        <div className="card-single">
                            <div className="card-flex">
                                <div className="card-info">
                                    <div className="card-head">
                                        <span>Compras</span>
                                        <small>N° de compras</small>
                                    </div>
                                    <h2 id="valores">{compras}</h2>
                                    <small>compras totales</small>
                                </div>
                                <div className="card-chart yellow">
                                    <FontAwesomeIcon icon={faReceipt} style={{color: "#63E6BE",}} className='chart' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="jobs">
    <h2>Clientes <small>ver todos los clientes <span className="las la-arrow-right"></span></small></h2>
    <div className="table-responsive">
        <table width="100%">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Cédula</th>
                    <th>Correo</th>
                    <th>Dirección</th>
                    <th>Teléfono</th>
                    <th>Teléfono 2</th>
                </tr>
            </thead>
            <tbody>
                {clients?.map((client) => (
                    <tr key={client.id_cliente}>
                        <td>{client.id_cliente}</td>
                        <td>{client.nombre_cliente}</td>
                        <td>{client.apellido_cliente}</td>
                        <td>{client.cedula_cliente}</td>
                        <td>{client.correo_cliente}</td>
                        <td>{client.direccion_cliente}</td>
                        <td>{client.telefono_cliente}</td>
                        <td>{client.telefono2_cliente}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>

                </main>
            </div>
        </>
    );
};

export default Dashboard;
