import './App.css'
import Login from './components/Auth/Login';
import Summary from './components/Summary/Summary'
import CreateTask from './components/Task/CreateTask'
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  const [refreshKey, setRefreshKey] = useState(0);

  return (
  
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login/>} />

        <Route path="/dashboard" element={
            <>
              <CreateTask triggerRefresh={() => setRefreshKey(prev => prev + 1)} />
              <Summary refreshKey={refreshKey} />
            </>
        } />

      </Routes>
    </BrowserRouter>
  )
}

export default App
