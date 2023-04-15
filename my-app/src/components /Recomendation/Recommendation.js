import React from 'react'
import axios from "axios"
import { useEffect,useState } from 'react'
import styled from "styled-components";
import Card from '../Card/Card';

const Ecomendation = styled.div`
flex: 2;
`

const Commendation = ({tags}) => {

  const [video,setVideo] = useState([]);

useEffect(()=>{
    const fetchVideo = async ()=>{
        const res = await axios.get(`/video/tags?tags=${tags}`);
        setVideo(res.data);
    }
    fetchVideo();
})

  return (
    <Ecomendation>
       {video.map((video)=>(
        <Card type="sm" key={video._id} video={video}/>
       ))}
    </Ecomendation>
  )
}

export default Commendation
