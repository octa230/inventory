import LoginScreen from "./screens/LoginScreen";
import SaleScreen from "./screens/SaleScreen";
import 'react-toastify/dist/ReactToastify.css';
import RegisterUser from "./screens/RegisterUser";
import ProtectedRoute from "./components/ProtectedRoutes";
import InventoryScreen from "./screens/InventoryScreen";
import ProductEdit from "./screens/ProductEdit";
import SalesHistory from "./screens/SalesHistory";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { Nav, Navbar } from "react-bootstrap";
import RetailScreen from "./screens/RetailScreen";
import {BsBoxArrowRight} from 'react-icons/bs'
import { useContext } from "react";
import { Store } from "./utils/Store";
import MultipleSaleHistory from "./screens/MultipleSaleHistory";


function App() {

  const {state, dispatch: ctxDispatch} = useContext(Store);
  const { sale, userTokenInfo } = state;
  function signoutHandler(){

    ctxDispatch({type: 'SIGN_OUT'})
    localStorage.removeItem('userInfoToken');
    window.location.href = '/'
  }
  return (
  <BrowserRouter>
  <Navbar bg="success" expand='lg' variant="dark p-3" > 
      <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="nav-bar-basic"/>
        <Navbar.Collapse id="nav-bar-basic">
        <Nav className="m-auto">
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          <Nav.Link href="/inventory">Inventory</Nav.Link>
          <Nav.Link href="/register">New User</Nav.Link>
          <Nav.Link href="/sales">Sold units</Nav.Link>
          <Nav.Link href="/sale-history-sale">Sale History</Nav.Link>
        </Nav>
        
        <div className="d-flex align-items-end">
          <Nav>
            <Nav.Link>
              <span className="p-lg-3" onClick={signoutHandler}>Log out</span>
              <BsBoxArrowRight />
            </Nav.Link>
          </Nav>
        </div>
      </Navbar.Collapse>
    </Navbar>

    <ToastContainer position="bottom-center" limit={2} />
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/dashboard" element ={
      <ProtectedRoute>
        <SaleScreen />
      </ProtectedRoute>}/>
      <Route path="/inventory" element ={
        <ProtectedRoute>
          <InventoryScreen />
        </ProtectedRoute>
      } /> 
      <Route path="/register" element = {
        <ProtectedRoute>
          <RegisterUser />
        </ProtectedRoute>
      } />
      <Route path="/api/product/update/:id" element={
        <ProtectedRoute>
          <ProductEdit />
        </ProtectedRoute>
      }/>
      <Route path="/retail" element={
        <ProtectedRoute>
          <RetailScreen />
        </ProtectedRoute>
      }/>
      <Route path="/sales" element={
        <ProtectedRoute>
          <SalesHistory/>
        </ProtectedRoute>
      }/>
      <Route path="/sale-history-sale" element={
        <ProtectedRoute>
          <MultipleSaleHistory/>
        </ProtectedRoute>
      }/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
