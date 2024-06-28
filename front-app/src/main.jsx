import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import Footer from './components/footer/footer.jsx'
import store from './redux/store.js'

// Assurez-vous que vous avez un élément avec l'ID 'root' dans votre index.html
const root = createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Footer />
    </Provider>
  </React.StrictMode>
)
