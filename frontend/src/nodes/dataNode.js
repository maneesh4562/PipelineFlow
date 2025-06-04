import React, { useState } from 'react';
import { BaseNode } from './baseNode';
import styled from 'styled-components';

const Select = styled.select`
  width: 100%;
  padding: 4px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 4px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const DataNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'filter');
  const [condition, setCondition] = useState(data?.condition || '');

  const operations = [
    { value: 'filter', label: 'Filter' },
    { value: 'sort', label: 'Sort' },
    { value: 'group', label: 'Group' },
    { value: 'aggregate', label: 'Aggregate' }
  ];

  return (
    <BaseNode
      id={id}
      type="Data Transform"
      inputs={[{ id: 'input', label: 'Data Input' }]}
      outputs={[{ id: 'output', label: 'Transformed Data' }]}
      width="250"
      height="150"
    >
      <Select
        value={operation}
        onChange={(e) => setOperation(e.target.value)}
      >
        {operations.map(op => (
          <option key={op.value} value={op.value}>
            {op.label}
          </option>
        ))}
      </Select>
      <Input
        type="text"
        value={condition}
        onChange={(e) => setCondition(e.target.value)}
        placeholder={`Enter ${operation} condition`}
      />
    </BaseNode>
  );
}; 