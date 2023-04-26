import { Routes, Route } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route index element={<Home />} /> {/* including "index" makes it so the Home component shows when the path is just '/' */}
        <Route path='shop/*' element={<Shop />} /> {/* the path suffix of /* means anything after the shop component is rendered in the shop and then the further routing is done inside the shop component */}
        <Route path='authentication' element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
