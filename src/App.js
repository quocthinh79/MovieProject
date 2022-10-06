import './App.scss';
import GlobalStyles from './components/GlobalStyles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoute } from './routes';
import Header from './components/Header';
import NotFoundPage from './pages/NotFoundPage';
import ReactModal from 'react-modal';
import { Suspense } from 'react';

ReactModal.setAppElement('#root');
function App() {
    return (
        <Suspense fallback={<div>Loading ...</div>}>
            <Router>
                <div className="App">
                    <Header />
                    <Routes>
                        {publicRoute.map((item, index) => {
                            const Page = item.component;
                            return <Route key={index} path={`${item.path}/*`} element={<Page />} />;
                        })}
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </div>
            </Router>
        </Suspense>
    );
}

export default App;
