import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import LogReader from './pages/LogReader'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/logs/:drName" element={<LogReader />} />
          {/* <Route path="/Resonator" element={<Resonator />} /> */}
          {/* Other routes */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
