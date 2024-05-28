import { configureStore } from '@reduxjs/toolkit';

import { conferenceManagmentReducer } from './ConferenceActions';

export const store = configureStore({
    reducer: {
        conference:conferenceManagmentReducer.reducer,
    }
})