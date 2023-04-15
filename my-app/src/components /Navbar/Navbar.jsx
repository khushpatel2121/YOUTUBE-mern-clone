import React from 'react'
import styled from "styled-components"
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LogoImg from "../../img/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import {useState} from "react";
import Upload from '../Upload/upload';



const Container = styled.div`
background-color: ${({ theme }) => theme.bgLighter};
position: sticky;
top: 0;
height: 56px;
z-index: 999;

`
const Logo = styled.div`
display: flex;
gap: 5px;
font-weight: 500;
align-items: center;

position: sticky;
justify-self: flex-start;
color: ${({ theme }) => theme.text};
`
const Img = styled.img`
height: 25px;
`

const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: space-between;

padding: 10px 20px;
position: relative;
`
const Search = styled.div`
position: absolute;
width: 40%;
left: 0px;
right: 0px;
margin: auto;
border: 1px solid #ccc;
padding: 5px;
justify-content: space-between;
display: flex;
align-items: center;
color: ${({ theme }) => theme.text}
`

const Input = styled.input`
background-color: transparent;
border: none;
outline: none;
color: ${({ theme }) => theme.text};
width: 93%;
`
const Button = styled.button`
padding:  15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 900;
   cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  height: 10px;
  `

  const User =styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  font-weight: 500;
  color:${({theme})=>theme.text}
  `

  const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;


 
const Navbar = () =>{
    const navigate = useNavigate();
    const [q,setQ] = useState("");
    const [open, setOpen] = useState(false);
    const {currentUser}= useSelector(state => state.user)
    return (
        <>
            <Container>
                <Wrapper>
                   <Link to='/random' style={{textDecoration:"none"}}>
                    <Logo>
                      <Img
                            src={LogoImg}
                            alt="logo"
                        />
                        KhushTube
                    </Logo>
                    </Link>
                    <Search>
                        <Input placeholder='Search' 
                        onChange={(e)=>setQ(e.target.value)}/>
                        <SearchOutlinedIcon onClick={()=>navigate(`/search?q=${q}`)}/>
                    </Search>

                    {
                        
                        currentUser ? (
                        <User>
                        <VideoCallOutlinedIcon onClick={()=>setOpen(!open)}/> 
                        <Avatar src={currentUser.img}/>
                        {currentUser.name}
                        </User>
                        ):(
                            <Link to="/signin" style={{textDecoration:"none"}}>

                    <Button>
                        <AccountCircleOutlinedIcon />
                        Sign in
                    </Button>
                    </Link>
                        )
                        
                       
                    }
                    
                </Wrapper>
            </Container>
            {open && <Upload setOpen={setOpen}/> }
        </>

    )
}

export default Navbar
