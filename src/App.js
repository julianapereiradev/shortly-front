import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components"
import { pages } from "./routes/routes";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import AuthContext from "./contexts/AuthContext";
import { useState } from "react";
import UrlPage from "./pages/UrlPage";

export default function App() {
  const [user, setUser] = useState(0)
  const [userName, setUserName] = useState('');
  return (
    <PagesContainer>
      <AuthContext.Provider value={{user, setUser, userName, setUserName}}>
    <BrowserRouter>
    <Routes>
      <Route path={pages.signIn} element={ <SignInPage />} />
      <Route path={pages.signUp} element={ <SignUpPage />} />
      <Route path={pages.home} element={ <HomePage />} />
      <Route path={pages.urlItem + ':id'} element={ <UrlPage />} />
    </Routes>
    </BrowserRouter>
    </AuthContext.Provider>
    </PagesContainer>
  );
}

const PagesContainer = styled.main`
  background-color: #ffffff;
`