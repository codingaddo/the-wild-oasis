import styled from "styled-components"
import GlobalStyles from "./styles/GlobalStyles"
import { Button } from "./ui/Button"

const H1 = styled.h1`
font-size:40px;
font-weight:600;
`
const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`

const Input = styled.input`
  border: 1px solid var(--color-gray-300);
  background-color: var(--color-gray-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  padding: 0.8rem 1.2rem;
`
  
function App() {

  return (
    <>
  <GlobalStyles/>
      <StyledApp>
        <H1>The Wild Oasis</H1>
        <Button>Check in</Button>
        <Input/>
      </StyledApp>
      </>
    
  )
}

export default App
