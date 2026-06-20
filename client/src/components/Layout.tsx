import { useState }  from 'react'
import Sidebar from './Sidebar'
import { MenuIcon } from 'lucide-react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/accounts": "Social Accounts",
  "/schedule": "Post Scheduler",
  "/ai-composer": "AI Composer"
}

const pageSubtitles: Record<string, string> = {
  "/dashboard": "Monitor and track your social media performance",
  "/accounts": "Manage your connected social media accounts",
  "/schedule": "Schedule and manage your posts",
  "/ai-composer": "Create engaging content with AI"
}

const Layout = () => {
  const {isAuthenticated, isLoading} = useAuth()


  const location = useLocation()

  const title = pageTitles[location.pathname] || "Post Scheduler";
  const subtitle = pageSubtitles[location.pathname] || "Manage and automate your social presence"
  const  [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  if(isLoading){
    return(
      <div className='flex h-screen items-center justify-center bg-slate-50'>
        <div className='size-8 border-4 border-red-500 border-t-transparent
        rounded-full animate-spin'/>


      </div>
    )
  }

  if(!isAuthenticated){
    return <Navigate to="/login" replace/>
  }
  
  
  
  return (
    <div className = "flex h-screen bg-slate-50">
      {/* Mobile Overlay  */}

      {isMobileMenuOpen && <div className="fixed inset-0
       bg-slate-900/50 z-40 md:hidden" onClick={()=> setIsMobileMenuOpen(false)} />
      }
      <Sidebar isOpen={isMobileMenuOpen}  setIsOpen={setIsMobileMenuOpen}/>

      <div className = "flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className='h-auto bg-white border-b border-slate-200 px-4 md:px-8' >
          <div className="flex items-center py-4 gap-4 border-b border-slate-100 md:border-0">
            <button 
            className="md:hidden p-2 -ml-2 text-slate-500" 
            onClick={()=>setIsMobileMenuOpen(true)}>
              <MenuIcon className = "size-6" />
            </button>
          </div>
          <div className="py-4">
            <h1 className='text-2xl font-bold text-slate-900'>{title}</h1>
            <p className='text-sm text-slate-400 mt-1'>{subtitle}</p>
          </div>
        </header>
        <main className = "flex-1 overflow-auto p-4 sm:p-6 md:p-8 xl:p-12">
          <Outlet />

        </main>

      </div>
    </div>
  )
}

export default Layout
