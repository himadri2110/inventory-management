import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "./slices/ProductSlice";
import { ProductWidget } from "./components/ProductWidget/index";
import { Header } from "./components/Header/index";
import { ProductListing } from "./components/ProductListing/index";
import { useSelector } from "react-redux";
import { Loader } from "./components/Loader/index";

function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.productSlice);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="p-4 bg-gray-900 text-white h-full">
      <Header />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ProductWidget />

          <ProductListing />
        </>
      )}
    </div>
  );
}

export default App;
