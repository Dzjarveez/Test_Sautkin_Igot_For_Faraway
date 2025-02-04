import { AppRouter } from '@/app/providers/router/ui/AppRouter';
import 'antd/dist/reset.css';

export const App = () => {
  console.log('build', '1.1.0');

  return (
    <AppRouter />
  );
};