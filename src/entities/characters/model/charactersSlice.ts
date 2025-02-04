import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '@/shared/hooks/useTypesSelector/useTypesSelector';
import { FetchStatusInterface } from '@/shared/api/fetchStatus.interface';
import { BASE_FETCH_STATUS } from '@/shared/api/constants/baseFetch.status';
import { START_FETCH_STATUS } from '@/shared/api/constants/startFetch.status';
import { ThunkExtraArgs } from '@/app/providers/redux/types';
import { Nullable } from '@/app/providers/redux/nullable.type';

export interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string; 
  url: string;
}

export interface CharactersResponse {
  count: number;
  next: Nullable<string>;
  previous: Nullable<string>; 
  results: Character[];
}

interface InitialState {
  charactersData: any[];
  charactersStatus: FetchStatusInterface;
  nextPage: Nullable<string>; 
  prevPage: Nullable<string>;
  currentPage: number; 
}

const initialState: InitialState = {
  charactersData: [],
  charactersStatus: BASE_FETCH_STATUS,
  nextPage: null,
  prevPage: null,
  currentPage: 1,
};

const getCharacters = createAsyncThunk<CharactersResponse, { page?: number; search?: string; signal?: AbortSignal }, { state: AppState; extra: ThunkExtraArgs }>(
  'charactersSlice/getCharacters',
  async ({ page = 1, search = '', signal }, thunkAPI) => {
    try {
      const params = new URLSearchParams();
      params.append('page', String(page));
      if (search) params.append('search', search);

      const response = await thunkAPI.extra.api.get(`people/?${params.toString()}`, {
        signal,
      });

      return response.data as CharactersResponse;
    } catch (e: any) {
      if (e.name === 'AbortError') {
        return thunkAPI.rejectWithValue({ Aborted: true });
      }
      return thunkAPI.rejectWithValue(e);
    }
  },
);

const charactersSlice = createSlice({
  name: 'charactersSlice',
  initialState,
  reducers: {
    resetCharacters: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getCharacters.pending, (state) => {
      state.charactersStatus = START_FETCH_STATUS;
    });
    builder.addCase(getCharacters.rejected, (state, { payload }) => {
      state.charactersStatus.isLoading = false;
      state.charactersStatus.error = payload as any;
    });
    builder.addCase(
      getCharacters.fulfilled,
      (state, { payload }: PayloadAction<CharactersResponse>) => {
        state.charactersStatus.isLoading = false;
        state.charactersData = payload.results;
        state.nextPage = payload.next;
        state.prevPage = payload.previous;
        state.currentPage = payload.next ? state.currentPage + 1 : state.currentPage;
      },
    );
  },
});

export default charactersSlice.reducer;
export const { resetCharacters } = charactersSlice.actions;
export { getCharacters };
