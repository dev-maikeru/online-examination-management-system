import Landing from "./pages/Landing"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Faculty from "./pages/Faculty"
import { Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil'
function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/faculty/*" element={<Faculty/>}/>
      </Routes>
    </RecoilRoot>
  );
}

export default App;
