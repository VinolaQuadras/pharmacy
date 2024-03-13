import{BrowserRouter, Routes, Route} from "react-router-dom"
import Signup from './components/Signup';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import PurchaseDrugs from "./components/PurchaseDrugs";
import ViewOrders from "./components/ViewOrders";
//import { AuthProvider } from './components/AuthContext';
import EmployeeDashboard from "./components/EmployeeDashboard"
import Store from "./components/Store";
import AddDrugs from "./components/AddDrugs";
function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard/:userid" element={<UserDashboard/>} />
        <Route path="/purchase-drugs/:userid" element={<PurchaseDrugs/>} />
        <Route path="/view-orders/:userid" element={<ViewOrders/>} />
        <Route path="/employee-dashboard/:userid" element={<EmployeeDashboard/>}/>
        <Route path="/store/:userid" element={<Store/>}/>
        <Route path="/add-drugs/:userid" element={<AddDrugs/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
