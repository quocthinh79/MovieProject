import { createSlice } from '@reduxjs/toolkit';

export const searchKeyWordSlice = createSlice({
    name: 'searchKeyWord',
    initialState: [],
    reducers: {
        updateSearchKeyWord: (state, action) => (state = action.payload),
    },
});

export const { updateSearchKeyWord } = searchKeyWordSlice.actions;
export default searchKeyWordSlice.reducer;
