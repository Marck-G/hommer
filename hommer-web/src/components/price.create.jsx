import { useEffect, useState } from "react";
import urlJoin from "url-join";
import { API } from "../constants";
import { Dropdown } from 'primereact/dropdown';
import { Logger } from "@kcram-solutions/logger";
import axios from "axios";
import { Chip } from 'primereact/chip';
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";


export function CreatePrice({ productId, onHide, onCreated, onError }) {
    const [comercios, setComercios] = useState(null)
    const [comercio, setComercio] = useState();
    const logger = new Logger("Crear precio");
    const [descuento, setDescuento] = useState(false);

    const filterEvent = async (e) => {
        let filter = e.filter;
        logger.debug("Filtro de búsqueda:", filter);
        filter = encodeURIComponent(filter);
        logger.debug("Filtro codificado:", filter);
        const url = urlJoin(API.host, API.commerce, `search?q=${filter}`)
        logger.log("URL:", url)
        const result = await axios.get(url);
        logger.debug(result.data)
        setComercios(result.data)
    }

    const itemTemplate = (option) => {
        return (
            <div>
                {option.nombre} - {option.localidad}
                <br />
                <small>{option.provincia}</small>
            </div>
        )
    }

    const selectedItemTemplate = (option, props) => {
        logger.debug(option)
        if (option)
            return (
                <>
                    {option.nombre} - {option.localidad}
                </>
            )
        return <span>{props.placeholder}</span>
    }


    useEffect(() => {
        const url = urlJoin(API.host, API.commerce + "?limit=100");
        axios.get(url).then(res => {
            logger.debug(res.data)
            setComercios(res.data.data)
        }).catch(e => {
            logger.warn("Error:", e)
        })
    }, [productId]);

    const save = () => {
        logger.info("Evento de guardado")
        logger.debug(comercio)
        const precio = document.querySelector("#p-p-precio").value
        logger.debug("Precio:", precio)
        const data = {
            producto: productId,
            comercio: comercio,
            precio,
            descuento: descuento,
            fecha: new Date().toISOString()
        };

        const url = urlJoin(API.host, API.prices)
        axios.post(url, data).then(r => {
            logger.log(r.data)
            if (onCreated) {
                onCreated(r.data)
                if (onHide)
                    onHide()
            }
        }).catch(e => {
            if (onError)
                onError(e)
        })
    }

    return (
        <>
            <Dropdown options={comercios}
                tabIndex={1}
                className="dp-comercios"
                value={comercio}
                style={{ width: "100%" }}
                onChange={e => { logger.debug("Seleccion:", e.target); setComercio(e.target.value) }}
                itemTemplate={itemTemplate}
                valueTemplate={selectedItemTemplate}
                placeholder="Selecciona el comercio"
                optionLabel="nombre" optionValue="_id" filter onFilter={filterEvent} />
            <div className="p-inputgroup price-input">
                <span className="p-inputgroup-addon ">
                    <i className="pi pi-euro"></i>
                </span>
                <InputText maxLength={13} keyfilter="money" id="p-p-precio" placeholder="10.00" tabIndex={2} />

            </div>
            <div className="p-inputgroup price-input">
                <span className="p-inputgroup-addon ">
                    Descuento
                </span>
                <InputText maxLength={13} keyfilter="int" placeholder="30" tabIndex={3} />
                <span className="p-inputgroup-addon ">
                    <i className="pi pi-percentage"></i>
                </span>

            </div>
            <Button label="Crear" onClick={save} tabIndex={4} />
        </>
    )
}