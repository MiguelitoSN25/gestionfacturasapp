import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import ServiceModule from './Modulos/ServiceModule';
import ClientsModule from './Modulos/ClientsModule';
import FacturasModule from './Modulos/FacturasModule';
import { Navigation } from './Utils/Navigation';

import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { Home } from './Modulos/HomePage';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
     <h3 className="m-3 d-flex justify-content-center">
       APP RENSO MIGUEL
     </h3>

     <Navigation/>

     <Switch>
     <Route path='/HomePage' component={Home}/>
     <Route path='/ServicesModule' component={ServiceModule}/>
     <Route path='/ClientsModule' component={ClientsModule}/>
     <Route path='/FacturasModule' component={FacturasModule}/>

     </Switch>
    </div>
    </BrowserRouter>
  );
}


export default App;
