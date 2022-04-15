import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/main/main';
import About from './pages/about/about';
import Webgl from './pages/webgl/webgl';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="about" element={<About/>} />
          <Route path="webgl" element={<Webgl/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
