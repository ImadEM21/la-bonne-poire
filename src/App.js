import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import NavBar from "./components/layout/NavBar";
import Footer from './components/layout/Footer';
import Main from "./components/pages/main/Main";
import Adverts from "./components/pages/adverts/Adverts";
import Contact from "./components/pages/contact/Contact";
import Login from "./components/pages/login/Login";
import Search from "./components/pages/search/Search";
import Signup from "./components/pages/signup/Signup";
import CreateAdvert from "./components/pages/createAdvert/CreateAdvert";
import MyAdverts from './components/pages/myAdverts/MyAdverts';

function App() {
  const [token, setToken] = useState('');

  const connexion = token => {
    localStorage.setItem(process.env.REACT_APP_TOKEN_NAME, token);
    setToken(token);
  };

  const deconnexion = () => {
    setToken("");
    localStorage.removeItem(process.env.REACT_APP_TOKEN_NAME);
    localStorage.removeItem(process.env.REACT_APP_USER_ID_NAME);
    localStorage.removeItem(process.env.REACT_APP_USER_NAME);
    document.location.href = "/";
  };

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)) {
      setToken(localStorage.getItem(process.env.REACT_APP_TOKEN_NAME));
    }
  }, [token]);

  return (
    <>
      <BrowserRouter>
        <NavBar token={token} deconnexion={deconnexion} />
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
            <Signup connexion={connexion} />
          </Route>
          <Route path="/login" exact>
            <Login connexion={connexion} />
          </Route>
          {token &&
            <>
              <Route path='/account' exact>

              </Route>
              <Route path='/create-advert' exact>
                <CreateAdvert />
              </Route>
              <Route path='/my-adverts' exact>
                <MyAdverts />
              </Route>
              <Route path='/offers' exact>

              </Route>
              <Route path='/messages' exact>

              </Route>
            </>
          }
        </Switch>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
