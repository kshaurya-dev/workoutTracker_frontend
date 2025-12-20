import { createRoot} from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import workoutReducer from './reducers/workoutReducer.js'
import notificationReducer from './reducers/notificationReducer.js'
import userReducer from './reducers/userReducer.js'
import App from './App.jsx'
import { Provider } from 'react-redux'
import './main.css'

const store = configureStore({
  reducer:{
    workouts : workoutReducer,
    notification : notificationReducer,
    user: userReducer,
  }
})
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
