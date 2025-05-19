import styled from 'styled-components'

export const Select = styled.select`
  padding: 8px 12px;
  border-radius: ${(props) => props.theme.borderRadius || '4px'};
  border: 1px solid #ccc; /* Or use a theme color */
  background-color: white;
  font-size: 1em;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${(props) => `${props.theme.colors.primary}40`}; /* Primary color with opacity */
  }
`
