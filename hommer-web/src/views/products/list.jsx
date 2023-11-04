import { Button } from "primereact/button";
import { ProductList } from "../../components/product.list";
import { BottomNavbar } from "../commons/bar.bottom";
import "./style.scss"
import { useNavigate } from "react-router-dom";

export function ViewListProducts(){
    const navigate = useNavigate()
    return (
        <div className="productEdit pList">

            <div className="header">
                <h1>Productos</h1>
                <Button label="Nuevo producto" onClick={ e => navigate("/new/product")} />
            </div>
            <ProductList />
            <BottomNavbar />
        </div>
    )
}