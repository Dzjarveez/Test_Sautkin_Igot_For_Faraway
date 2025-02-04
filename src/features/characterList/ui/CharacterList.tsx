import { Row, Col, Card } from 'antd';
import { getCharacterDetailPath } from '@/shared/config/routeConfig/routeConfig';
import { useNavigate } from 'react-router-dom';

interface Character {
  name: string;
  url: string;
}

interface Props {
  characters: Character[];
}

export const CharacterList = ({ characters }: Props) => {
  const navigate = useNavigate();

  return (
    <Row gutter={[16, 16]}>
      {characters.map((character) => (
        <Col xs={24} sm={12} md={8} lg={6} key={character.name}>
          <Card
            bordered={true}
            style={{ cursor: 'pointer', transition: '0.2s' }}
            hoverable
            onClick={() => navigate(getCharacterDetailPath(character.url.split('/').filter(Boolean).pop()!))}
          >
            {character.name}
          </Card>
        </Col>
      ))}
    </Row>
  );
};
