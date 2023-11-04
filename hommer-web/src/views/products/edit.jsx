import { useNavigate, useParams } from "react-router-dom";
import { UpdateProduct } from "../../components/product.update";
import './style.scss'
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { CreatePrice } from "../../components/price.create";
import { Button } from "primereact/button";
import { BottomNavbar } from "../commons/bar.bottom";
import { BarcodeCreate } from "../../components/barcode.create";

export function ViewEditProduct({}){
    const {product} = useParams()
    const [selected, setSelected] = useState(product);
    const [newPriceDialog, setNewPriceDialog] = useState(false);
    const [newBarcode, setNewBarcode] = useState(false);
    const navigate = useNavigate()

    return( 
        <div className="productEdit">
            <div className="viewContainer">
                <h1>Modificar Producto</h1>
                <span><pre>ID: {product}</pre></span>
                <UpdateProduct onNewPrice={e => setNewPriceDialog(true)} product={selected}
                onNewBarcode={e => setNewBarcode(true)}
                />
                <Dialog header="Nuevo Precio"
                breakpoints={{'560px': '100vw', '760px': '100vw'}}
                contentClassName="price-dropdown"
                 position="top" visible={newPriceDialog} onHide={e => setNewPriceDialog(false)}>
                    <CreatePrice onCreated={e => {setNewPriceDialog(false); navigate(0)}} productId={product}/>
                </Dialog>
                <Dialog visible={newBarcode} style={{minWidth: "40vw"}} onHide={e => setNewBarcode(false)} >
                    <BarcodeCreate product={product} onCreate={e => {
                        setNewBarcode(false);
                        navigate(0)
                    }} />
                </Dialog>
            </div>
            <BottomNavbar/>
        </div>
    )
}