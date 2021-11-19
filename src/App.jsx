import { Provider } from "react-redux";
import { store } from "./app/store/store";
import Router from "./pages/Router";
import { GlobalStyles } from "./styles/GlobalStyles";
import './styles/fonts.css'

export default function App() {
  return (
    <Provider store={store}>
      <GlobalStyles/>
      <Router/>
    </Provider>
  );
}