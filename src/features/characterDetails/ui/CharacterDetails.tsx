import { Card, Descriptions, Input, Tag, Button, Space } from 'antd';
import { EditOutlined, PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';

interface Props {
  characterData: Record<string, any>;
  editableData: Record<string, string>;
  editingField: string | null;
  handleEdit: (field: string) => void;
  handleSave: (field: string, value: string) => void;
}

export const CharacterDetails = ({ characterData, editableData, editingField, handleEdit, handleSave }: Props) => {
  const [newItem, setNewItem] = useState('');
  const [editingListField, setEditingListField] = useState<string | null>(null);
  const navigate = useNavigate();

  const renderEditableField = (label: string, key: string, suffix = '') => {
    const value = editableData[key] ?? characterData[key];
    const displayValue = Array.isArray(value) ? value.join('; ') : value;

    return (
      <Descriptions.Item key={key} label={label} style={{ minHeight: '40px' }}>
        {editingField === key ? (
          <Input
            defaultValue={displayValue}
            onBlur={(e) => handleSave(key, e.target.value)}
            onPressEnter={(e) => handleSave(key, e.currentTarget.value)}
            autoFocus
            style={{ height: '22px', margin: 0 }}
          />
        ) : (
          <span style={{ cursor: 'pointer' }} onClick={() => handleEdit(key)}>
            {displayValue} {suffix}
            <EditOutlined style={{ marginLeft: 8, color: '#1890ff' }} />
          </span>
        )}
      </Descriptions.Item>
    );
  };

  const renderEditableList = (label: string, key: string) => {
    const value = editableData[key] ?? characterData[key];
    const items = Array.isArray(value) ? value : value ? value.split('; ') : [];

    const handleAddItem = () => {
      if (!newItem.trim()) return;
      const updatedList = [...items, newItem.trim()];
      handleSave(key, updatedList.join('; '));
      setNewItem('');
    };

    const handleRemoveItem = (itemToRemove: string) => {
      const updatedList = items.filter((item) => item !== itemToRemove);
      handleSave(key, updatedList.join('; '));
    };

    return (
      <Descriptions.Item key={key} label={label}>
        {items.length > 0 ? (
          <Space wrap>
            {items.map((item) => (
              <Tag closable key={item} onClose={() => handleRemoveItem(item)}>
                {item}
              </Tag>
            ))}
          </Space>
        ) : (
          <span style={{ color: '#aaa' }}>N/A</span>
        )}

        {editingListField === key ? (
          <Space style={{ marginTop: 10 }}>
            <Input
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Add new item"
              style={{ width: 200 }}
            />
            <Button icon={<PlusOutlined />} onClick={handleAddItem} />
          </Space>
        ) : (
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => setEditingListField(key)}
            style={{ padding: 0, marginLeft: 8 }}
          >
            Edit
          </Button>
        )}
      </Descriptions.Item>
    );
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: 'auto' }}>
      <Button 
        type="default" 
        icon={<ArrowLeftOutlined />} 
        onClick={() => navigate(RoutePath.characters)} 
        style={{ marginBottom: 20 }}
      >
        Back to list
      </Button>

      <Card title={characterData.name} bordered>
        <Descriptions column={1} bordered>
          {renderEditableField('Height', 'height', ' cm')}
          {renderEditableField('Mass', 'mass', ' kg')}
          {renderEditableField('Hair Color', 'hair_color')}
          {renderEditableField('Skin Color', 'skin_color')}
          {renderEditableField('Eye Color', 'eye_color')}
          {renderEditableField('Birth Year', 'birth_year')}
          {renderEditableField('Gender', 'gender')}
        </Descriptions>
      </Card>

      <Card title="Additional Info" bordered style={{ marginTop: 20 }}>
        <Descriptions column={1} bordered>
          {renderEditableField('Homeworld', 'homeworld')}
          {renderEditableList('Films', 'films')}
          {renderEditableList('Species', 'species')}
          {renderEditableList('Vehicles', 'vehicles')}
          {renderEditableList('Starships', 'starships')}
        </Descriptions>
      </Card>
    </div>
  );
};
