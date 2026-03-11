import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './Layouts/layout'
import Home from './pages/Home'
import About from './pages/About'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import SystemStatus from './UI/SystemStatus'
import ClickSpark from './UI/ClickSpark'

export default function App() {
  const location = useLocation()

  return (
    <ClickSpark
      sparkColor="#ffffff"
      sparkSize={14}
      sparkRadius={25}
      sparkCount={12}
      duration={600}
    >
      <SystemStatus />

      <Layout>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </Layout>

    </ClickSpark>
  )
}