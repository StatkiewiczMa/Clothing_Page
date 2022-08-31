import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

* {
	box-sizing: border-box;
}
body {
	margin: 0;
	padding: 20px 40px;
	font-family: "Tapestry", "Dancing Script", cursive;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;

    @media screen and (max-width: 800px){
        padding: 10px;
    }
}

code {
	font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
		monospace;
}

`;
