import React from 'react';
import Attenuation from '../components/attenuation';
import Markdown from '../components/Markdown';

function App() {
  return (
    <div className="App">
      <Markdown url="../../doc/MD/Attenuation.md" />
      <Attenuation />

    </div>
  );
}

export default App;
