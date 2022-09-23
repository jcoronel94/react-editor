import ReactDOM from "react-dom/client";
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import TextEditor from "./components/text-editor";
import { Provider } from "react-redux";
import {store} from './state';

const App = () => {

  return (
    <div>
        <TextEditor/>
    </div>
  );
};

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el!);
root.render(<App />);
