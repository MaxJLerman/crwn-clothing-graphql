import { Routes, Route, Outlet } from 'react-router-dom';

import Home from './routes/home/home.component';

const Navigation = () =>
{
    return(
        <div>
            <div>
                <h1>Navbar</h1>
            </div>
            <Outlet />
        </div>
    );
}

const Shop = () =>
{
    return(
        <div>
            <div>
                <h1>Shop</h1>
            </div>
        </div>
    );
}

const App = () =>
{
    return(
        <Routes>
            <Route path='/' element={<Navigation />} >
                <Route index element={<Home />} /> {/* including "index" makes it so the Home component shows when the path is just '/' */}
                <Route path='shop' element={<Shop />} />
            </Route>
        </Routes>
    );
}

export default App;
