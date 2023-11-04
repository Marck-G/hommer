import { Logger } from "@kcram-solutions/logger";
import { InputText } from "primereact/inputtext";
import { useEffect, useRef, useState } from "react";
import urlJoin from "url-join";
import { API } from "../constants";
import axios from "axios";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export function UpdateCommerce({ commerce }) {
    const [country, setCountry] = useState("España")
    const [province, setProvince] = useState("Navarra")
    const [nombre, setNombre] = useState()
    const [localidad, setLocalidad] = useState()
    const logger = new Logger("Actualizar comercio");
    const toast = useRef(null)
    const navigate = useNavigate()

    useEffect(()=>{
        const url = urlJoin(API.host, API.commerce, commerce)
        logger.log("URL:", url)
        axios.get(url).then(r => {
            logger.debug("data:", r.data);
            setCountry(r.data.country);
            setNombre(r.data.nombre);
            setLocalidad(r.data.localidad);
            setProvince(r.data.provincia);
        }).catch(e => {
            logger.warn("ERROR:", e)
            toast.current.show({ severity: 'Error', summary: 'Error', detail: 'No hemos podido encontrar el comercio.', life: 3000 })
            setCountry("");
            setNombre("");
            setLocalidad("");
            setProvince("");
        })
    }, [commerce])
    

    function save(){
        logger.info("Actualizando comercio")
        const url = urlJoin(API.host, API.commerce, commerce)
        
        logger.log("URL:", url)
        const data = {
            nombre: nombre,
            localidad: localidad,
            country: country,
            provincia: province,
        }
        logger.debug("Body:", data)
        axios.patch(url, data).then(res => {
            logger.debug("response:", res.data);
            toast.current.show({ severity: 'success', summary: 'Actualizado', detail: 'El comercio ha sido actualizado con éxito', life: 3000 })
            navigate(-1)
        }).catch(e => {
            logger.error("No se ha actualizado el comercio:", e);
            toast.current.show({ severity: 'Error', summary: 'Error', detail: 'No se ha podido actualizar el comercio.', life: 3000 })

        })
    }

   
    return (<>
        <Toast ref={toast} position="bottom-center" />
        <div className="p-inputgroup" >
            <span className="p-inputgroup-addon">
                Nombre
            </span>
            <InputText value={nombre} onChange={e => setNombre(e.target.value)} id="c-c-name" placeholder="Mercadona" tabIndex={1} />
        </div>
        <div className="p-inputgroup" >
            <span className="p-inputgroup-addon">
                Localidad
            </span>
            <InputText value={localidad} onChange={e => setLocalidad(e.target.value)} id="c-c-Localidad" placeholder="Pamplona" tabIndex={2} />
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
        <Button label="Actualizar" className="update-btn" onClick={save} tabIndex={5} />
    </>)
}