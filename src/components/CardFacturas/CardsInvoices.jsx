 import './style/card.css';
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';

 const CardsInvoices = () => {
    return(
        <>
        <div className="card-single">
                    <div className="card-flex">
                        <div className="card-info">
                            <div className="card-head">
                                <span>Facturas</span>
                                <small>Number of visitors</small>
                            </div>
                            <h2 id="valores">17,4567</h2>
                            <small>2% less visitors</small>
                        </div>
                        <div className="card-chart danger">
                        <FontAwesomeIcon icon={faFileInvoice} size="2xl" style={{color: "#74C0FC",}} className="chart" />
                        </div>
                    </div>

                </div>
        
        </>
    )
 }

 export default CardsInvoices