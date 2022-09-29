import { createSlice } from '@reduxjs/toolkit';

export const idBackgroundOnHoverSlice = createSlice({
    name: 'ID Background On Hover',
    initialState: '',
    reducers: {
        updateIdBackroundOnHover: (state, action) => (state = action.payload),
    },
});

export const { updateIdBackroundOnHover } = idBackgroundOnHoverSlice.actions;
export default idBackgroundOnHoverSlice.reducer;
