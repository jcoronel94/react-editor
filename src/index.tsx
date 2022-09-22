import ReactDOM from "react-dom/client";
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import CodeCell from "./components/code-cell";

const App = () => {

  return (
    <div>
        <CodeCell />
    </div>
  );
};

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el!);
root.render(<App />);
