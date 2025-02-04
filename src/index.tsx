import { createRoot } from 'react-dom/client';
import store from '@/app/providers/redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from '@/app/App';
import '@/app/styles/index.less';

const root = createRoot(document.getElementById('root')!);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);