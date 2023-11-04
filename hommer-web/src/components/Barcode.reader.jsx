import { Logger } from '@kcram-solutions/logger'
import { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
const qrcodeRegionId = "html5qr-code-full-region";

const createConfig = (props) => {
    let config = {};
    if (props.fps) {
        config.fps = props.fps;
    }
    if (props.qrbox) {
        config.qrbox = props.qrbox;
    }
    if (props.aspectRatio) {
        config.aspectRatio = props.aspectRatio;
    }
    if (props.disableFlip !== undefined) {
        config.disableFlip = props.disableFlip;
    }
    return config;
};

export function Barcode({onScan, onError, ...props}){
    const logger = new Logger("Barcode reader")
    useEffect(() => {
        // when component mounts
        const config = createConfig(props);
        config.qrCodeSuccessCallback = onScan;
        config.qrCodeErrorCallback = onError;
        const verbose = props.verbose === true;
        const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
        html5QrcodeScanner.render(props.qrCodeSuccessCallback, props.qrCodeErrorCallback);

        // cleanup function when component will unmount
        return () => {
            html5QrcodeScanner.clear().catch(error => {
                logger.error("Failed to clear html5QrcodeScanner. ", error);
            });
        };
    }, []);

    return (
        <div id={qrcodeRegionId} />
    );
}