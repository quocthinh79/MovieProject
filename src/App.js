import logo from './logo.svg';
import './App.css';
import GlobalStyles from './components/GlobalStyles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoute } from './routes';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoute.map((item, index) => {
                        const Page = item.component;
                        return <Route key={index} path={`${item.path}/*`} element={<Page />} />;
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
