import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: #312E38;
    color: #FFF;
    --webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Roboto Slab', serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

  *::-webkit-scrollbar {
    width: 0.4rem;
    height: 0.4rem;
    margin-right: 10px;
  }

  *::-webkit-scrollbar-corner {
    border: none;
    background: none;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #3D3C42;
    border-radius: 3px;
    cursor: move;
  }

  *::-webkit-scrollbar-track {
    background-color: transparent;
    border: none;
  }

  :root{
    scrollbar-color: #3D3C42 rgb(46,54,69) !important;
    scrollbar-width: thin !important;
    scrollbar-darkshadow-color: #3D3C42;
    scrollbar-track-color: #3D3C42;
  }

`;
