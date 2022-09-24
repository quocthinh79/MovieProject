import { createSlice } from '@reduxjs/toolkit';

export const personSlice = createSlice({
    name: 'person',
    initialState: [],
    reducers: {
        updatePerson: (state, action) => (state = action.payload),
    },
});

export const { updatePerson } = personSlice.actions;
export default personSlice.reducer;
