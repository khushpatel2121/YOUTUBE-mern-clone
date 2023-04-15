import React, { useEffect ,useState} from 'react'
import styled from "styled-components";
import Profile from "../../img/IMG_0980.jpeg"
import {Link} from  "react-router-dom";
import {format}from "timeago.js";
import axios from "axios";

const Container = styled.div`
width: ${(props)=>props.type !== "sm" && "360px"};

`
const Wrapper = styled.div`
padding: 10px;
display: ${(props)=> props.type === "sm" && "flex"};
gap: 10px;
`
const Img = styled.img`
width: 100%;
height: ${(props)=> props.type === "sm" ? "120px": "202px"};
background-color: #999;
flex: 1;
border-radius: 20px;
`
const Details = styled.div`
display: flex;
margin-top: ${(props)=>props.type !== "sm" && "16px"};
gap: 12px;
flex: 1;
`

const ChannelImage = styled.img`
width: 36px;
height:36px;
border-radius:50%;
background-color: #999;
display: ${(props)=>props.type === "sm" && "none"};
`
const Text = styled.div`
`;

const Title= styled.h1`
font-size: 16px;
  font-weight: 500;
color: ${({theme})=>theme.text};
`;

const ChannelName = styled.div`
  font-size: 14px;
color: ${({theme})=>theme.textSoft};
margin: 9px 0px;
`
const Info = styled.div`
  font-size: 14px;
color: ${({theme})=>theme.textSoft};
`;

function Card({type,video}) {
 
  const [channel, setChannel] = useState({})

  useEffect(()=>{
    const fetchChannel = async()=>{
      const res = await axios.get(`/user/find/${video.userId}`)
      setChannel(res.data);
    }
    fetchChannel();
  },[video.userId])
 
  return (
  <>
  <Link to={`/video/${video._id}`} style={{textDecoration:"none"}}>
<Container type={type} >
    <Wrapper type={type}>
        <Img
            src={video.imgUrl}
            type={type}

        /> 
        <Details type={type}>
         <ChannelImage
            src={channel.img}
            type={type}
         />
         <Text>
         <Title>{video.title}</Title>
         <ChannelName>{channel.name}</ChannelName>
         <Info>{video.views} views • {format(video.createdAt)}</Info>
         </Text>
        </Details>
    </Wrapper>
</Container>
  </Link>
  </>
  )
}

export default Card
