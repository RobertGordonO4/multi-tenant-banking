import styled from 'styled-components'

export const Button = styled.button`
  padding: 10px 15px;
  font-size: 1em;
  border-radius: ${(props) => props.theme.borderRadius};
  border: none;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) =>
    props.theme.colors.headerText}; /* Assuming primary button text is light */
  transition: background-color 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`
