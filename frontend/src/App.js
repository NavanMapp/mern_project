import './App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/home'
import { Auth } from './pages/auth'
import { CreateRecipe } from './pages/createRecipe'
import { SavedRecipe } from './pages/savedRecipe'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/createRecipe' element={<CreateRecipe />} />
        <Route path='/savedRecipe' element={<SavedRecipe />} />
      </Routes>
    </Router>
  );
}

export default App;