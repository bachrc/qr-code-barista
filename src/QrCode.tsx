import React from "react";

export interface QrCodeContent {
    qrCode: string
}

export function QrCode(props: QrCodeContent) {
    function base64Image() {
        return "data:image/png;base64," + props.qrCode;
    }

    return <div className="flex flex-col gap-5">
        <img alt="QR Code généré" src={base64Image()}/>
        <a href={base64Image()}
           download="infused-qr-code"
           className="py-4 px-7 w-full text-center rounded-full bg-indigo-50 font-bold">Télécharger</a>
    </div>
}
