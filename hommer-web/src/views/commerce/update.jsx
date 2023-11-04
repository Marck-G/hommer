import { useParams } from "react-router-dom";
import { UpdateCommerce } from "../../components/comerce.update";
import { BottomNavbar } from "../commons/bar.bottom";

export function ViewUpdateCommerce(){
    
    const {commerce} = useParams()

    return (
        <div className="commerce createCommerce">
            <h1>Actualizar comercio</h1>
            <UpdateCommerce commerce={commerce} />
            <BottomNavbar />
        </div>
    )
}