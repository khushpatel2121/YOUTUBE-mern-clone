import { style } from '@mui/system';
import React from 'react'
import styled from 'styled-components';
import syled from "styled-components";
import { useState } from 'react';
import axios from "axios";
import {useDispatch} from "react-redux"
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';
import {auth,Provider} from '../firebase';
import { signInWithPopup } from 'firebase/auth';

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: calc(100vh - 56px);
color: ${({ theme }) => theme.text};
`
const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
background-color: ${({ theme }) => theme.bgLighter};
border: 1px solid ${({theme})=> theme.soft};
padding: 20px 50px;
gap: 10px;
`
const Title = styled.h1`
  font-size: 24px;
`
const SubTitle = styled.h2`
 font-size: 20px;
  font-weight: 300;
`
const Input = styled.input`
 width: 100%;
 background-color: transparent;
border: 1px solid ${({theme})=> theme.soft};
outline: none;
font-weight: 500;
  cursor: pointer;
  color: ${({ theme }) => theme.textSoft};
  padding: 10px;
`
const Button = styled.div`
background-color: ${({theme})=>theme.soft};
color: ${({theme})=>theme.text};
padding: 10px;
cursor: pointer;
`
const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

function SignIn() {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email,setEmail] = useState("");
  const dispatch= useDispatch();

  const handleLogin = async(e)=>{
  e.preventDefault();
  dispatch(loginStart());
  try{
    const res = await axios.post("/auth/signin",{name,password});
    dispatch(loginSuccess(res.data));
  }catch(err){
    dispatch(loginFailure());
  }
  }

  const signInWithGoogle = async()=>{
    dispatch(loginStart());
    signInWithPopup(auth,Provider).then((result)=>{
      axios.post("/auth/google",{
        name:result.user.displayName,
        email:result.user.email,
        img:result.user.photoURL
      })
      .then((res)=>{
        console.log(res)
            dispatch(loginSuccess(res.data));
      })
    }).catch((err)=>{
      dispatch(loginFailure());
    })

  }


  return (
  <Container>
    <Wrapper>
     <Title>
        Sign in 
     </Title>
     <SubTitle>
      to continue with KhushTube
     </SubTitle>
      <Input placeholder='username'  onChange={e=>setName(e.target.value)} />
      <Input placeholder='Password' onChange={e=>setPassword(e.target.value)} type="password"/>
      <Button onClick={handleLogin}>Sign in</Button>
      <Title>or</Title>
      <Button onClick={signInWithGoogle}>Sign in with Google</Button>
      <Title>or</Title>
      <Input placeholder="username"  onChange={(e)=>setName(e.target.value)} />
      <Input placeholder='email'  onChange={(e)=>setEmail(e.target.value)} />
        <Input type="password"  onChange={(e)=>setPassword(e.target.value)} placeholder="password" />
        <Button > Sign up</Button>
        <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Wrapper>
  </Container>
  )
}

export default SignIn
