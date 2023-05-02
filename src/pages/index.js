import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [pwd, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('https://m2devadmin.softkuka.com.br/api/Login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, pwd }),
      })

      if (!response.ok) {
        const error = await response.json()
        setError(error.message)
        alert("Usuário ou senha incorreta")
      } else {
        const { token } = await response.json()
        localStorage.setItem('token', token)
        alert("Acesso autorizado")
        window.location.href = '/dashboard'
        console.log(response)
      }
    } catch (error) {
      console.error(error)
      setError('Ocorreu um erro ao fazer login.')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 space-y-6 bg-white shadow-md text-black">
        <h1 className="text-3xl font-bold text-center">Faça login</h1>

        {error && (
          <div className="text-red-500">{error}</div>
        )}

        <form onSubmit={handleLogin} className='space-y-4'>
          <div className="space-y-2">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-2 pb-4">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              value={pwd}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none">
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}
