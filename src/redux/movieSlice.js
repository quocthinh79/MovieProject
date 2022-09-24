import { createSlice } from '@reduxjs/toolkit';

export const movieSlice = createSlice({
    name: 'movie',
    initialState: [],
    reducers: {
        updateMovie: (state, action) => (state = action.payload),
    },
});

export const { updateMovie } = movieSlice.actions;
export default movieSlice.reducer;
