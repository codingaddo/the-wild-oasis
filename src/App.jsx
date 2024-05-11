import styled from "styled-components"
import GlobalStyles from "./styles/GlobalStyles"
import Button  from "./ui/Button"
import Input from "./ui/Input"
import Heading from "./ui/Heading"


const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`


  
function App() {

  return (
    <>
  <GlobalStyles/>
      <StyledApp>
        <Heading as="h1">The Wild Oasis</Heading>
        <Heading as="h2">check in and out</Heading>
        <Button>Check in</Button> 
        <Button>check out</Button> 
        <Heading as='h3'>Forms</Heading>
        <Input/>
        <Input/>
      </StyledApp>
      </>
    
  )
}

export default App
