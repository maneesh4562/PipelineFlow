# PipelineFlow

A modern web application for visualizing and validating data processing pipelines. PipelineFlow provides an intuitive drag-and-drop interface for creating complex workflows, with real-time validation and analysis capabilities.

![PipelineFlow Demo](demo.gif)

## Features

- 🎯 **Interactive Pipeline Builder**: Drag-and-drop interface for creating data processing pipelines
- 🔄 **Real-time Validation**: Instant feedback on pipeline structure and DAG validation
- 📊 **Multiple Node Types**: Support for various operations including:
  - Input/Output nodes
  - LLM (Large Language Model) operations
  - Text processing
  - Image handling
  - Data transformation
  - Filtering
  - Merging
  - Custom transformations
- 📈 **Pipeline Analysis**: Get insights into your pipeline's structure and complexity
- 🎨 **Modern UI**: Clean and intuitive user interface built with React and styled-components
- 🔒 **Secure**: Built with security best practices in mind

## Tech Stack

### Frontend
- **React**: Modern UI library for building interactive user interfaces
- **ReactFlow**: Powerful library for building node-based editors
- **Styled Components**: CSS-in-JS styling solution
- **Zustand**: Lightweight state management
- **Vercel**: Frontend deployment and hosting

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **Python**: Core programming language
- **Uvicorn**: ASGI server implementation
- **Render**: Backend deployment and hosting

## Project Structure

```
.
├── frontend/                 # React frontend application
│   ├── public/              # Static files
│   ├── src/                 # Source code
│   │   ├── components/      # React components
│   │   ├── nodes/          # Custom node components
│   │   ├── store.js        # State management
│   │   └── App.js          # Main application component
│   ├── package.json        # Frontend dependencies
│   └── vercel.json         # Vercel deployment config
│
├── backend/                 # FastAPI backend application
│   ├── main.py             # Main application file
│   ├── requirements.txt    # Python dependencies
│   ├── Dockerfile          # Container configuration
│   └── render.yaml         # Render deployment config
│
└── README.md               # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Python 3.9 or higher
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pipelineflow.git
cd pipelineflow
```

2. Set up the backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

3. Set up the frontend:
```bash
cd frontend
npm install
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000

## Development

### Frontend Development
- Run tests: `npm test`
- Build for production: `npm run build`
- Start development server: `npm start`

### Backend Development
- Run tests: `pytest`
- Start development server: `uvicorn main:app --reload`
- API documentation: http://localhost:8000/docs

## Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables:
   - `REACT_APP_API_URL`: Your backend URL
4. Deploy

### Backend (Render)
1. Push your code to GitHub
2. Create a new Web Service on Render
3. Connect your repository
4. Configure environment variables
5. Deploy

## API Documentation

The backend API documentation is available at `/docs` when running the server. Key endpoints include:

- `POST /pipelines/parse`: Validate and analyze pipeline structure
- `GET /`: Health check endpoint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Acknowledgments

- [ReactFlow](https://reactflow.dev/) for the node-based editor
- [FastAPI](https://fastapi.tiangolo.com/) for the backend framework
- [Styled Components](https://styled-components.com/) for styling
- [Zustand](https://github.com/pmndrs/zustand) for state management

## Contact

Your Name - [@Maneesh](https://iammaneesh.netlify.app)
Project Link: [https://github.com/maneesh4562/pipelineflow](https://github.com/maneesh4562/pipelineflow) 