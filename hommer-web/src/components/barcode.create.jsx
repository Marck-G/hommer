import { Logger } from "@kcram-solutions/logger";
import { DataScroller } from "primereact/datascroller";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import urlJoin from "url-join";
import { API } from "../constants";
import axios from "axios";
import { Button } from "primereact/button";

export function BarcodeCreate({ product, onCreate }) {
    const [loading, setLoading] = useState(false);
    const logger = new Logger("Barcode create")

    useEffect(() => {
        logger.info("Componente cargado para el producto:", product)

    }, [product])


    const create = () => {
        const barcode = document.querySelector("#bar-barcode").value;
        const producto = document.querySelector("#bar-producto").value;
        const body = {
            producto,
            barcode
        }
        setLoading(true)
        const url = urlJoin(API.host, API.barcode)
        logger.log("URL:", url)
        logger.debug(body)
        axios.post(url, body).then(r => {
            setLoading(false)
            logger.debug(r.data)
            if (onCreate) onCreate()
        })
    }
    function inputCheck(event){
        if(event.code == "Enter") create();
    }
    return (
        <div className="barcode-create">
            <InputText id="bar-producto" className="barcode-data" value={product} readOnly />
            <InputText id="bar-barcode" onKeyDown={inputCheck} tabIndex={0} autoFocus className="barcode-data" placeholder="Código de barras" />
            <Button label="Crear" tabIndex={1} icon="pi pi-plus" onClick={create} loading={loading} />
        </div>
    )
}