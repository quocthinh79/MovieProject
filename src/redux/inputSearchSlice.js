import { createSlice } from '@reduxjs/toolkit';

export const inputSearchSlice = createSlice({
    name: 'inputSearch',
    initialState: '',
    reducers: {
        updateInputSearch: (state, action) => (state = action.payload),
    },
});

export const { updateInputSearch } = inputSearchSlice.actions;
export default inputSearchSlice.reducer;
