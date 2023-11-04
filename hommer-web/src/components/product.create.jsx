import { Logger } from "@kcram-solutions/logger";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import urlJoin from "url-join";
import { API } from "../constants";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import axios from "axios";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Messages } from "primereact/messages";
import { Barcode } from "./Barcode.reader";
import { v4 as uuid } from 'uuid'

export function CreateProduct() {
    const logger = new Logger("Crear Producto Form")
    const uploadUrl = urlJoin(API.host, API.product)
    const toast = useRef(null)
    const navigate = useNavigate();

    logger.info("Create URL:", uploadUrl);
    // toast.current.show({ severity: "info", summary: "label", detail: "label", life: 3000 });

    async function save() {
        logger.info("Preparando para crear un producto")
        logger.debug(document.querySelector("#c-p-cantidad"))
        const data = {
            nombre: document.querySelector("#c-p-name").value,
            descripción: document.querySelector("#c-p-desc").value,
            barcode: uuid(),
            weight: document.querySelector("#c-p-gramos").value,
            volume: document.querySelector("#c-p-mili").value,
            quantity: document.querySelector("#c-p-cantidad").value,
            units: document.querySelector("#c-p-unidades").value,
        };
        logger.debug("Datos a crear:", data);
        axios.post(uploadUrl, data).then(e => {
            logger.info("Producto creado")
            toast?.current.show({ severity: 'success', summary: 'Creado', detail: 'El producto ha sido creado con éxito', life: 3000, closable: false })
            logger.debug(e.data)
            navigate("/product/" + e.data._id);
        }).catch(e => {
            logger.error("No se ha creado el producto:", e);
            toast?.current.show({ severity: 'Error', summary: 'Error', detail: 'No se ha podido crear el producto.', life: 3000, closable: false })

        })
    }

    function showCamera() {
        navigator.mediaDevices
            .getUserMedia({ audio: true, video: true })
    }

    return (
        <>
            <Messages ref={toast} />

            <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                    <i className="pi pi-shopping-cart"></i>
                </span>
                <InputText id="c-p-name" placeholder="Nombre del producto" tabIndex={1} />
            </div>

            <div className="row">
                <div className="p-inputgroup slices">
                    <InputText id="c-p-mili" placeholder="Mililitros" tabIndex={2} />
                    <span className="p-inputgroup-addon">
                        mL
                    </span>
                </div>

                <div className="p-inputgroup slices">
                    <InputText id="c-p-gramos" placeholder="Gramos del producto" tabIndex={3} />
                    <span className="p-inputgroup-addon">
                        Gramos
                    </span>
                </div>
                &nbsp;
                <div className="p-inputgroup slices">
                    <InputText className="" id="c-p-unidades" placeholder="Unidades" tabIndex={4} />
                    <span className="p-inputgroup-addon">
                        Unidades
                    </span>
                </div>
            </div>

            <div className="p-inputgroup">
                <InputTextarea id="c-p-desc" placeholder="Descripción" tabIndex={5} />
            </div>

            <div className="row">
                {/* <div className="p-inputgroup slices">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-qrcode"></i>
                    </span>
                    <InputText maxLength={13} id="c-p-cb" placeholder="Código de barras" tabIndex={5} />
                    <span className="p-inputgroup-addon camera" onClick={showCamera}>
                        <i className="pi pi-camera"></i>
                    </span>
                </div> */}
                    <InputNumber
                        buttonLayout="horizontal"
                        showButtons min={0}
                        id="c-p-cantidad" placeholder="Cantidad" tabIndex={6} />

            </div>
            <Button label="Crear" className="update-btn" onClick={save} onKeyUp={e => { if (e.key == "Enter") save() }} tabIndex={7} />
            {/* <Barcode onScan={e => logger.debug(e)} /> */}
        </>
    )
}