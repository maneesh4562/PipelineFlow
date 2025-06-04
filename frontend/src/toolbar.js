// toolbar.js

import { DraggableNode } from './draggableNode';
import styled from 'styled-components';

const ToolbarContainer = styled.div`
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const ToolbarTitle = styled.h3`
  margin: 0 0 15px 0;
  color: #333;
  font-size: 16px;
`;

const NodeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
`;

export const PipelineToolbar = () => {
    const nodeTypes = [
        { type: 'customInput', label: 'Input' },
        { type: 'llm', label: 'LLM' },
        { type: 'customOutput', label: 'Output' },
        { type: 'text', label: 'Text' },
        { type: 'image', label: 'Image' },
        { type: 'data', label: 'Data' },
        { type: 'filter', label: 'Filter' },
        { type: 'merge', label: 'Merge' },
        { type: 'transform', label: 'Transform' }
    ];

    return (
        <ToolbarContainer>
            <ToolbarTitle>Node Types</ToolbarTitle>
            <NodeGrid>
                {nodeTypes.map(({ type, label }) => (
                    <DraggableNode key={type} type={type} label={label} />
                ))}
            </NodeGrid>
        </ToolbarContainer>
    );
};
