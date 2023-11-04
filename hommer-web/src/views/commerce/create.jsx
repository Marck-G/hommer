import { CreateCommerce } from "../../components/comerce.create";
import { BottomNavbar } from "../commons/bar.bottom";
import "./style.scss"
export function ViewCreateCommerce(){
    return(
        <>
        <div className="commerce createCommerce">
            <h1>Nuevo comercio</h1>
            <CreateCommerce />
            <BottomNavbar />
        </div>
        </>
    )
}