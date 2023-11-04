import { Logger } from "@kcram-solutions/logger";
import { InputText } from "primereact/inputtext";
import { useRef, useState } from "react";
import urlJoin from "url-join";
import { API } from "../constants";
import axios from "axios";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import {v4 as uuid} from 'uuid'

export function CreateCommerce({ }) {
    const [country, setCountry] = useState("España")
    const [province, setProvince] = useState("Navarra")
    const logger = new Logger("Crear comercio");
    const toast = useRef(null)
    const navigate = useNavigate()


    function save(){
        logger.info("Creando comercio")
        const url = urlJoin(API.host, API.commerce)
        
        logger.log("URL:", url)
        const data = {
            nombre: document.querySelector("#c-c-name").value,
            localidad: document.querySelector("#c-c-Localidad").value,
            country: country,
            provincia: province,
            identificador: uuid()
        }
        logger.debug("Body:", data)
        axios.post(url, data).then(res => {
            logger.debug("response:", res.data);
            toast.current.show({ severity: 'success', summary: 'Creado', detail: 'El comercio ha sido creado con éxito', life: 3000 })
            navigate(-1)
        }).catch(e => {
            logger.error("No se ha creado el comercio:", e);
            toast.current.show({ severity: 'Error', summary: 'Error', detail: 'No se ha podido crear el comercio.', life: 3000 })

        })
    }

   
    return (<>
        <Toast ref={toast} position="bottom-center" />
        <div className="p-inputgroup" >
            <span className="p-inputgroup-addon">
                Nombre
            </span>
            <InputText id="c-c-name" placeholder="Mercadona" tabIndex={1} />
        </div>
        <div className="p-inputgroup" >
            <span className="p-inputgroup-addon">
                Localidad
            </span>
            <InputText id="c-c-Localidad" placeholder="Pamplona" tabIndex={2} />
        </div>
        <div className="p-inputgroup" >
            <span className="p-inputgroup-addon">
                Provincia
            </span>
            <InputText value={province}
                onChange={e => setProvince(e.target.value)} placeholder="Navarra" tabIndex={3} />
        </div>
        <div className="p-inputgroup" >
            <span className="p-inputgroup-addon">
                País
            </span>
            <InputText value={country} onChange={e => setCountry(e.target.value)}
                placeholder="" tabIndex={4} />
        </div>
        <Button label="Crear" className="update-btn" onClick={save} tabIndex={5} />
    </>)
}