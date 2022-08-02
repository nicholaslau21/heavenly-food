import { Navigate, Route, Routes } from 'react-router-dom';

import AllFood from './pages/AllFood';
import NotFound from './pages/NotFound';
import Layout from './components/layout/Layout';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Layout>
        <Routes>
          <Route path='/' element={<Navigate to='/food/all' replace />} />
          <Route path='/food/:categoryId' element={<AllFood />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
