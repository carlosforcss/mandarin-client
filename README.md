# Chinese Learning Client

A minimal, clean React web client for the Mandarin learning FastAPI backend. Built with Vite, React Router, TanStack Query, and Tailwind CSS.

## Features

- **Hanzi Management**: Browse, create, edit, and delete Chinese characters with pinyin, meanings, and HSK levels
- **Sentence Management**: Create and manage Chinese sentences with character associations
- **Category Organization**: Organize content by themes and HSK levels
- **File Upload**: Upload images and files with S3 integration
- **Filtering & Search**: Filter by HSK level, category, and search across content
- **Pagination**: Navigate through large datasets efficiently

## Tech Stack

- **Frontend**: React 18, Vite
- **Routing**: React Router DOM
- **State Management**: TanStack Query (React Query)
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **Build Tool**: Vite

## Project Structure

```
src/
  main.jsx                 # App entry point
  App.jsx                  # Main app component with routing
  index.css               # Global styles with Tailwind
  lib/
    api.js                # Axios API client and endpoints
    hooks.js              # React Query hooks for all API calls
  components/
    Nav.jsx               # Navigation component
    FileUpload.jsx        # File upload with drag & drop
    Filters.jsx           # HSK/category/search filters
    Pager.jsx            # Pagination component
    HanziForm.jsx        # Create/edit hanzi form
    SentenceForm.jsx     # Create/edit sentence form
    CategoryForm.jsx     # Create/edit category form
  pages/
    HanziList.jsx        # List all hanzis with filtering
    HanziDetail.jsx      # Individual hanzi details
    SentencesList.jsx    # List all sentences
    SentenceDetail.jsx   # Individual sentence with related hanzis
    Categories.jsx       # Manage categories
```

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```bash
VITE_API_URL=http://localhost:8000
```

**Note**: The API URL defaults to `http://localhost:8000` if not specified.

### 3. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### 4. Build for Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

## API Integration

This client is designed to work with the FastAPI Mandarin learning backend. All API endpoints and schemas are derived from the `chinese.json` OpenAPI specification included in this project.

### Key API Endpoints

- **Hanzis**: `/api/hanzi/` - CRUD operations for Chinese characters
- **Sentences**: `/api/sentences/` - CRUD operations for sentences
- **Categories**: `/api/categories/` - CRUD operations for categories
- **Files**: `/api/files/upload` - File upload functionality

### Authentication

Currently, the client doesn't implement authentication. Add authentication headers to the axios configuration in `src/lib/api.js` if your backend requires it.

## Key Features

### Filtering System
- Filter hanzis by HSK level (1-6)
- Filter by category
- Real-time search across Chinese text, pinyin, and meanings

### File Upload
- Drag & drop file upload
- Progress indicators and error handling
- Associates uploaded files with hanzis

### Many-to-Many Relationships
- Sentences can be associated with multiple hanzis
- Visual display of character relationships within sentences

### Responsive Design
- Mobile-friendly interface
- Adaptive grid layouts
- Touch-friendly components

## Customization

### Styling
- Modify `tailwind.config.js` for theme customization
- Update `src/index.css` for global styles
- Components use Tailwind utility classes for easy styling modifications

### API Configuration
- Update `src/lib/api.js` to modify base URL or add authentication
- Extend `src/lib/hooks.js` to add new API endpoints
- Error handling can be customized in individual hooks

### Adding New Features
1. Create new API functions in `lib/api.js`
2. Add React Query hooks in `lib/hooks.js`
3. Create components in `components/`
4. Add new routes in `App.jsx`

## Development Notes

- The app uses React Query for efficient server state management
- All API calls are properly cached and invalidated
- Loading and error states are handled consistently across components
- The codebase follows React best practices with functional components and hooks

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8000` |

## Contributing

1. Follow the existing code structure and naming conventions
2. Use TypeScript-style prop validation where helpful
3. Maintain consistent error handling patterns
4. Update this README when adding new features

## License

This project is created for educational purposes in learning Mandarin Chinese.