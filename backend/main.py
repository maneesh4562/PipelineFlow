from fastapi import FastAPI, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict
import json
from collections import defaultdict
import os

app = FastAPI()

# Get CORS origins from environment variable
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

def is_dag(nodes: List[Dict], edges: List[Dict]) -> bool:
    if not nodes:
        return True  # Empty graph is a DAG
    
    # Create adjacency list and track in-degrees
    graph = defaultdict(list)
    in_degree = defaultdict(int)
    node_ids = {node['id'] for node in nodes}
    
    # Validate edge connections
    for edge in edges:
        source = edge['source']
        target = edge['target']
        
        # Check if nodes exist
        if source not in node_ids or target not in node_ids:
            raise ValueError(f"Edge connects to non-existent node: {source} -> {target}")
        
        graph[source].append(target)
        in_degree[target] += 1
    
    # Find nodes with no incoming edges
    queue = [node['id'] for node in nodes if in_degree[node['id']] == 0]
    if not queue:
        return False  # No starting point, must have a cycle
    
    # Process nodes in topological order
    processed = 0
    while queue:
        node = queue.pop(0)
        processed += 1
        
        # Reduce in-degree for all neighbors
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If we processed all nodes, it's a DAG
    return processed == len(nodes)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
async def parse_pipeline(pipeline: str = Form(...)):
    try:
        # Parse pipeline data
        pipeline_data = json.loads(pipeline)
        nodes = pipeline_data.get('nodes', [])
        edges = pipeline_data.get('edges', [])
        
        # Validate pipeline structure
        if not isinstance(nodes, list) or not isinstance(edges, list):
            raise ValueError("Invalid pipeline structure: nodes and edges must be lists")
        
        # Calculate metrics
        num_nodes = len(nodes)
        num_edges = len(edges)
        
        try:
            is_valid_dag = is_dag(nodes, edges)
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))
        
        return {
            'num_nodes': num_nodes,
            'num_edges': num_edges,
            'is_dag': is_valid_dag
        }
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON format")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
