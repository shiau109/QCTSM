import React from 'react';
import ResonatorForm from '../components/ResonatorForm';
import Markdown from '../components/Markdown';

function App() {
  return (
    <div className="App">
      <Markdown url="../../doc/MD/RF_resonator.md" />
      <ResonatorForm />
    </div>
  );
}

export default App;
