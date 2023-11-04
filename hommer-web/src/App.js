import { Route, Routes } from "react-router-dom";
import { Home } from "./views/home/Home";
import { ViewEditProduct } from "./views/products/edit";
import { ViewCreateProduct } from "./views/products/create";
import { ViewCreateCommerce } from "./views/commerce/create";
import { ViewListProducts } from "./views/products/list.jsx";
import { ViewListCommerce } from "./views/commerce/list";
import { ViewUpdateCommerce } from "./views/commerce/update";

function App() {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/product/:product" Component={ViewEditProduct} />
      <Route path="/new/product" Component={ViewCreateProduct} />
      <Route path="/new/commerce" Component={ViewCreateCommerce} />
      <Route path="/products" Component={ViewListProducts} />
      <Route path="/commerces" Component={ViewListCommerce} />
      <Route path="/commerce/:commerce" Component={ViewUpdateCommerce} />
    </Routes>
  );
}

export default App;
