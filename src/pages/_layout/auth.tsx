import { Outlet } from "react-router-dom"
import { RiMentalHealthLine } from "react-icons/ri";
import back from "../../assets/back2.jpg"

export function AuthLayout() {
    return (
        <div className="min-h-screen grid grid-cols-2 antialiased">
            <div className="relative h-full">
                <img
                    src={back}
                    alt="Auth Illustration"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />

                <div className="relative h-full p-10 flex flex-col justify-between text-white">
                    <div className="flex items-center gap-3 text-lg font-medium">
                        <RiMentalHealthLine className="h-5 w-5" />
                        <span className="font-semibold">Diet.IA</span>
                    </div>

                    <div className="flex flex-col items-start justify-center space-y-2" >
                        <h2 className="text-3xl font-bold">
                            Transforme sua alimentação
                        </h2>
                        <p className="text-lg text-white/80 max-w-[340px]">
                            Monitore sua dieta de forma inteligente e alcance seus objetivos com mais eficiência.
                        </p>
                    </div>

                    <footer className="text-sm text-white">
                        &copy; Sua alimentação monitorada pela equipe Diet.IA - {new Date().getFullYear()}
                    </footer>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center relative bg-background">
                <Outlet />
            </div>
        </div>
    )
}