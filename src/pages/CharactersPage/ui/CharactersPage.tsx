import { usePagination } from '@/features/characterPagination/model/usePagination';
import { CharacterList } from '@/features/characterList/ui/CharacterList';
import { SearchBar } from '@/features/characterSearch/ui/SearchBar';
import { PaginationControls } from '@/features/characterPagination/ui/PaginationControls';
import { Spin, Empty } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useTypedSelector } from '@/shared/hooks/useTypesSelector/useTypesSelector';

const CharactersPage = () => {
  const characters = useTypedSelector((state) => state.charactersReducer.charactersData);
  const isLoading = useTypedSelector((state) => state.charactersReducer.charactersStatus.isLoading);
  const { nextPage, prevPage, handlePageChange } = usePagination();

  return (
    <div style={{ padding: 20 }}>
      <SearchBar />
      <PaginationControls 
        prevPage={Boolean(prevPage)} 
        nextPage={Boolean(nextPage)} 
        handlePageChange={handlePageChange} 
      />

      {isLoading ? (
        <div style={{ textAlign: 'center', marginTop: 50 }}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} />
          <p style={{ marginTop: 20 }}>Loading characters...</p>
        </div>
      ) : characters.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: 50 }}>
          <Empty description='No characters found' />
        </div>
      ) : (
        <CharacterList characters={characters} />
      )}
    </div>
  );
};

export default CharactersPage;
