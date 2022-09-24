import { createSlice } from '@reduxjs/toolkit';

export const trendingSlice = createSlice({
    name: 'trending',
    initialState: [],
    reducers: {
        addTrending: (state, action) => {
            const dupe = state.find((obj) => obj.id === action.payload.id);
            if (!dupe) {
                const newTrending = action.payload;
                state.push(newTrending);
            }
        },
    },
});

export const { addTrending } = trendingSlice.actions;
export default trendingSlice.reducer;
