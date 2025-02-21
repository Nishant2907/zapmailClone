'use client'
import React from 'react'
import { supabase } from '@/lib/supabase'

export default function Layout() {

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut({ scope: 'local' })
      localStorage.clear()
    } catch (error) {
      console.error('Sign-out error:', error)
    } finally {
      clearCookies()
    }
  }

  return (
    <div>
      <button onClick={async () => {handleLogout()}}>Logout</button>
    </div>
  )
}

const clearCookies = () => {
  const cookies = document.cookie.split('; ')
  cookies.forEach(cookie => {
    const [name] = cookie.split('=')
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  })
}