import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-align: center;

  h1 {
    font-size: 3em;
    margin-bottom: 0.5em;
    color: ${(props) => props.theme.colors.primary};
  }

  p {
    font-size: 1.2em;
    margin-bottom: 1em;
  }
`

const NotFoundPage: React.FC = () => {
  return (
    <NotFoundContainer>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to='/'>Go to Homepage</Link>
    </NotFoundContainer>
  )
}

export default NotFoundPage
