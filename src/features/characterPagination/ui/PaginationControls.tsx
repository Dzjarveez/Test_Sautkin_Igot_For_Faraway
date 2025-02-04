import { Button, Space } from 'antd';

interface Props {
  prevPage: boolean;
  nextPage: boolean;
  handlePageChange: (page: number) => void;
}

export const PaginationControls = ({ prevPage, nextPage, handlePageChange }: Props) => (
  <Space style={{ marginBottom: 20 }}>
    <Button disabled={!prevPage} onClick={() => handlePageChange(-1)}>
      ⬅ Prev
    </Button>
    <Button disabled={!nextPage} onClick={() => handlePageChange(1)}>
      Next ➡
    </Button>
  </Space>
);
