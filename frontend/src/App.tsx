import AppRoutes from './routes/app-routes';
import { BrowserRouter } from 'react-router-dom';
import ReactQueryProvider from './providers/react-query.provider';

import Notification from './components/ui/notification';

const App = () => {
  return (
    <BrowserRouter>
      <ReactQueryProvider>
        <Notification />
        <AppRoutes />
      </ReactQueryProvider>
    </BrowserRouter>
  );
};

export default App;
