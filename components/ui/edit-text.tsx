"use client";

import { Edit, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
}

const EditableText: React.FC<EditableTextProps> = ({ value, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onChange(editedValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedValue(e.target.value);
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(0, editedValue.length);
    }
  }, [isEditing, editedValue]);

  const inputStyle = {
    width: `${editedValue.length + 1}ch`,
    padding: "0.1rem 0.3rem",
  };

  return (
    <div className="inline cursor-pointer">
      {isEditing ? (
        <input style={inputStyle} type="text" value={editedValue} onChange={handleInputChange} onBlur={handleSaveClick} autoFocus ref={inputRef} />
      ) : (
        <span className="border-b border-dashed border-gray-500" onClick={handleEditClick}>
          {value}
        </span>
      )}
      {isEditing ? <X className="inline ml-1 h-4 w-4" /> : <Edit onClick={handleEditClick} className="inline ml-1 h-4 w-4" />}
    </div>
  );
};

export default EditableText;
