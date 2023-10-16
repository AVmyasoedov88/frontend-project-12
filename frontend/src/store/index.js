import { configureStore } from '@reduxjs/toolkit'
import channelSlice from '../slices/channelSlice.js'
import messageSlice from '../slices/messageSlice.js'

export default configureStore({
    reducer: {
        channel: channelSlice,
        message: messageSlice,
    },
})
