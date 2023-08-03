import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components"
import { pages } from "./routes/routes";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

export default function App() {
  return (
    <PagesContainer>
    <BrowserRouter>
    <Routes>
      <Route path={pages.signIn} element={ <SignInPage />} />
      <Route path={pages.signUp} element={ <SignUpPage />} />
    </Routes>
    </BrowserRouter>
    </PagesContainer>
  );
}

const PagesContainer = styled.main`
  background-color: #ffffff;
`