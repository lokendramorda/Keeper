import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './screen/Home';
import Login from './screen/Login';
import Signup from './screen/Signup';
import About from './screen/About';
import Createarea from './screen/Createarea';
import FormPreview from './screen/Preview';
import FormList from './screen/FormList';
import Account from './screen/Account';

function App() {
  return (
    <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/createarea" element={<Createarea />} />
            <Route exact path="/preview/:fId" element={<FormPreview />} />
            <Route exact path="/formlist" element={<FormList />} />
            <Route exact path="/account" element={<Account />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
