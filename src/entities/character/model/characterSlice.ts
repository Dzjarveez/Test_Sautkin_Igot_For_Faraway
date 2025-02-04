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

interface InitialState {
  characterData: Nullable<Character>;
  characterStatus: FetchStatusInterface;
}

const initialState: InitialState = {
  characterData: null,
  characterStatus: BASE_FETCH_STATUS,
};

const getCharacter = createAsyncThunk<Character, { id: string; signal?: AbortSignal }, { state: AppState; extra: ThunkExtraArgs }>(
  'characterSlice/getCharacter',
  async ({ id, signal }, thunkAPI) => {
    try {
      const response = await thunkAPI.extra.api.get(`people/${id}/`, { signal });
      const character: Character = response.data;

      const fetchAdditionalData = async (urls: string[], key: string) => {
        if (!urls.length) return [];
        const responses = await Promise.all(urls.map(url => thunkAPI.extra.api.get(url, { signal })));
        return responses.map(res => res.data[key]);
      };

      const [homeworld, films, species, vehicles, starships] = await Promise.all([
        character.homeworld ? thunkAPI.extra.api.get(character.homeworld, { signal }).then(res => res.data.name) : '',
        fetchAdditionalData(character.films, 'title'),
        fetchAdditionalData(character.species, 'name'),
        fetchAdditionalData(character.vehicles, 'name'),
        fetchAdditionalData(character.starships, 'name'),
      ]);

      return {
        ...character,
        homeworld,
        films,
        species,
        vehicles,
        starships,
      };
    } catch (e: any) {
      if (e.name === 'AbortError') {
        return thunkAPI.rejectWithValue({ Aborted: true });
      }
      return thunkAPI.rejectWithValue(e);
    }
  },
);

const characterSlice = createSlice({
  name: 'characterSlice',
  initialState,
  reducers: {
    resetCharacter: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getCharacter.pending, (state) => {
      state.characterStatus = START_FETCH_STATUS;
    });
    builder.addCase(getCharacter.rejected, (state, { payload }) => {
      state.characterStatus.isLoading = false;
      state.characterStatus.error = payload as any;
    });
    builder.addCase(
      getCharacter.fulfilled,
      (state, { payload }: PayloadAction<Character>) => {
        state.characterStatus.isLoading = false;
        state.characterData = payload;
      },
    );
  },
});

export default characterSlice.reducer;
export const { resetCharacter } = characterSlice.actions;
export { getCharacter };
