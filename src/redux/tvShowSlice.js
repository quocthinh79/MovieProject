const { createSlice } = require('@reduxjs/toolkit');

export const tvShowSlice = createSlice({
    name: 'tvShow',
    initialState: [],
    reducers: {
        updateTvShow: (state, action) => (state = action.payload),
    },
});

export const { updateTvShow } = tvShowSlice.actions;
export default tvShowSlice.reducer;
