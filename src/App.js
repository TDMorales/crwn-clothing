import { Routes, Route } from "react-router-dom";
import NavigationBar from "./routes/NavigationBar/navigationBar.component";
import Home from "./routes/Home/home.component";
import Shop from "./routes/Shop/shop.component";
import Authentication from "./routes/Authentication/authentication.component";
import Checkout from "./routes/Checkout/checkout.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<NavigationBar />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
