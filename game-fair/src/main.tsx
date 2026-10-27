import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router'
import { routs } from './routs/Routs.tsx'
import { StallProvider } from './context/StallContext.tsx'
import { WorldProvider } from './context/WorldContext.tsx'



const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <WorldProvider>
          <StallProvider>
            <RouterProvider router={routs}>
            </RouterProvider>
          </StallProvider>
        </WorldProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
