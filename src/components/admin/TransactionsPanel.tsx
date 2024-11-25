const TransactionPanel = () => {
  return (
    <div className=" utility-btn p-8 rounded-xl shadow-xl border-2 border-epic">
      <h2 className="text-2xl font-semibold mb-6">Transakcje</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="p-3 text-left">Username</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Date</th>
          </tr>
        </thead>
        <tbody>{/* Transaction data */}</tbody>
      </table>
    </div>
  );
};

export default TransactionPanel;
