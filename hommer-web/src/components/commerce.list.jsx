

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Logger } from '@kcram-solutions/logger'
import axios from 'axios'
import urlJoin from 'url-join'
import { API } from '../constants';
import { DataScroller } from 'primereact/datascroller';
import { Tag } from 'primereact/tag';

export function ComerceList({ page }) {
    const logger = new Logger("Tabla de tiendas")
    const navigate = useNavigate()
    const [currPage, setCurrPage] = useState(page)
    const [data, setData] = useState(null)

    useEffect(() => {
        let currentPage = page || 1
        logger.debug("Montando el componente");
        axios.get(urlJoin(API.host, API.commerce + `?page=${currentPage}`)).then(res => {
            logger.debug("Datos de retorno:", res.data);
            setData(res.data.data)
        })
    }, [page])

    const itemTemplate = (row) => {
        return (
            <div className="kcs-wrapper" onClick={e => navigate("/commerce/" + row._id)} >
                <span className="name"> {row.nombre} </span>
                <div className="data">
                    <Tag value={row.localidad} />
                    <Tag value={row.provincia} />
                </div>
            </div>
        )
    }

    return (<>
        <DataScroller
            rows={data?.length}
            value={data}
            itemTemplate={itemTemplate}
        />
    </>)
}