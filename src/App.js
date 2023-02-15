import { BrowserRouter,Route, Routes } from 'react-router-dom';
import './App.css';
import Initial from './initial/initial';
import AdminHome from './home/admin/admin-home';
import UserHome from './home/user/user-home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
           <Route path="/" element={<Initial/>}></Route>
           <Route path="/admin" element={<AdminHome/>}></Route>
           <Route path="/user" element={<UserHome/>}></Route>
           </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
