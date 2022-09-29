import { createSlice } from '@reduxjs/toolkit';

export const urlBackgroundOnHoverSlice = createSlice({
    name: 'Url Background On Hover',
    initialState: '',
    reducers: {
        updateUrlBackroundOnHover: (state, action) => (state = action.payload),
    },
});

export const { updateUrlBackroundOnHover } = urlBackgroundOnHoverSlice.actions;
export default urlBackgroundOnHoverSlice.reducer;
