import React, {useState} from "react";
import "./SalesTable.css";
import { SalesData } from "../../features/productsSlice";

interface SalesTableProps {
  sales: SalesData [];
}

const SalesTable: React.FC<SalesTableProps> = ({ sales }) => {
  const [sortedSales, setSortedSales] = useState(sales);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'weekEnding',
    direction: 'asc',
  });

  // Sorting function
  const sortTable = (key: keyof SalesData) => {
    const direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });

    const sortedData = [...sales].sort((a, b) => {
      if (key === 'weekEnding') {
        // Sort by weekEnding (string comparison)
        return direction === 'asc'
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      } else {
        // Sort by numeric values
        const aValue = a[key];
        const bValue = b[key];
        return direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
    });

    setSortedSales(sortedData);
  };

  return (
    <table className="sales-table">
      <thead>
        <tr>
          <th onClick={() => sortTable('weekEnding')} >
            WEEK ENDING
            {sortConfig.key === 'weekEnding' && (sortConfig.direction === 'asc' ? ' ↑' : ' ↓')}
          </th>
          <th onClick={() => sortTable('retailSales')}>
            RETAIL SALES
            {sortConfig.key === 'retailSales' && (sortConfig.direction === 'asc' ? ' ↑' : ' ↓')}
          </th>
          <th onClick={() => sortTable('wholesaleSales')}>
            WHOLESALE SALES
            {sortConfig.key === 'wholesaleSales' && (sortConfig.direction === 'asc' ? ' ↑' : ' ↓')}
          </th>
          <th onClick={() => sortTable('unitsSold')}>
            UNITS SOLD
            {sortConfig.key === 'unitsSold' && (sortConfig.direction === 'asc' ? ' ↑' : ' ↓')}
          </th>
          <th onClick={() => sortTable('retailerMargin')}>
            RETAILER MARGIN
            {sortConfig.key === 'retailerMargin' && (sortConfig.direction === 'asc' ? ' ↑' : ' ↓')}
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedSales.map((sale, index) => (
          <tr key={index}>
            <td>{sale.weekEnding}</td>
            <td>{sale.retailSales}</td>
            <td>{sale.wholesaleSales}</td>
            <td>{sale.unitsSold}</td>
            <td>{sale.retailerMargin}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SalesTable;
