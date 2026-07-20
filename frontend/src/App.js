import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Tasks from './pages/Tasks';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/tasks' element={
            <ProtectedRoute>
              <Tasks/>
            </ProtectedRoute>
          } />
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;