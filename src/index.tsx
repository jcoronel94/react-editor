import { useState, useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";
import ReactDOM from "react-dom/client";
import { unpkgPathPlugin } from "./plugin/unpkg-path-plugin";
import { fetchPlugin } from "./plugin/fetch-plugin";
import CodeEditor from "./components/code-editor";
import 'bulmaswatch/superhero/bulmaswatch.min.css';

const App = () => {
  const ref = useRef<any>();
  const iframe = useRef<any>();
  const [input, setInput] = useState("");

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    if (!ref.current) {
      return;
    }

    iframe.current.srcdoc = html;

    const result = await ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: "window",
      },
    });

    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, "*");
  };

  const html = `
    <html lang="en">
    <head></head>
    <body>
    <div id="root"></div>
    <script>
        window.addEventListener('message', (event) =>{

            try{
                eval(event.data)
            }
            catch(e){
               const root = document.querySelector('#root');
               root.innerHTML = '<div style="color:red"><h4>Runtime error</h4>' + e + '</div>'
            }
        }, false)
    </script>
    </body>
    `;

  return (
    <div>
      <CodeEditor 
        initialValue = "const a = 1;"
        onChange={(value) => setInput(value)}
        />
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>

      <iframe
        title="code preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
      ></iframe>
    </div>
  );
};

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el!);
root.render(<App />);
