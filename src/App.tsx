import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store';
import { fetchProducts } from './features/productsSlice';
import Header from "./components/Header/Header";
import ProductDescription from "./components/ProductDescription/ProductDescription";
import SalesTable from "./components/SalesTable/SalesTable";
import { useSelector } from 'react-redux';
import { RootState } from './store';
import './App.css';
import Graph from './components/Graph/Graph';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.products);


  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="app">
      <Header />
      {products.length > 0 && (
        <div className="content">
          <ProductDescription
            image={products[0].image}
            title={products[0].title}
            subtitle={products[0].subtitle}
            tags={products[0].tags}
          />
          <div className="sales-content">
            <Graph sales={products[0].sales} />
            <SalesTable sales={products[0].sales} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
