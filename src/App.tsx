import React, {useEffect, useState} from "react";
import * as generator from "qr-code-generator"
import logo from "./assets/logo.png"
import {QrCode} from "./QrCode";

type WasmGenerator = typeof generator

function App() {
    const [urlValue, setUrlValue] = useState("");
    const [wasmGenerator, setWasmGenerator] = useState<WasmGenerator| undefined>();
    const [image, setImage] = useState<string | undefined>(undefined)

    useEffect(() => {
        const loadGenerator = async () => {
            const wasmGenerator = await import("qr-code-generator");
            setWasmGenerator(wasmGenerator);
        }

        loadGenerator();
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setImage(wasmGenerator?.generate_qr_code_from_url(urlValue));
    }

    return (
        <div className="h-screen w-screen bg-indigo-50">
            <div className="flex flex-col container mx-auto">
                <img className="w-full max-w-xl my-6 self-center" alt="Logo QR Code Barista" src={logo} />
                <div className="rounded-lg h-auto py-3 px-6 bg-indigo-200 flex flex-col md:flex-row gap-8">
                    <form className="flex flex-col w-full gap-5 self-center" onSubmit={handleSubmit}>
                        <span className="font-bold text-center md:text-left">Veuillez entrer l'adresse à infuser</span>
                        <input className="px-7 py-3 rounded-full w-full"
                               value={urlValue}
                               onChange={e => setUrlValue(e.target.value)}
                               type="text"
                               placeholder="Entrez l'URL ici"
                        />
                        <input className="rounded-full py-4 px-7 bg-indigo-100 font-bold" type="submit" value="Générer !"/>
                    </form>
                    <div className="w-auto md:w-1/3 flex items-center justify-center">
                        { image ?
                            <QrCode qrCode={image} />:
                            <span className="italic">Votre QR Code sera infusé ici</span>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}


export default App;
