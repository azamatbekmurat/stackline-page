import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { SalesData } from '../../features/productsSlice';
import "./Graph.css";


interface GraphProps {
  sales: SalesData[];
}

const Graph: React.FC<GraphProps> = ({ sales }) => {

  // Aggregate sales data by month
  const monthlyData = sales.reduce((acc, sale) => {
    const date = new Date(sale.weekEnding);
    const month = date.toLocaleString('default', { month: 'short' });

    // Check if the month already exists in the accumulator
    const existingMonth = acc.find((item) => item.month === month);
    if (existingMonth) {
      // Add the weekly sales to the existing month's totals
      existingMonth.retailSales += sale.retailSales;
      existingMonth.wholesaleSales += sale.wholesaleSales;
    } else {
      // Add a new entry for the month
      acc.push({
        month,
        retailSales: sale.retailSales,
        wholesaleSales: sale.wholesaleSales,
      });
    }

    return acc;
  }, [] as { month: string; retailSales: number; wholesaleSales: number }[]);


  return (
    <div className="graph-container">
      <h2 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: 'bold' }}>Retail Sales</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="retailSales" stroke="#8884d8" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="wholesaleSales" stroke="#82ca9d" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;