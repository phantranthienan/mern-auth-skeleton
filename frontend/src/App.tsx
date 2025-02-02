import AppWithRoutes from './routes/app-with-routes';
import { BrowserRouter } from 'react-router-dom';
import ReactQueryProvider from './providers/react-query-provider';

const App = () => {
  return (
    <BrowserRouter>
      <ReactQueryProvider>
        <AppWithRoutes />
      </ReactQueryProvider>
    </BrowserRouter>
  );
};

export default App;
