import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCharacter, resetCharacter } from '@/entities/character/model/characterSlice';
import { useTypedDispatch } from '@/shared/hooks/useTypedDispatch/useTypedDispatch';
import { useTypedSelector } from '@/shared/hooks/useTypesSelector/useTypesSelector';

export const useCharacter = () => {
  const dispatch = useTypedDispatch();
  const { id } = useParams<{ id: string }>();
  const abortControllerRef = useRef<AbortController | null>(null);

  const { characterData, characterStatus } = useTypedSelector((state) => state.characterReducer);
  const [editableData, setEditableData] = useState<Record<string, string>>({});
  const [editingField, setEditingField] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const storedData = localStorage.getItem(`character-${id}`);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setEditableData(parsedData);
      }
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    dispatch(getCharacter({ id, signal: abortControllerRef.current.signal }));

    return () => {
      dispatch(resetCharacter());
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [dispatch, id]);

  const handleSave = (field: string, value: string) => {
    const trimmedValue = value.trim();
    const updatedData = { ...editableData };

    if (trimmedValue === '') {
      delete updatedData[field];
    } else {
      updatedData[field] = trimmedValue;
    }

    setEditableData(updatedData);
    localStorage.setItem(`character-${id}`, JSON.stringify(updatedData));
    setEditingField(null);
  };

  const handleEdit = (field: string) => {
    setEditingField(field);
  };

  return {
    characterData,
    characterStatus,
    editableData,
    editingField,
    handleEdit,
    handleSave,
  };
};
