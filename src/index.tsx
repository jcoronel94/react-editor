
import { useState, useEffect , useRef} from "react";
import * as esbuild from 'esbuild-wasm';
import ReactDOM from 'react-dom/client';
import { unpkgPathPlugin } from "./plugin/unpkg-path-plugin";

const App = () =>{
    const ref = useRef<any>();
    const [input, setInput] = useState('')
    const [code, setCode] = useState('')

    const startService = async () => {
        ref.current  = await esbuild.startService({
            worker:true, 
            wasmURL:'/esbuild.wasm'
        });
    };

    useEffect(()=>{
        startService();
    }, [])

    const onClick = async () => {
        if(!ref.current){
            return;
        }

        console.log(ref)
        
        const result = await ref.current.build({
            entryPoints: ['index.js'],
            bundle:true,
            write: false,
            plugins:[unpkgPathPlugin()]
        });

        console.log(result)

        setCode(result.outputFiles[0].text)
    }

    return <div>
        <textarea value = {input} onChange={e => setInput(e.target.value)}></textarea>
        <div>
            <button onClick={onClick}>Submit</button>
        </div>
        <pre>{code}</pre>
    </div>
}


const el = document.getElementById('root')
const root = ReactDOM.createRoot(el!)
root.render(<App/>);
