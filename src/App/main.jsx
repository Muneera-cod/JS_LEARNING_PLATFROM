import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from '../redux/store/store'
import { MantineProvider } from '@mantine/core'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from '../redux/store/store'
import LoadingPage from '../Components/pages/LoadingPage.jsx'
import { Notifications } from '@mantine/notifications'

createRoot(document.getElementById('root')).render(
    
     <Provider store={store}>
         <MantineProvider>
        <PersistGate loading={<LoadingPage/>} persistor={persistor}>  
        <Notifications/>

      <App />
     
     </PersistGate>
     </MantineProvider>
    </Provider>
)
