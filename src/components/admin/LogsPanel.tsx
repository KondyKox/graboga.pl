import {LogsPanelProps } from "@/types/AdminProps";
import { FaEdit, FaPlus, FaPlusCircle, FaTrash } from "react-icons/fa";

const actions = [
  {
    icon: <FaPlus />,
  },
  {
    icon: <FaPlusCircle />,
  },
  {
    icon: <FaPlusCircle />,
  },
  {
    icon: <FaPlusCircle />,
  },
];

const LogsPanel: React.FC<LogsPanelProps> = ({ logs }) => {
  return (
    <div className="min-h-full max-h-96 gradient-bg p-8 rounded-xl shadow-xl border-2 border-epic">
      <h2 className="text-center text-2xl font-semibold mb-6">Logi</h2>
      <div className="overflow-y-auto max-h-96">
        {" "}
        {/* Kontener z przewijaniem */}
        <table className="w-full">
          <thead className="sticky top-0 z-2">
            {" "}
            {/* Sticky header */}
            <tr>
              {["Data", "Użytkownik", "Akcja", "Opis", "Status", "IP"].map(
                (header) => (
                  <th key={header} className="p-3 text-left">
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {logs.map((item: any) => (
              <tr key={item._id} className="border-t border-rare">
                <td className="p-3">{item.createdAt}</td>
                <td className="p-3">{item.user}</td>
                <td className="p-3">{item.action}</td>
                <td className="p-3">{item.details}</td>
                <td className="p-3">{item.status}</td>
                <td className="p-3">{item.ipAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default LogsPanel;
