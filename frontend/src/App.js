import LoginScreen from "./screens/LoginScreen";
import SaleScreen from "./screens/SaleScreen";
import 'react-toastify/dist/ReactToastify.css';
import InventoryScreen from "./screens/InventoryScreen";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <BrowserRouter>
    <ToastContainer position="bottom-center" limit={2} />
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/sales" element ={<SaleScreen />}/>
      <Route path="/inventory" element ={<InventoryScreen />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
