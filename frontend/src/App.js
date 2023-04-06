import LoginScreen from "./screens/LoginScreen";
import SaleScreen from "./screens/SaleScreen";
import 'react-toastify/dist/ReactToastify.css';
import RegisterUser from "./screens/RegisterUser";
import InventoryScreen from "./screens/InventoryScreen";
import ProductEdit from "./screens/ProductEdit";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { Container, Nav, Navbar } from "react-bootstrap";


function App() {
  return (
    <BrowserRouter>
    <Navbar bg="success" expand='lg' variant="dark" > 
      <Container>
      <div>
      <Navbar.Brand href="/">Home</Navbar.Brand>
      </div>
        <Navbar.Toggle aria-controls="nav-bar-basic"/>
        <Navbar.Collapse id="nav-bar-basic">
        <div>
        <Nav className="m-auto">
          <Nav.Link href="/sales">Dashboard</Nav.Link>
          <Nav.Link href="/inventory">Inventory</Nav.Link>
          <Nav.Link href="/register">New User</Nav.Link>
          <Nav.Link href="/">History</Nav.Link>
        </Nav>
        </div>
      </Navbar.Collapse>
    </Container>
    </Navbar>

    <ToastContainer position="bottom-center" limit={2} />
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/sales" element ={<SaleScreen />}/>
      <Route path="/inventory" element ={<InventoryScreen />} />
      <Route path="/register" element = {<RegisterUser />} />
      <Route path="/api/product/update/:id" element={<ProductEdit />}/>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
