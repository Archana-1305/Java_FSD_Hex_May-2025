import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewUser from "./components/ViewUser";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ViewUser />} />
        <Route path="/add-user" element={<AddUser/>}/>
        <Route path="/edit-user/:id" element={<EditUser/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;