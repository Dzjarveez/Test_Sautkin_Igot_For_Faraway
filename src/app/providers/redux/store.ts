import { configureStore } from '@reduxjs/toolkit';
import { api } from '@/shared/api/api';
import charactersSlice from '@/entities/characters/model/charactersSlice';
import characterSlice from '@/entities/character/model/characterSlice';

const store = configureStore({
  reducer: {
    charactersReducer: charactersSlice,
    characterReducer: characterSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: {
        extraArgument: {
          api: api,
        },
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
