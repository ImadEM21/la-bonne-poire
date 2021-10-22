import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import Main from "./components/pages/main/Main";
import Adverts from "./components/pages/adverts/Adverts";
import Contact from "./components/pages/contact/Contact";
import Login from "./components/pages/login/Login";
import Search from "./components/pages/search/Search";
import Signup from "./components/pages/signup/Signup";
import CreateAdvert from "./components/pages/createAdvert/CreateAdvert";
import MyAdverts from "./components/pages/myAdverts/MyAdverts";
import Account from "./components/pages/account/Account";
import UpdateMyAdvert from "./components/pages/updateAdvert/UpdateMyAdvert";
import Advert from "./components/pages/adverts/Advert";
import Offers from "./components/pages/offers/Offers";
import apis from "./api";

function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState();
  const [id, setId] = useState("");

  const connexion = (token, id) => {
    localStorage.setItem(process.env.REACT_APP_TOKEN_NAME, token);
    localStorage.setItem(process.env.REACT_APP_USER_ID_NAME, id);
    setToken(token);
    setId(id);
  };

  const deconnexion = () => {
    setToken("");
    setId("");
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

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_USER_ID_NAME)) {
      setId(localStorage.getItem(process.env.REACT_APP_USER_ID_NAME));
    }
  }, [id]);

  useEffect(() => {
    const getUser = () => {
      apis
        .getUser(id)
        .then((res) => {
          localStorage.setItem(
            process.env.REACT_APP_USER_NAME,
            JSON.stringify(res.data.user)
          );
          const user = res.data.user;
          setUser(user);
        })
        .catch((error) => {
          console.error(error);
          console.error(error.response);
        });
    };
    if (id) getUser();
  }, [id]);

  const fetchUser = () => {
    apis
      .getUser(id)
      .then((res) => setUser(res.data.user))
      .catch((error) => {
        console.error(error);
        console.error(error.response);
      });
  };

  return (
    <>
      <BrowserRouter>
        <NavBar token={token} deconnexion={deconnexion} user={user} />
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>
          <Route path="/advert" exact>
            <Adverts />
          </Route>
          <Route path="/advert/:id" exact>
            <Advert userId={id} token={token} />
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
          {token && user && (
            <>
              <Route path="/account" exact>
                <Account user={user} fetchUser={fetchUser} />
              </Route>
              <Route path="/create-advert" exact>
                <CreateAdvert />
              </Route>
              <Route path="/advert/update/:id" exact>
                <UpdateMyAdvert />
              </Route>
              <Route path="/my-adverts" exact>
                <MyAdverts />
              </Route>
              <Route path="/offers" exact>
                <Offers userId={id} />
              </Route>
              <Route path="/messages" exact></Route>
            </>
          )}
        </Switch>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
