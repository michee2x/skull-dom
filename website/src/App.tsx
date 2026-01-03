import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import DocsLayout from './pages/Docs';
import Examples from './pages/Examples';
import Introduction from './pages/docs/Introduction';
import ReactDocs from './pages/docs/ReactDocs';
import VueDocs from './pages/docs/VueDocs';
import SvelteDocs from './pages/docs/SvelteDocs';
import SolidDocs from './pages/docs/SolidDocs';
import VanillaDocs from './pages/docs/VanillaDocs';
import ConfigurationDocs from './pages/docs/ConfigurationDocs';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="docs" element={<DocsLayout />}>
              <Route index element={<Introduction />} />
              <Route path="react" element={<ReactDocs />} />
              <Route path="vue" element={<VueDocs />} />
              <Route path="svelte" element={<SvelteDocs />} />
              <Route path="solid" element={<SolidDocs />} />
              <Route path="vanilla" element={<VanillaDocs />} />
              <Route path="configuration" element={<ConfigurationDocs />} />
            </Route>
            <Route path="examples" element={<Examples />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
