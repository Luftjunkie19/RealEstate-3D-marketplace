import { createSlice } from '@reduxjs/toolkit';

export const conferenceManagmentReducer = createSlice({
    name: "conference",
    initialState: {
        selectedMic: { id: null, label: null },
        selectedSpeaker: { id: null, label: null },
        selectedCamera: { id: null, label: null },
        isCameraPermissionAllowed: null,
        isMicPermissionAllowed: null,
    },
    reducers: {
        selectMic: (state, action) => {
            state.selectedMic = action.payload;
        },
        selectSpeaker: (state, action) => {
            state.selectedSpeaker = action.payload;
        },
        selectCamera: (state, action) => {
            state.selectedCamera = action.payload;
        },
        setCameraPermission: (state, action) => {
            state.isCameraPermissionAllowed = action.payload;
        },
        setMicPermission: (state, action) => {
            state.isMicPermissionAllowed = action.payload;
        }
    }
});

export const conferenceActions = conferenceManagmentReducer.actions;