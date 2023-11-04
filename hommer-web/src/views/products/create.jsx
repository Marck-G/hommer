import { useParams } from "react-router-dom";
import { UpdateProduct } from "../../components/product.update";
import './style.scss'
import { CreateProduct } from "../../components/product.create";
import { BottomNavbar } from "../commons/bar.bottom";

export function ViewCreateProduct({}){

    return( 
        <div className="productEdit">
            <div className="viewContainer">
                <h1>Crear Producto</h1>
                <CreateProduct />
                <BottomNavbar />
            </div>
        </div>
    )
}