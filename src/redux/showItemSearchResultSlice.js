import { createSlice } from '@reduxjs/toolkit';

export const showItemSearchResultSlice = createSlice({
    name: 'showItemSearchResult',
    initialState: true,
    reducers: {
        updateShowItemSearchResult: (state, action) => (state = action.payload),
    },
});

export const { updateShowItemSearchResult } = showItemSearchResultSlice.actions;
export default showItemSearchResultSlice.reducer;
