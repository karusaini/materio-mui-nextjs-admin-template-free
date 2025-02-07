'use client'

import { Button, TextField, Box, Typography } from '@mui/material'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/configs/firebaseConfig'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/dashboard/support-dashboard')
    } catch (error) {
      alert('Login failed: ' + error.message)
    }
  }

  return (
    <Box display='flex' justifyContent='center' alignItems='center' minHeight='100vh' bgcolor='#f5f5f5'>
      <Box p={4} bgcolor='#fff' borderRadius={2} boxShadow={3}>
        <Typography variant='h5' mb={2}>
          Login
        </Typography>
        <TextField
          fullWidth
          label='Email'
          variant='outlined'
          margin='normal'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label='Password'
          type='password'
          variant='outlined'
          margin='normal'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button fullWidth variant='contained' color='primary' onClick={handleLogin} sx={{ mt: 2 }}>
          Login
        </Button>
      </Box>
    </Box>
  )
}

export default LoginPage
