import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from '@/components/ui/provider.tsx'
import { SSILDContextProvider } from './contexts/SSILDContext.tsx'
import { BackgroundNoiseContextProvider } from './contexts/BackgroundNoiseContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <BackgroundNoiseContextProvider>
        <SSILDContextProvider>
          <App />
        </SSILDContextProvider>
      </BackgroundNoiseContextProvider>
    </Provider>
  </StrictMode>
)
