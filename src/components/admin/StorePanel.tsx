import { StorePanelProps, StoreItem } from "@/types/AdminProps";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const StorePanel: React.FC<StorePanelProps> = () => {
  const [isEditPanelVisible, setEditPanelVisible] = useState(false);
  const [isDeletePanelVisible, setDeletePanelVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState<StoreItem | null>(null);
  const [store, setStore] = useState<StoreItem[]>([]);
  const [originalItem, setOriginalItem] = useState<StoreItem | null>(null);
  const [allItem, setAllItem] = useState<StoreItem | null>(null);

  const handleEditClick = (item: StoreItem) => {
    setCurrentItem(item);
    setOriginalItem(item); // Przechowuj oryginalne wartości
    fetchItemDetails(item.category.name.toString());
    setEditPanelVisible(true);
  };

  const handleDeleteClick = (item: StoreItem) => {
    setCurrentItem(item);
    setDeletePanelVisible(true);
  };

  const handleClosePanel = () => {
    setEditPanelVisible(false);
    setDeletePanelVisible(false);
    setCurrentItem(null);
  };

  const fetchStore = async () => {
    try {
      const response = await fetch(`/api/admin/store`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      if (response.ok) {
        const data = await response.json();
        setStore(data);
      } else {
        console.error('Failed to fetch store');
      }
    } catch (error) {
      console.error('Error fetching store:', error);
    }
  };

  useEffect(() => {
    fetchStore();
  }, []);

  const handleConfirmEdit = async () => {
    if (currentItem && currentItem._id) {
      let updatedFields: any = {};
      if (currentItem.price !== originalItem?.price) updatedFields.price = Number(currentItem.price);
      if (currentItem.item !== originalItem?.item) updatedFields.item_id = Number(currentItem.item);
      if (currentItem.stock_quantity !== originalItem?.stock_quantity) updatedFields.stock_quantity = currentItem.stock_quantity;
      if (currentItem.status !== originalItem?.status) updatedFields.status = currentItem.status;

      try {
        const response = await fetch(`/api/admin/store/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            _id: currentItem._id,
            update: updatedFields,
          }),
        });
        if (response.ok) {
          await fetchStore();
          handleClosePanel();
        } else {
          console.error('Failed to edit item');
        }
      } catch (error) {
        console.error('Error editing item:', error);
      }
    }
  };

  const handleConfirmDelete = async () => {
    if (currentItem && currentItem._id) {
      try {
        const response = await fetch(`/api/admin/store/`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            _id: currentItem._id,
          }),
        });
        if (response.ok) {
          await fetchStore();
          handleClosePanel();
        } else {
          console.error('Failed to delete item');
        }
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const fetchItemDetails = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/items/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAllItem(data);
      } else {
        console.error('Failed to fetch item details');
      }
    } catch (error) {
      console.error('Error fetching item details:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentItem((prevItem) => prevItem ? { ...prevItem, [name]: value } : null);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentItem((prevItem) => prevItem ? { ...prevItem, [name]: value } : null);
  };

  return (
    <div className="min-h-full max-h-96 gradient-bg p-8 rounded-xl shadow-xl border-2 border-epic">
      <h2 className="text-center text-2xl font-semibold mb-6">Sklep</h2>
      <div className="overflow-y-auto max-h-96">
        <table className="w-full">
          <thead className="sticky top-0 z-2">
            <tr>
              {["", "Kategoria", "Nazwa", "Cena", "Status", "Akcje"].map(
                (header) => (
                  <th key={header} className="p-3 text-left">
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {store && store.map((item, index) => (
              <tr key={item._id} className="border-t border-rare">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{item.category.name}</td>
                <td className="p-3">{item.item.name}</td>
                <td className="p-3">{item.price}</td>
                <td className="p-3">{item.status}</td>
                <td className="p-3 flex gap-3 justify-center items-center">
                  <button
                    className="utility-btn text-legendary hover:bg-legendary focus:ring-legendary"
                    onClick={() => handleEditClick(item)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="utility-btn text-cursed hover:bg-cursed focus:ring-cursed"
                    onClick={() => handleDeleteClick(item)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditPanelVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="min-h-64 gradient-bg p-8 rounded-xl shadow-xl border-2 border-epic relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={handleClosePanel}
            >
              &times;
            </button>
            <h2 className="text-center text-2xl font-semibold mb-6">Edit Item</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Item:</label>
                <select
                  name="item"
                  className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                  onChange={handleSelectChange}
                >
                  <option></option>
                  {allItem && allItem.map((item: any) => {
                    return (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Cena:</label>
                <input
                  type="number"
                  name="price"
                  className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                  placeholder={currentItem?.price?.toString() || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Ilość: (-1 = infinity)</label>
                <input
                  type="number"
                  name="stock_quantity"
                  className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                  placeholder={currentItem?.stock_quantity || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Status</label>
                <select
                  name="status"
                  className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                  onChange={handleSelectChange}
                >
                  <option></option>
                  <option value="active">active</option>
                  <option value="suspended">suspended</option>
                  </select>
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={handleConfirmEdit}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isDeletePanelVisible && currentItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="min-h-64 gradient-bg p-8 rounded-xl shadow-xl border-2 border-epic relative">
            <p className="text-center text-xl font-semibold mb-4">Czy na pewno chcesz usunąć ten element?</p>
            <pre>{JSON.stringify(currentItem, null, 2)}</pre>
            <div className="flex justify-center gap-4 mt-4">
              <button className="utility-btn text-cursed hover:bg-cursed focus:ring-cursed" onClick={handleConfirmDelete}>Usuń</button>
              <button className="utility-btn text-legendary hover:bg-legendary focus:ring-legendary" onClick={handleClosePanel}>Anuluj</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StorePanel;