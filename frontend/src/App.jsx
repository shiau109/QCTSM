import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Resonator from './pages/ResonatorPage';
import Wiring from './pages/WiringPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Resonator" element={<Resonator />} />
          <Route path="/Wiring" element={<Wiring />} />
          {/* Other routes */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
