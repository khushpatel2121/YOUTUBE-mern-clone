import React from 'react'
import styled from 'styled-components';
import {Link} from "react-router-dom"
import HomeIcon from '@mui/icons-material/Home';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import SportsBasketballOutlinedIcon from '@mui/icons-material/SportsBasketballOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SettingsBrightnessOutlinedIcon from '@mui/icons-material/SettingsBrightnessOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { current } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';


const Container = styled.div`
flex: 1.25;
background-color: ${({theme})=>theme.bgLighter};
height: 100vh;
position: sticky;
top: 56px;
color: ${({theme})=>theme.text};
overflow-y: auto;
z-index: 0;
`
const Wrapper = styled.div`
padding: 17px 26px 17px 26px;

`

const Items =styled.div`
display: flex;
align-items: center;
cursor: pointer;
gap: 20px;
padding: 7.5px 6px;
user-select: none;


&:hover{
  background-color: ${({theme})=>theme.soft};
  border-radius:10px ;
  
}
`
const Hr =styled.hr`
margin: 15px 0px ;
border: 0.5px solid ${({theme})=>theme.soft};
`
const Login =styled.div`
font-size: 15px;
`
const Button =styled.button`
padding:  15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  height: 12px;
`
const Title =styled.h2`
font-size: 14px;
color:#aaaaaa;
font-weight: 600;
margin-bottom:20px ;
`

const HomeLink = styled(Link)`
text-decoration: none;
color: ${({theme})=>theme.text};
`

function Menu({darkMode,setDarkMode}) {

 const {currentUser} = useSelector(state => state.user);

  return (
   <>
    <Container>
        <Wrapper>
 <HomeLink to='/random' style={{}}>
<Items>
<HomeIcon/>
Home
</Items>
</HomeLink>
<HomeLink to='/trend'>
<Items>
<ExploreOutlinedIcon/>
Explore
</Items>
</HomeLink>
<HomeLink to="/sub"> 
<Items>
<SubscriptionsOutlinedIcon/>
Subscription
</Items>
</HomeLink>

<Hr/>
<Items>
<LibraryAddOutlinedIcon/>
Library
</Items>
<Items>
<RestoreOutlinedIcon/>
History
</Items>
<Hr/>
{
  !currentUser && 
  <>
  <Login>
Sign in to like videos, comment, and subscribe.
<Button>
<AccountCircleOutlinedIcon/>
  Sign in
</Button>
<Hr/>
</Login>
  </>

}

<Title>
  Best of KhushTube
</Title>
<Items>
<LibraryMusicOutlinedIcon/>
Music
</Items>
<Items>
<SportsBasketballOutlinedIcon/>
Sports
</Items>
<Items>
<SportsEsportsOutlinedIcon/>
Gaming
</Items>
<Items>
<MovieCreationOutlinedIcon/>
Movies
</Items>
<Items>
<ArticleOutlinedIcon/>
News
</Items>
<Items>
<LiveTvOutlinedIcon/>
Live
</Items>
<Hr/>
<Items>
<SettingsOutlinedIcon/>
Settings
</Items>
<Items>
<OutlinedFlagIcon/>
Report
</Items>
<Items>
<HelpOutlineOutlinedIcon/>
Help
</Items>
<Items onClick={()=>setDarkMode(!darkMode)}>
<SettingsBrightnessOutlinedIcon/>
{darkMode?"Dark": "Light"}Mode
</Items>
    </Wrapper>
     </Container>
   </>
  )
}

export default Menu
