import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset}

    * {
        box-sizing: border-box;
    }

    html, body, button { font-family: "Elice DX Neolli", sans-serif; }
`;

export default GlobalStyle;
