import './App.css'
import Login from './components/Auth/Login';
import ProtectedRoute from './components/Auth/ProtectedRoute.jsx';
import Home from './components/Home';
import Summary from './components/Summary/Summary'
import CreateTask from './components/Task/CreateTask'
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  const [refreshKey, setRefreshKey] = useState(0);

  return (
  
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <>
                <CreateTask triggerRefresh={() => setRefreshKey(prev => prev + 1)} />
                <Summary refreshKey={refreshKey} />
              </>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App
