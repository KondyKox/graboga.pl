import { StorePanelProps } from "@/types/AdminProps";
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

const StorePanel: React.FC<StorePanelProps> = ({ store }) => {
  return (
    <div className="min-h-full max-h-96 gradient-bg p-8 rounded-xl shadow-xl border-2 border-epic">
      <h2 className="text-center text-2xl font-semibold mb-6">Sklep</h2>
      <div className="overflow-y-auto max-h-96">
        {" "}
        {/* Kontener z przewijaniem */}
        <table className="w-full">
          <thead className="sticky top-0 z-2">
            {" "}
            {/* Sticky header */}
            <tr>
              {["", "ID", "Kategoria", "Nazwa", "Cena", "Status", "Akcje"].map(
                (header) => (
                  <th key={header} className="p-3 text-left">
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {store.map((item, index) => (
              <tr key={item._id} className="border-t border-rare">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{item.pack}</td>
                <td className="p-3">{item.category}</td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.cost}</td>
                <td className="p-3">{item.status}</td>
                <td className="p-3 flex gap-3 justify-center items-center">
                  {/* Edytuj */}
                  <button className="utility-btn text-legendary hover:bg-legendary focus:ring-legendary">
                    <FaEdit />
                  </button>
                  {/* Zablokuj */}
                  <button className="utility-btn text-cursed hover:bg-cursed focus:ring-cursed">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center max-h-8 my-2 flex gap-2 justify-center items-center">
        {actions.map((action, idx) => (
          <button
            key={idx}
            className="utility-btn text-foreground border-2 border-legendary hover:bg-legendary"
          >
            {action.icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StorePanel;
