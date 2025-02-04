import { useSearchParams } from 'react-router-dom';
import { useTypedSelector } from '@/shared/hooks/useTypesSelector/useTypesSelector';

export const usePagination = () => {
  const { nextPage, prevPage } = useTypedSelector((state) => state.charactersReducer);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const searchQuery = searchParams.get('search') || '';

  const handlePageChange = (step: number) => {
    setSearchParams({ page: String(currentPage + step), search: searchQuery });
  };

  return {
    currentPage,
    nextPage,
    prevPage,
    handlePageChange,
  };
};
