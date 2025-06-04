import React, { useState } from 'react';
import { BaseNode } from './baseNode';
import styled from 'styled-components';

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Select = styled.select`
  width: 100%;
  padding: 4px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Input = styled.input`
  width: 100%;
  padding: 4px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const FilterNode = ({ id, data }) => {
  const [field, setField] = useState(data?.field || '');
  const [operator, setOperator] = useState(data?.operator || 'equals');
  const [value, setValue] = useState(data?.value || '');

  const operators = [
    { value: 'equals', label: 'Equals' },
    { value: 'contains', label: 'Contains' },
    { value: 'greater', label: 'Greater Than' },
    { value: 'less', label: 'Less Than' },
    { value: 'between', label: 'Between' }
  ];

  return (
    <BaseNode
      id={id}
      type="Filter"
      inputs={[{ id: 'input', label: 'Data Input' }]}
      outputs={[{ id: 'output', label: 'Filtered Data' }]}
      width="250"
      height="180"
    >
      <FilterContainer>
        <Input
          type="text"
          value={field}
          onChange={(e) => setField(e.target.value)}
          placeholder="Field name"
        />
        <Select
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
        >
          {operators.map(op => (
            <option key={op.value} value={op.value}>
              {op.label}
            </option>
          ))}
        </Select>
        <Input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Filter value"
        />
      </FilterContainer>
    </BaseNode>
  );
}; 