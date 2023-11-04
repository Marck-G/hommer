import { Logger } from "@kcram-solutions/logger";
import { DataScroller } from "primereact/datascroller";
import { useEffect, useState } from "react";
import { API } from "../constants";
import urlJoin from "url-join";
import axios from "axios";
import { Button } from "primereact/button";

export function BarcodeList({product, onChange}){

    const [Data,setData] = useState()
    const [Hidde,setHidde] = useState(true)
    
    const logger = new Logger("Barcode list")
    const retriveBarcodes = async () =>{
        const url = urlJoin(API.host, API.barcode + "?product=" + product)
        logger.log(url)
        const response = await axios.get(url)
        logger.debug("Barcodes:", response.data)
        setData(response.data)
    }

    useEffect(()=>{
        logger.info("Componente cargado")
        retriveBarcodes().then(r => {
            setHidde(false)
        })
    }, [product])

    const remove = (id) => {
        const url = urlJoin(API.host, API.barcode, id)
        logger.log("Remove url:", url)
        axios.delete(url).then(r => {
            logger.debug(r.data)
            if(onChange) onChange()
        })
    }

    const itemTemplate = row =>{
        logger.debug("Row Render:", row)
        return (<div className="barcode-list">
            <div className="left">
            {row.barcode}
            </div>
            <div className="right">
                <Button severity="warning" icon="pi pi-pencil"  /> &nbsp;
                <Button severity="danger" icon="pi pi-trash" onClick= {() => remove(row._id)} />
            </div>
        </div>)
    }

    return (
        <>
            <DataScroller hidden={Hidde} rows={Data?.length} value={Data}
            
             itemTemplate={itemTemplate} />
        </>
    )
}