import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import DeviceListPage from "./pages/DeviceListPage";
import RequireAuth from "./components/RequireAuth";
import { Provider } from 'react-redux';
import store from "./store/store";

const App: React.FC = () => {

  return (
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/" element={<RequireAuth/>}>
          <Route path="home" element={<HomePage />} />
          <Route path="devices" element={<DeviceListPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
    </Provider>
  );
};

export default App;
