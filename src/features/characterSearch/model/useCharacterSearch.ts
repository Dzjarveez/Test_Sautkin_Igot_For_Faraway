import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTypedDispatch } from '@/shared/hooks/useTypedDispatch/useTypedDispatch';
import { useTypedSelector } from '@/shared/hooks/useTypesSelector/useTypesSelector';
import { getCharacters } from '@/entities/characters/model/charactersSlice';

export const useCharacterSearch = () => {
  const dispatch = useTypedDispatch();
  const { charactersData, charactersStatus } = useTypedSelector((state) => state.charactersReducer);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const currentPage = Number(searchParams.get('page')) || 1;
  const searchQuery = searchParams.get('search') || '';

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    dispatch(
      getCharacters({
        page: currentPage,
        search: searchQuery,
        signal: abortControllerRef.current.signal,
      }),
    );

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [currentPage, searchQuery]);

  const handleSearch = () => {
    setSearchParams({ page: '1', search: searchTerm });
  };

  return {
    searchTerm,
    setSearchTerm,
    handleSearch,
    characters: charactersData,
    isLoading: charactersStatus.isLoading,
  };
};
