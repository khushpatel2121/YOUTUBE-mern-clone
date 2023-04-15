import React, { useEffect } from 'react';
import styled from "styled-components";
import { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase"
import { useNavigate } from 'react-router-dom';
import { async } from '@firebase/util';
import axios from "axios"


const Container = styled.div`
width: 100%;
height: 100%;
position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  z-index: 9999;
`
const VideoWrapper =styled.div`
padding: 20px;
width: 600px;
height: 600px;
background-color: ${({theme})=>theme.bg};
color: ${({theme})=>theme.text};
align-items: center;

display: flex;
flex-direction: column;
position: relative;
gap: 20px;

`
const Close = styled.div`
position: absolute;
top: 10px;
right: 10px;
cursor: pointer;
user-select: none;

`
const Title = styled.h1`
text-align: center;
`

const Input = styled.input`
border: 1px solid ${({ theme }) => theme.soft};
color: ${({theme})=>theme.text};
border-radius: 10px;
padding: 10px;
background-color: transparent;
width: 80%;

`
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 80%;
  height: 80px;
`

const Button = styled.div`
background-color: ${({theme})=>theme.soft};
color: ${({theme})=>theme.text};
padding: 10px;
cursor: pointer;
width: 80%;
border-radius: 10px;
user-select: none;
display: flex;

justify-content: center;
`
const Label = styled.label`
  font-size: 14px;
  width: max-content;
`;

function Upload({setOpen}) {
  
 const [img,setImg] = useState(undefined);
 const [video,setVideo] = useState(undefined);
 const [imgPerc,setImgPerc] = useState(0);
 const [videoPerc,setVideoPerc] = useState(0);
 const [inputs,setInputs] = useState({});
 const [tags,setTags] = useState([]);

const navigate = useNavigate();

 const handleChange = (e)=>{
    setInputs((prev)=>{
        return {...prev,[e.target.name]:e.target.value }
    })
    
}

 const handleTags = (e)=>{
    setTags(e.target.value.split(","));
  }
  

const uploadFile = (file,urlType)=>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    
    const uploadTask = uploadBytesResumable(storageRef,file);

 
    uploadTask.on('state_changed', 
  (snapshot) => {

    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    urlType === 'imgUrl' ? setImgPerc(Math.round(progress)):setVideoPerc(Math.round(progress));
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default:
            break;
    }
  }, 
  (error) => {},
  () => {
    
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setInputs((prev)=>{
            return {...prev, [urlType]:downloadURL}
        })
     
    });
  }
    )
}

useEffect(()=>{
    video && uploadFile(video, "videoUrl")
},[video]);

useEffect(()=>{
    img && uploadFile(img, "imgUrl")
},[img]);

const handleUpload = async(e)=>{
e.preventDefault();
const res = await axios.post("/video", {...inputs,tags});
setOpen(false);
res.status===(200) && navigate(`/video/${res.data._id}`)
}



  return (
   
    <Container>
<VideoWrapper>
<Close onClick={()=>setOpen(false)}>
X
</Close>
<Title>
    Upload a New video 
</Title>
<Label>Video:</Label>
{videoPerc > 0 ? (
          "Uploading:" + videoPerc + "%"
        ) : (
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        )}
        <Input
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
        />
<Desc
    name='desc'
    placeholder='Add Description...'
    onChange={handleChange}
/>
<Label>Image:</Label>
<Input
    placeholder='Separate the tags with commas.'
    onChange={handleTags}
/>
{imgPerc>0?("Uploading img" + imgPerc +"%"):(<Input
    type="file"
    accept='image/*'
    onChange={(e)=>setImg(e.target.files[0])}
/>)}
<Button onClick={handleUpload}>Upload</Button>
</VideoWrapper>
    </Container>
   
  )
}

export default Upload
