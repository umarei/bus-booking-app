// src/components/common/Table.js

import React from 'react';
import PropTypes from 'prop-types';

const Table = ({ columns, data, className = '' }) => (
  <table className={`table ${className}`}>
    <thead>
      <tr>
        {columns.map(({ header, accessor }) => (
          <th key={accessor}>{header}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.length > 0 ? (
        data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map(({ accessor, Cell }, colIndex) => (
              <td key={colIndex}>
                {Cell ? <Cell value={row[accessor]} row={row} /> : row[accessor]}
              </td>
            ))}
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={columns.length} className="text-center">
            No data available.
          </td>
        </tr>
      )}
    </tbody>
  </table>
);

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
      Cell: PropTypes.func, // Optional custom cell renderer
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string,
};

export default Table;
