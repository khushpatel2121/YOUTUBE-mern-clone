import Card from "../components /Card/Card"
import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import axios from "axios";



const Container = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-between;
padding: 20px;
`

function Home({type}) {
 const[videos,setVideos] = useState([]);

  useEffect(()=>{
    const fetchVideos = async()=>{
      const res = await axios.get(`/video/${type}`)
      setVideos(res.data);
    };
    fetchVideos();
  },[type])

  return (
    <>
    <Container> 
    {videos.map((video)=>(
      <Card key={video._id} video={video}/>
    ))}
    
  
     
     </Container>
    </>
  )
}

export default Home
