import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from "./components /Navbar/Navbar";
import Menu from "./components /Menu/Menu"
import { darkTheme,lightTheme } from "./utils/Theme";
import { ThemeProvider } from "styled-components";
import { useState } from "react";
import styled from "styled-components";
import Home from "./pages/Home"
import Video from "./pages/Video"
import SignIn from "./pages/SignIn"
import Search from "./pages/Search";

const Container = styled.div`
display: flex;

`
const Main = styled.div`
flex: 1;


`

const Wrapper =styled.div`
flex: 7;
background-color: ${({theme})=>theme.bg};
`

function App() {
  const [darkMode,setDarkMode] = useState(true)
  return (<>
  <ThemeProvider theme={darkMode?darkTheme:lightTheme}>

   <BrowserRouter>
   <Navbar/>
   <Container>
   <Main>
    <Menu darkMode={darkMode} setDarkMode={setDarkMode}/>
    </Main>
     <Wrapper>
    <Routes>
 
     <Route path="/random" element={<Home type="random"/>}/>
     <Route path="/trend" element={<Home type="trend"/>}/>
     <Route path="/sub" element={<Home type="sub"/>}/>
     <Route path="/video/:id" element={<Video/>}/>
     <Route path="/signin" element={<SignIn/>}/>
     <Route path="/search" element={<Search/>}/>
     
    </Routes>
    </Wrapper>
    </Container>
   </BrowserRouter>
 
  </ThemeProvider>
  </>
  );
}

export default App;

