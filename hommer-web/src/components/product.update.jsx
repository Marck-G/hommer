import { Logger } from "@kcram-solutions/logger";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import urlJoin from "url-join";
import { API } from "../constants";
import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import axios from "axios";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Messages } from "primereact/messages";
import { ListPrice } from "./prices.list";
import { ChartPrice } from "./charts/price.chart";
import { ChartPricePerCommerce } from "./charts/comerce.price.chart";
import { BarcodeList } from "./barcode.list";
import { BarcodeCreate } from "./barcode.create";
import { Panel } from "primereact/panel";
import { useNavigate } from "react-router-dom";


export function UpdateProduct({ product, onNewPrice, onNewBarcode }) {
    const logger = new Logger("Actualizar Producto Form")
    const uploadUrl = urlJoin(API.host, API.product, product)
    const toast = useRef(null)
    const navigate = useNavigate()
    const [nombre, setNombre] = useState("")
    const [desc, setDesc] = useState("")
    const [barcode, setBarcode] = useState(null);
    const [weight, setWeight] = useState(null)
    const [volume, setVolume] = useState(null)
    const [quantity, setQuantity] = useState(null)
    const [units, setUnits] = useState(null)
    const [prices, setPrices] = useState([])
    const [showChart, setShowChart] = useState(false)


    logger.info("Upload URL:", uploadUrl);



    useEffect(() => {
        logger.info("Product ID:", product);
        const getUrl = urlJoin(API.host, API.product, product)
        logger.debug("Get URL:", getUrl)
        axios.get(getUrl).then(res => {
            logger.debug("Datos de peticion:", res.data)
            const data = res.data
            setNombre(data.nombre)
            setDesc(data.descripción)
            setBarcode(data.barcode)
            setQuantity(data.quantity)
            setWeight(data.weight)
            setVolume(data.volume)
            setUnits(data.units)
            const pricesUlr = urlJoin(API.host, API.prices, "list", product)
            logger.debug("Prices url:", pricesUlr)
            axios.get(pricesUlr).then(res => {
                logger.debug("Precios de peticion:", res.data)
                const pricesArr = new Array();
                async function fillCommerce() {
                    logger.info("Bucle para comercios")
                    for (let i = 0, p = res.data[i]; i < res.data.length; i++, p = res.data[i]) {
                        logger.debug("Precio:", p)
                        const url = urlJoin(API.host, API.commerce, p.comercio)
                        logger.debug("URL comercio:", url)
                        const dataObjt = await axios.get(url)
                        const body = dataObjt.data;
                        logger.debug("Comercio de api:", body)
                        const row = { ...p }
                        row.comercio = body
                        pricesArr.push(row)
                    }
                }
                logger.info("Buscamos los comercios")
                fillCommerce().then(r => {
                    logger.debug("Precios con comercios:", pricesArr)
                    setPrices(pricesArr)
                })
            })
        })

        setTimeout(() => { setShowChart(true) }, 1300)


    }, [product])

    async function update() {
        logger.info("Preparando para actualizar producto")
        const data = {
            nombre: nombre,
            descripción: desc,
            barcode,
            weight,
            volume,
            quantity,
            units
        };
        logger.debug("Datos a guardar:", data);
        axios.patch(uploadUrl, data).then(e => {
            logger.info("Producto Actualizado")
            toast.current.clear();
            toast.current.show({ severity: 'success', summary: 'Actualizado', detail: 'El producto ha sido actualizado con éxito', life: 3000, closable: false })
            logger.debug(e.data)
        }).catch(e => {
            logger.error("No se ha modificado el producto:", e);
            toast.current.clear();
            toast.current.show({ severity: 'Error', summary: 'Error', detail: 'No se ha podido modificar el producto.', life: 3000, closable: false })

        })
    }

    function newPrice() {
        if (onNewPrice) onNewPrice()
    }

    function newBarcode() {
        if (onNewBarcode) onNewBarcode()
    }


    const priceTemplate = (options) => {
        const toggleIcon = options.collapsed ? 'pi pi-chevron-down' : 'pi pi-chevron-up';

        return (<div className="kcs-panel-price">
            <div className="kcs-left">
                <span className={options.togglerClassName} id="panle-btl" onClick={options.onTogglerClick}>
                    <span className={toggleIcon}></span>
                </span>
                <span className="title">Precios</span>
            </div>
            <div className="kcs-right">
                <Button severity="success" onClick={newPrice}><i className="pi pi-plus"></i></Button>
            </div>
        </div>)
    }

    const barcodeTemplate = (options) => {
        const toggleIcon = options.collapsed ? 'pi pi-chevron-down' : 'pi pi-chevron-up';
        return (
            <div className="kcs-panel-price">
                <div className="left">
                    <span className={options.togglerClassName} onClick={options.onTogglerClick}>
                        <span className={toggleIcon}></span>
                    </span>
                    <span className="title">Códigos de barras</span>
                </div>
                <Button severity="success" onClick={newBarcode}><i className="pi pi-plus"></i> </Button>
            </div>
        )
    }

    return (
        <>
            <br />
            <Messages ref={toast} />
            <Panel collapsed="true" header="Precios" headerTemplate={priceTemplate} toggleable>

                <ListPrice data={prices} />
            </Panel>

            <Panel collapsed="true" headerTemplate={barcodeTemplate} toggleable >
                <BarcodeList product={product} onChange={() => navigate(0)} />
            </Panel>
            {/* <BarcodeCreate product={product} /> */}
            <br />
            <Panel collapsed="true" header="Datos del producto" toggleable>

                <h2>Datos del producto</h2>
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-shopping-cart"></i>
                    </span>
                    <InputText id="c-p-name" placeholder="Nombre del producto"
                        onChange={(e) => {
                            logger.debug(e)
                            setNombre(e.target.value)
                        }}
                        value={nombre} tabIndex={1} />
                </div>

                <div className="row">
                    <div className="p-inputgroup slices">
                        <InputText id="c-p-mili" placeholder="Mililitros"
                            onChange={(e) => setVolume(e.target.value)}
                            value={volume}
                            tabIndex={2} />
                        <span className="p-inputgroup-addon">
                            mL
                        </span>
                    </div>

                    <div className="p-inputgroup slices">
                        <InputText id="c-p-gramos"
                            value={weight}
                            onChange={e => setWeight(e.target.value)}
                            placeholder="Gramos del producto" tabIndex={3} />
                        <span className="p-inputgroup-addon">
                            Gramos
                        </span>
                    </div>
                    &nbsp;
                    <div className="p-inputgroup slices">
                        <InputText
                            value={units}
                            onChange={e => setUnits(e.target.value)}
                            id="c-p-cantidad" placeholder="Unidades" tabIndex={6} />
                        <span className="p-inputgroup-addon">
                            Unidades
                        </span>
                    </div>
                </div>
                <div className="p-inputgroup">
                    <InputTextarea id="c-p-desc"
                        value={desc}
                        onChange={e => {
                            logger.debug("Evento:", e)
                            setDesc(e.target.value)
                        }}
                        placeholder="Descripción" tabIndex={4} />
                </div>
                <br />
                    <InputNumber 
                        value={quantity}
                         min={0}
                        onChange={e => setQuantity(e.value)}
                        id="c-p-cantidad" placeholder="Cantidad" tabIndex={6} />


                <Button severity="info" className="update-btn" label="Actualizar" onClick={update} tabIndex={7} />
            </Panel>
            <br />
            <ChartPricePerCommerce show={showChart} productId={product} />

        </>
    )
}