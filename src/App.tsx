import React, {useEffect, useState} from "react";
import * as generator from "qr-code-generator"

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

    function base64Image() {
        return "data:image/png;base64," + image;
    }

    return (
        <div className="flex items-center justify-center h-screen bg-indigo-50">
            <div className="rounded-lg py-3 px-6 bg-indigo-200 flex flex-col sm:flex-row container mx-auto gap-8">
                <form className="flex flex-col w-2/3 gap-5" onSubmit={handleSubmit}>
                    <span className="font-bold">Veuillez entrer (s'il vous plait) l'adresse</span>
                    <input className="px-7 py-3 rounded-full w-full"
                           value={urlValue}
                           onChange={e => setUrlValue(e.target.value)}
                           type="text"
                           placeholder="Entrez l'URL ici"
                    />
                    <input className="rounded-full py-4 px-7" type="submit" value="Générer !"/>
                </form>
                <div className="w-1/3">
                    { image ? <img alt="QR Code généré" src={base64Image()}/> : <>Eh non</>}
                </div>
            </div>
        </div>
    );
}


export default App;
