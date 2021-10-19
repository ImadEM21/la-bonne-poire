import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import Footer from './components/layout/Footer';
import Main from "./components/pages/main/Main";
import Adverts from "./components/pages/adverts/Adverts";
import Contact from "./components/pages/contact/Contact";
import Login from "./components/pages/login/Login";
import Search from "./components/pages/search/Search";
import Signup from "./components/pages/signup/Signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>
          <Route path="/advert" exact>
            <Adverts />
          </Route>
          <Route path="/search" exact>
            <Search />
          </Route>
          <Route path="/contact" exact>
            <Contact />
          </Route>
          <Route path="/signup" exact>
            <Signup />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
