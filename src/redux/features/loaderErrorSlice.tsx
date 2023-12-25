import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoaderErrorType {
  isLoading: boolean;
  isError: string | null;
}

const initialState: LoaderErrorType = {
  isLoading: false,
  isError: null,
};

export const loaderErrorSlice = createSlice({
  name: 'loader/error',
  initialState,
  reducers: {
    makeIsLoading: (state) => {
      state.isLoading = true;
    },

    makeIsUnloading: (state) => {
      state.isLoading = false;
    },

    makeIsError: (state, action: PayloadAction<string>) => {
        state.isError = action.payload;
      },
  },
});

export default loaderErrorSlice.reducer;
export const {actions} = loaderErrorSlice;