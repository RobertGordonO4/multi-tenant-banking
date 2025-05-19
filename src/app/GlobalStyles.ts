import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.typography?.fontFamily || 'Arial, sans-serif'};
    transition: background-color 0.3s ease, color 0.3s ease;
    margin: 0;
    padding: 0;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  // Add more global styles based on your theme structure
`

export default GlobalStyles
