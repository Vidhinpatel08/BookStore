import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../store/counter/counterSlice.js'

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
})