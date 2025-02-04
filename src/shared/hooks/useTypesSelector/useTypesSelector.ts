import { TypedUseSelectorHook, useSelector } from 'react-redux';
import store from '@/app/providers/redux/store';

export type AppState = ReturnType<typeof store.getState>;

const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;

export { useTypedSelector };
