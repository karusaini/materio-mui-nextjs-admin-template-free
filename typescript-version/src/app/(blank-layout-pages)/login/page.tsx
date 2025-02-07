'use client'
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/libs/firebase'
import { useRouter } from 'next/navigation'
import { TextField, Button, Box, Typography, Alert, Container, Paper } from '@mui/material'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async e => {
    e.preventDefault()
    setError('')
    try {
      // Sign in user with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Fetch user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.email))

      if (userDoc.exists()) {
        const userRole = userDoc.data().role
        console.log('Fetched user role:', userRole) // Debugging line

        // Storing user role in localStorage and redirecting based on role
        localStorage.setItem('userRole', userRole)

        if (userRole === 'customer') {
          router.push('/customer-dashboard') // Redirect to customer dashboard
        } else if (userRole === 'support') {
          router.push('/support-dashboard') // Redirect to support dashboard
        } else {
          setError('Role not recognized.')
        }
      } else {
        setError('User role not found.')
      }
    } catch (err) {
      setError(`Error: ${err.message}`)
    }
  }

  return (
    <Container maxWidth='xs' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={3} sx={{ padding: 4, width: '100%', textAlign: 'center' }}>
        <Typography variant='h5' gutterBottom>
          Login
        </Typography>
        {error && (
          <Alert severity='error' sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box component='form' onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label='Email'
            type='email'
            variant='outlined'
            fullWidth
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <TextField
            label='Password'
            type='password'
            variant='outlined'
            fullWidth
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Button type='submit' variant='contained' color='primary' fullWidth>
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}
