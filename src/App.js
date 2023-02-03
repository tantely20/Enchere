import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './Pages/Login';
import Accueil from './Pages/Accueil';
import Fiche from './Pages/Fiche';
import Liste from './Pages/Encheres';
import Ajouter from './Pages/Produits';
import Recharger from './Pages/Recharge';
import AjoutEnchere from './Pages/MiseEnEnchere';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Login />}></Route>
      <Route exact path='/Accueil' element={< Accueil />}></Route>
      <Route exact path='/Liste' element={< Liste />}></Route>
      <Route exact path='/Fiche' element={< Fiche />}></Route>
      <Route exact path='/Produits' element={< Ajouter />}></Route>
      <Route exact path='/Recharge' element={< Recharger />}></Route>
      <Route exact path='/MiseEnEnchere' element={< AjoutEnchere />}></Route>
    </Routes>
      
    </BrowserRouter>
  );
}

export default App;