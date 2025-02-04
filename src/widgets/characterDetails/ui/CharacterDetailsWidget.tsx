import { CharacterDetails } from '@/features/characterDetails/ui/CharacterDetails';
import { useCharacter } from '@/features/characterDetails/model/useCharacter';
import { Spin, Alert, Button } from 'antd';
import { LoadingOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { useNavigate } from 'react-router-dom';

export const CharacterDetailsWidget = () => {
  const navigate = useNavigate();
  const { characterData, characterStatus, editableData, editingField, handleEdit, handleSave } = useCharacter();

  if (characterStatus.isLoading) {
    return (
      <div style={{ textAlign: 'center', marginTop: 50 }}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} />
        <p style={{ marginTop: 20 }}>Loading character data...</p>
      </div>
    );
  }

  if (characterStatus.error) {
    return (
      <div style={{ textAlign: 'center', marginTop: 50 }}>
        <Alert message='Error' description='Failed to load character data.' type='error' showIcon />
        <Button type='primary' style={{ marginTop: 20 }} onClick={() => navigate(RoutePath.characters)}>
          <ArrowLeftOutlined /> Back to list
        </Button>
      </div>
    );
  }

  if (!characterData) {
    return (
      <div style={{ textAlign: 'center', marginTop: 50 }}>
        <Alert message='Character not found' type='warning' />
        <Button type='primary' style={{ marginTop: 20 }} onClick={() => navigate(RoutePath.characters)}>
          <ArrowLeftOutlined /> Back to list
        </Button>
      </div>
    );
  }

  return <CharacterDetails characterData={characterData} editableData={editableData} editingField={editingField} handleEdit={handleEdit} handleSave={handleSave} />;
};
