

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Badge } from 'primereact/badge';
import {Logger} from '@kcram-solutions/logger'
import axios from 'axios'
import urlJoin from 'url-join'
import { API } from '../constants';
import { Tag } from 'primereact/tag';
import { DataScroller } from 'primereact/datascroller';
        
export function ProductList({page}){
    const logger = new Logger("Tabla de productos")
    const navigate = useNavigate()
    const [data, setData] = useState(null)
    

    useEffect(()=>{
        let nextPage = page;
        if(!page) nextPage = 1;
        logger.debug("Montando el componente");
        axios.get(urlJoin(API.host, API.product + `?page=${nextPage}&limit=1000`)).then(res => {
            logger.debug("Datos de retorno:", res.data);
            const result = new Array()
            logger.debug("Llamando por el precio más bajo");
            res.data.data.forEach(async row => {
                const product = row._id;
                const response = {...row};
                const price = (await axios.get(urlJoin(API.host, API.prices, "product", product))).data;
                logger.debug(`Precio para ${product}`, price);
                
                response.precio = price ? parseFloat(price).toFixed(2) : "0.00";
                result.push(response);
            })
            async function update(){
                while(res.data.data.length != result.length){
                    await new Promise(r => setTimeout(r, 300));
                }
            }
            update().then(r =>{
                logger.info("Asignamos los productos a la tabla");
                setData(result)
            })
        })
    } ,[page])

    const metadata = (item) =>{
        let pesoStr = item.weight ? `${item.weight} g` : false;
        let volStr = item.volume ?  `${item.volume} mL` : false;
        let unitStr = item.units ?  `${item.units} U.` : false;
        return(<>
            {pesoStr && <Tag value={pesoStr}  />}
                
            {volStr && <Tag value={volStr}  />}
            
            {unitStr && <Tag value={unitStr}  />}
        </>)
    }

    const openProduct = (event) =>{
        logger.debug("Selecionada fila:", event._id)
        navigate("/product/" + event._id)
    }

    const itemTemplate = (row) =>{
        return (<div className='kcs-wrapper' onClick={() => openProduct(row)}>
            <div className="kcs-left">
                <div className="title">
                <h5>{row.nombre} <Badge size="large" severity="info" value={row.quantity} /></h5>
                <small>{row.descripción}</small>
                </div>
                <div className="m-price">
                    {row.precio} &euro;
                </div>
            </div>
            <div className="kcs-center">
            {metadata(row)}
            </div>
            <div className="kcs-rig">
            <small>Code:</small> <br />
                {row.barcode} <br />
                
                
            </div>
        </div>)
    }

    return (<>

        <DataScroller value={data}
         emptyMessage="No hay productos"
         rows={data?.length}
         itemTemplate={itemTemplate}/>

    </>)
}