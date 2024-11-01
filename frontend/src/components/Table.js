export function Table({ children }) {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        {children}
      </table>
    </div>
  );
}

export function TableHeaders({ children }) {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>{children}</tr>
    </thead>
  );
}

export function TableHeader({ children }) {
  return <th className="px-6 py-3">{children}</th>;
}

export function TableRow({ children }) {
  return <tr className="bg-white border-b">{children}</tr>;
}

export function TableRowElement({ children }) {
  return (
    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
      {children}
    </th>
  );
}
