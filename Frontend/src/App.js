import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/main/main';
import Oauth from './component/oauth/oauth'
import About from './pages/about/about';
import Webgl from './pages/webgl/webgl';
import LoginModal from './component/loginModal';
import Footer from './component/footer';
import VideoRoomComponent from './openVidu/components/VideoRoomComponent'


function App() {


  return (
    <div>
      <LoginModal />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/oauth2/redirect" element={<Oauth/>}/>
          <Route path="/about" element={<About/>} />
          <Route path="/webgl" element={<Webgl/>} />
          <Route path="/openvidu" element={< VideoRoomComponent sessionName='test'/>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
