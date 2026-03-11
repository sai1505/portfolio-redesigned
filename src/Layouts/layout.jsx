import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Layout({ children }) {
    return (
        <div className="min-h-screen w-full bg-black border-grid flex flex-col">
            <Navbar />

            <main className="flex-1 pt-20 pb-32">
                {children}
            </main>

            <Footer />
        </div>
    )
}