import React from 'react'
import { useEffect,useState } from 'react'
import axios from "axios";
import styled from "styled-components";
import { useLocation } from 'react-router-dom';
import Card from '../components /Card/Card';

const Container = styled.div`
display: flex;
flex-wrap: wrap;
gap: 10px;
justify-content: space-between;
padding: 20px;
`

const Search = () => {

const [videos,setVideo] = useState([]);
const query = useLocation().search;

useEffect(()=>{
    const fetchVideo = async() =>{
        const res = await axios.get(`/video/search${query}`);
        setVideo(res.data);
    }
    fetchVideo()
},[query])

  return (
    <Container>
{videos.map(video=>(
    <Card key={video._id} video={video}/>)
)}
    </Container>
  )
}

export default Search