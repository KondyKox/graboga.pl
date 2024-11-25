import { UserPanelProps } from "@/types/AdminProps";
import { FaBan, FaEdit } from "react-icons/fa";

const UserPanel: React.FC<UserPanelProps> = ({ users }) => {
  return (
    <div className="h-full gradient-bg p-8 rounded-xl shadow-xl border-2 border-epic">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Zarządzanie użytkownikami - {users.length}
      </h2>
      <div className="overflow-y-auto max-h-96">
        {" "}
        {/* Kontener z przewijaniem */}
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-3 text-left"></th>
              <th className="p-3 text-left">Player ID</th>
              <th className="p-3 text-left">Nazwa Użytkownika</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="border-t border-rare">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{user.playerId}</td>
                <td className="p-3">{user.username}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3 flex gap-3 justify-center items-center">
                  {/* Edytuj */}
                  <button className="utility-btn text-legendary hover:bg-legendary focus:ring-legendary">
                    <FaEdit />
                  </button>
                  {/* Zablokuj */}
                  <button className="utility-btn text-special hover:bg-special focus:ring-special">
                    <FaBan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPanel;
