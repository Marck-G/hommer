
import { Link } from 'react-router-dom'
import './bar.bottom.scss'


export function BottomNavbar(){

    return(
        <div className="kcs-bottom-bar">
            <div >
                <Link className="link" to="/">
                    <i className="pi pi-home"></i>
                </Link>
            </div>
            <div >
                <Link className="link" to="/commerces">
                    <i className="pi pi-building"></i>
                </Link>
            </div>
            <div >
                <Link className="link" to="/products">
                    <i className="pi pi-box"></i>
                </Link>
            </div>
            <div >
                <Link className="link" to="/">
                    <i className="pi pi-print"></i>
                </Link>
            </div>

            <div >
                <Link className="link" to="/">
                    <i className="pi pi-bars"></i>
                </Link>
            </div>
        </div>
    )
}