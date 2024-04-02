import './App.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import js
import Navbar from './Component/navBar';

import NotFound from './Page/404';
import MainPage from './Component/MainPage';



function App() {

  return (
    <div className="App">
      <Router>
        <HelmetProvider>
          <Navbar />
          <div className='PageBody'>

          <Routes >
            <Route path="/"
              element={
                <>
                  <Helmet>
                    <title>Main Page</title>
                  </Helmet>
                  <MainPage/>
                </>
              }
            />
          <Route path="*" element={<NotFound />} />
          </Routes>
          </div>
          
        </HelmetProvider>

      </Router>
    </div>
  );
}

export default App;
