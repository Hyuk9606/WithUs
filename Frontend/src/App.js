import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/main/main';
import About from './pages/about/about';
import Webgl from './pages/webgl/webgl';
import LoginModal from './component/loginModal';
import Footer from './component/footer';

function App() {
  return (
    <div>
      <LoginModal />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/about" element={<About/>} />
          <Route path="/webgl" element={<Webgl/>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
