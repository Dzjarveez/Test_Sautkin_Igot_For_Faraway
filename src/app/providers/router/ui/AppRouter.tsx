import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import ScrollToTop from '@/app/providers/router/ui/ScrollToTop';
import { routeConfig } from '@/shared/config/routeConfig/routeConfig';
import { Layout, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

const AppRouter = () => {

  return (
    <>
      <ScrollToTop />

      <Header style={{ color: 'white', fontSize: 20 }}>Star Wars App</Header>

      <Suspense fallback={
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 64px)' }}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </div>
      }>
        <Content style={{ padding: '20px' }}>
          <Routes>
            {Object.values(routeConfig).map(
              ({ id, element, path }) => (
                <Route
                  key={id}
                  path={path}
                  element={element}
                />
              ),
            )}
          </Routes>
        </Content>
      </Suspense>
    </>
  );
};

export { AppRouter };
