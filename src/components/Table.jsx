// Table.js
const Table = ({ columns = [], data = [], cellRenderer }) => {
  if (!Array.isArray(columns) || !Array.isArray(data)) {
    return <div>No data to display</div>;
  }

  return (
    <div className="table-outer">
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th key={i}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                {columns.map((col) => (
                  <td key={col}>
                    {cellRenderer ? cellRenderer(row, col) : row[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
