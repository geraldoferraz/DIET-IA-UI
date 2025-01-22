import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export function Login() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Login:', formData)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    return (
        <div className="min-h-screen w-full flex bg-white">
            {/* Form Section */}
            <div className="w-full lg:w-[45%] p-8 lg:p-12">
                {/* Logo */}
                <div className="mb-8">
                    <span className="px-4 py-2 rounded-full border-2 border-primary text-sm font-medium text-primary">
                        Diet.ia
                    </span>
                </div>

                {/* Form Container */}
                <div className="h-[calc(100%-6rem)] flex flex-col justify-center max-w-[360px] mx-auto">
                    <div className="mb-8">
                        <h1 className="text-[1.75rem] font-semibold mb-2 text-gray-800">Login</h1>
                        <p className="text-gray-600">
                            Entre com suas credenciais para acessar
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <Label htmlFor="email" className="text-gray-700">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="h-11 rounded-lg bg-gray-50 border-gray-200 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary"
                                placeholder="seu@email.com"
                                required
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="password" className="text-gray-700">
                                Senha
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="h-11 rounded-lg bg-gray-50 border-gray-200 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary"
                                required
                            />
                        </div>

                        <Button 
                            type="submit" 
                            className="w-full h-11 rounded-lg bg-primary hover:bg-primary/90 text-white"
                        >
                            Entrar
                        </Button>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-gray-500">
                                    Ou continue com
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-6">
                            <Button 
                                variant="outline" 
                                className="h-11 rounded-lg border-gray-200 hover:bg-gray-50"
                                onClick={() => console.log('Apple login')}
                            >
                                <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2">
                                    <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                                </svg>
                                Apple
                            </Button>
                            <Button 
                                variant="outline" 
                                className="h-11 rounded-lg border-gray-200 hover:bg-gray-50"
                                onClick={() => console.log('Google login')}
                            >
                                <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2">
                                    <path fill="currentColor" d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z"/>
                                </svg>
                                Google
                            </Button>
                        </div>
                    </div>

                    <p className="mt-6 text-center text-gray-600 text-sm">
                        Não tem uma conta?{' '}
                        <button
                            type="button"
                            onClick={() => navigate('/register')}
                            className="text-primary font-medium hover:underline"
                        >
                            Cadastre-se
                        </button>
                    </p>
                </div>
            </div>

            {/* Image Section */}
            <div className="hidden lg:block lg:w-[55%] bg-gray-100">
                <img
                    src="/meeting-image.jpg"
                    alt="Team Meeting"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    )
}