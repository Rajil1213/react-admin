import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers/setUserReducer';

export const appStore = configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware => getDefaultMiddleware({
        // ! not good practice
        // models are not serializable, and `payload` has to be serializable
        // TODO: rewrite so that only specific values are ignored
        serializableCheck: false
    }))
})