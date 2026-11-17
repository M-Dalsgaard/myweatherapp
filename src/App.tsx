import { IonApp, setupIonicReact } from '@ionic/react';
import Home from './pages/Home';
import 'tailwindcss';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <Home />
  </IonApp>
);

export default App;