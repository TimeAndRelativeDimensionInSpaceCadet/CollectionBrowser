import { CollectionList } from './Components/CollectionList';
import { QueryClientProvider } from '@tanstack/react-query';
import { apiClient } from './Util/apiClient';
import './App.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ControlBar } from './Components/ControlBar';

function App() {
  return (
    <QueryClientProvider client={apiClient}>
      <div className="app-container">
        <CollectionList />
        {typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object' && (
          <ReactQueryDevtools />
        )}
      </div>
    </QueryClientProvider>
  );
}

export default App;
