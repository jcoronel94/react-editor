import ReactDOM from "react-dom/client";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import CellList from "./components/cell-list";
import { Provider } from "react-redux";
import { store } from "./state";

const App = () => {
  return (
    <Provider store = {store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
};

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el!);
root.render(<App />);
