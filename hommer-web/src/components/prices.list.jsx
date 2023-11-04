

import { Logger } from '@kcram-solutions/logger';
import { DataScroller } from 'primereact/datascroller';
import { useEffect, useState } from 'react';
import './prices.list.scss'
import { Tag } from 'primereact/tag';

export function ListPrice({data}){
    const [prices, setPrices] = useState(data)
    const logger = new Logger("Lista precios")

    useEffect(() =>{
        logger.debug("Componente montado:", data)
        setPrices(data)
    } ,[data])

    const itemTemplate = (row) => {
        logger.debug("Fila Render",row)
        return (
            <div className="kcs-item">
               <div className="kcs-left">
               <div className="kcs-title">{parseFloat(row.precio).toFixed(2)}  &euro;</div>
                <Tag severity="success" value={row.comercio.nombre} /> <br />
                <small>{row.comercio.localidad}</small>
               </div>
               <div className="kcs-right">
                <small>Creado el:</small> <br />
                <span> {new Date(row.fecha).toLocaleDateString("es-Es")} </span>
               </div>
            </div>
        )
    }

    return (
        <div className='p-l-wrapper'>
            <DataScroller value={prices} 
            emptyMessage="No hay precios para el producto"
            rows={10}
            itemTemplate={itemTemplate}/>
        </div >
    )
}