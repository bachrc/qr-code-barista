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
        <div className="h-screen w-screen bg-indigo-50">
            <div className="flex">
                <div className="rounded-lg h-auto py-3 px-6 bg-indigo-200 flex flex-col sm:flex-row container gap-8 mx-auto m-16">
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
                    <div className="w-auto md:w-1/3 flex items-center justify-center italic">
                        { image ?
                            <img alt="QR Code généré" src={base64Image()}/> :
                            <>Votre QR Code sera infusé ici</>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}


export default App;
