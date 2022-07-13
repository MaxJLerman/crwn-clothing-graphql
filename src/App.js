import { Routes, Route } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import SignIn from './routes/sign-in/sign-in.component';

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
                <Route path='sign-in' element={<SignIn />} />
            </Route>
        </Routes>
    );
}

export default App;
