import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        font-family: 'Courier New', Courier, monospace;
        font-style: normal;
        font-weight: 400;
        box-sizing: border-box;
    }
    body {
      background-color: #fff;
    }
`

export default GlobalStyle