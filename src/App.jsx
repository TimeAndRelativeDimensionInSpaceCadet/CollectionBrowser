import { CollectionList } from './Components/CollectionList';
import { QueryClientProvider } from '@tanstack/react-query';
import { apiClient } from './Util/apiClient';
import './App.css';

function App() {
  return (
    <QueryClientProvider client={apiClient}>
      <div className="app-container">
        <CollectionList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
