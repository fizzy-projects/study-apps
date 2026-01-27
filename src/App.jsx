import './App.css';
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './admin/AuthContext';
import AppRoutes from './AppRoutes';
import {ThemeProvider} from "./utils/colours/ThemeContext"
import {ThemeUpdater} from "./utils/colours/ThemeUpdater"


function App(){

  return(
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <ThemeUpdater/>
          <AppRoutes/>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
