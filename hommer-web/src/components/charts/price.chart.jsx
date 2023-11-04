

import { Logger } from '@kcram-solutions/logger';
import { Chart } from 'primereact/chart';
import { useEffect, useState } from 'react';
import urlJoin from 'url-join';
import { API } from '../../constants';
import axios from 'axios';
import moment from 'moment'


export function ChartPrice({ productId, comercio, show }) {
    const labels = new Array()
    const data = new Array()
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
    const logger = new Logger("Price Chart");
    const [Options,setOptions] = useState()
    




    useEffect(() => {
        logger.info("Componente montado")
        const url = urlJoin(API.host, API.prices, "list", productId)
        logger.debug("URL:", url)
        axios.get(url).then(r => {
            logger.debug("Response:", r.data)
            r.data?.forEach(price => {
                let date = moment(price.fecha).format("MMMM")
                // date = date.
                logger.log("fecha:", date);
                if (price.comercio != comercio) return;
                if (labels.includes(date)) return;
                labels.push(date)
                data.push(price.precio)
            })
            logger.debug("Data:", data)
            logger.debug("Labels:", labels)
            const chartObj = {
                labels,
                datasets: [
                    {
                        label: "Precios",
                        data,
                        fill: false,
                        tension: .3
                    }
                ]
            }
            logger.debug("Objeto chart:", chartObj)
            setRows(chartObj);

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
        })
    }, [productId, comercio, show])

    if (show)
    return (<>
        <Chart  type="line" options={Options} data={Rows} />
    </>)
}