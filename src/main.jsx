import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {store} from './store.js'
import { Provider } from 'react-redux'
import { GlobalContextProvider } from './context/useContextGlobal.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <GlobalContextProvider>
             <App />
        </GlobalContextProvider>

    </Provider>,
)
