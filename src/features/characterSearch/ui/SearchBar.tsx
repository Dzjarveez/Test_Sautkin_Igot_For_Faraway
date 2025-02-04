import { Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useCharacterSearch } from '../model/useCharacterSearch';

export const SearchBar = () => {
  const { searchTerm, setSearchTerm, handleSearch } = useCharacterSearch();

  return (
    <Space style={{ marginBottom: 20, marginRight: 20 }}>
      <Input placeholder='Search character...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: 250 }} />
      <Button type='primary' icon={<SearchOutlined />} onClick={handleSearch}>
        Search
      </Button>
    </Space>
  );
};
