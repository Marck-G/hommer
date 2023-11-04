import { Button } from "primereact/button";
import "./style.scss"
import { ComerceList } from "../../components/commerce.list";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { CreateCommerce } from "../../components/comerce.create";
import { BottomNavbar } from "../commons/bar.bottom";


export function ViewListCommerce(){
    const navigate = useNavigate()

    return (<div className="commerce listCommerce">
        <div className="header">
            <h1>Comercios</h1>
            <Button label="Crear comercios" onClick={ e=>navigate("/new/commerce")}/>
        </div>
        <ComerceList />
        <BottomNavbar />
    </div>)
}