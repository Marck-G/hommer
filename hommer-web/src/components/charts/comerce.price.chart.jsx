

import { Logger } from '@kcram-solutions/logger';
import { Chart } from 'primereact/chart';
import { useEffect, useState } from 'react';
import urlJoin from 'url-join';
import { API } from '../../constants';
import axios from 'axios';
import moment from 'moment'


export function ChartPricePerCommerce({ productId, show }) {
    const [Rows, setRows] = useState({
        labels: [],
        datasets: [
            {
                label: "Precios",
                data: [],
                fill: false,
                tension: .3
            }
        ]
    })
    const logger = new Logger("Price Per commerce Chart");
    const [Options, setOptions] = useState()

    async function getCommerceName(id) {
        const url = urlJoin(API.host, API.commerce, id);
        logger.debug(url);
        const response = await axios.get(url);
        logger.debug(response);
        return `${response.data.nombre} - ${response.data.localidad}`;
    }

    async function retriveData() {
        const dataset = {}
        const labels = new Array()
        const url = urlJoin(API.host, API.prices, "list", productId);
        logger.debug(url);
        const response = await axios.get(url);
        logger.debug(response);
        for (let i = 0; i < response.data.length; i++) {
            const r = response.data[i];
            if (!dataset[r.comercio]) {
                dataset[r.comercio] = {
                    label: await getCommerceName(r.comercio),
                    data: new Array(),
                    fill: false,
                    tension: .5
                }
            }
        }
        for (let i = 0; i < response.data.length; i++) {
            const price = response.data[i];
            const date = moment(price.fecha).format("MMMM")
            if (!labels.includes(date)) {
                for (const key in dataset) {
                    dataset[key].data.push(null)
                }
                dataset[price.comercio].data.pop()
                dataset[price.comercio].data.push(price.precio)
            }
            labels.push(date)
        }

        logger.debug(dataset)
        logger.debug(labels)
        const datasets = new Array()
        for(const k in dataset){
            logger.debug(k, dataset[k])
            datasets.push(dataset[k])
        }
        setRows({
            labels,
            datasets
        })
        logger.debug(Rows)

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        setOptions({
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        })
    
}

useEffect(() => {
    retriveData()
}, [show])


if (show)
    return (<>
        <Chart  type="line" options={Options} data={Rows} />
    </>)
}