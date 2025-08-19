import  { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Edit, Trash2, Save, X } from "lucide-react";
import {
  TABS,
  MediaSettingRow,
  fetchRows,
  createRow,
  updateRow,
  deleteRow,
} from "../api-client";

function MediaSettingTab({ endpoint }: { endpoint: string }) {
  const [rows, setRows] = useState<MediaSettingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [enValue, setEnValue] = useState("");
  const [arValue, setArValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  // Fetch all rows for this tab
  const loadRows = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRows(endpoint);
      setRows(data);
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadRows();
  }, [endpoint]);

  // Add new row
  const handleAdd = async () => {
    if (!enValue && !arValue && !sortValue) return;
    try {
      const newRow = await createRow(endpoint, {
        englishName: enValue || "-",
        arabicName: arValue || "-",
        sorting: sortValue ? parseInt(sortValue) : (rows.length ? Math.max(...rows.map(r => r.sorting)) + 1 : 1),
      });
      setRows([...rows, newRow]);
      setEnValue(""); setArValue(""); setSortValue("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Start editing
  const startEdit = (row: MediaSettingRow) => {
    setEditId(row.id);
    setEnValue(row.englishName);
    setArValue(row.arabicName);
    setSortValue(row.sorting.toString());
  };

  // Save edit
  const handleSaveEdit = async () => {
    if (editId == null) return;
    try {
      await updateRow(endpoint, editId, {
        englishName: enValue,
        arabicName: arValue,
        sorting: sortValue ? parseInt(sortValue) : 1,
      });
      setRows(rows.map(row =>
        row.id === editId
          ? { ...row, englishName: enValue, arabicName: arValue, sorting: sortValue ? parseInt(sortValue) : 1 }
          : row
      ));
      setEditId(null); setEnValue(""); setArValue(""); setSortValue("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditId(null); setEnValue(""); setArValue(""); setSortValue("");
  };

  // Delete row
  const handleDelete = async (id: number) => {
    try {
      await deleteRow(endpoint, id);
      setRows(rows.filter(row => row.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {error && <div className="text-red-600 font-semibold">{error}</div>}
      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl border">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="px-4 py-2 font-semibold">En. Name</th>
              <th className="px-4 py-2 font-semibold">Ar. Name</th>
              <th className="px-4 py-2 font-semibold">Sorting</th>
              <th className="px-4 py-2 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-6">Loading...</td>
              </tr>
            ) : (
              rows.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center text-gray-400 py-6">No data</td>
                </tr>
              ) : (
                rows.map(row =>
                  editId === row.id ? (
                    <tr key={row.id} className="border-t bg-yellow-50">
                      <td className="px-2 py-2">
                        <input
                          type="text"
                          className="w-full border rounded px-2 py-1"
                          value={enValue}
                          onChange={e => setEnValue(e.target.value)}
                        />
                      </td>
                      <td className="px-2 py-2">
                        <input
                          type="text"
                          className="w-full border rounded px-2 py-1"
                          value={arValue}
                          onChange={e => setArValue(e.target.value)}
                          dir="rtl"
                        />
                      </td>
                      <td className="px-2 py-2">
                        <input
                          type="number"
                          className="w-full border rounded px-2 py-1 text-center"
                          value={sortValue}
                          onChange={e => setSortValue(e.target.value)}
                        />
                      </td>
                      <td className="px-2 py-2 text-center space-x-2">
                        <button
                          className="inline-flex items-center text-green-700 hover:text-green-900"
                          onClick={handleSaveEdit}
                          title="Save"
                        >
                          <Save size={18} />
                        </button>
                        <button
                          className="inline-flex items-center text-gray-500 hover:text-gray-900"
                          onClick={cancelEdit}
                          title="Cancel"
                        >
                          <X size={18} />
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={row.id} className="border-t">
                      <td className="px-4 py-2">{row.englishName}</td>
                      <td className="px-4 py-2" dir="rtl">{row.arabicName}</td>
                      <td className="px-4 py-2 text-center">{row.sorting}</td>
                      <td className="px-4 py-2 text-center space-x-2">
                        <button
                          className="inline-flex items-center text-blue-600 hover:text-blue-800"
                          onClick={() => startEdit(row)}
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          className="inline-flex items-center text-red-600 hover:text-red-800"
                          onClick={() => handleDelete(row.id)}
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  )
                )
              )
            )}
            {/* Add row */}
            {editId === null && (
              <tr>
                <td className="px-2 py-2">
                  <input
                    type="text"
                    placeholder="English Name"
                    className="w-full border rounded px-2 py-1"
                    value={enValue}
                    onChange={e => setEnValue(e.target.value)}
                  />
                </td>
                <td className="px-2 py-2">
                  <input
                    type="text"
                    placeholder="الاسم العربي"
                    className="w-full border rounded px-2 py-1"
                    value={arValue}
                    onChange={e => setArValue(e.target.value)}
                    dir="rtl"
                  />
                </td>
                <td className="px-2 py-2">
                  <input
                    type="number"
                    placeholder="Sort"
                    className="w-full border rounded px-2 py-1 text-center"
                    value={sortValue}
                    onChange={e => setSortValue(e.target.value)}
                  />
                </td>
                <td className="px-2 py-2 text-center">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded"
                    onClick={handleAdd}
                  >
                    + Add
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* No extra buttons needed as each action is instant */}
    </div>
  );
}

const MediaSettings = () => {
  const [active, setActive] = useState(TABS[0].name);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Media Settings</h1>
        <Tabs defaultValue={TABS[0].name} value={active} onValueChange={setActive} className="w-full">
          <TabsList className="w-full flex justify-start overflow-x-auto gap-2 mb-6">
            {TABS.map((tab: { name: string; endpoint: string }) => (
              <TabsTrigger
                key={tab.name}
                value={tab.name}
                className="flex-1 min-w-max px-4 py-2 rounded-lg text-md font-semibold bg-white hover:bg-blue-50 transition"
              >
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {TABS.map((tab: { name: string; endpoint: string }) => (
            <TabsContent
              key={tab.name}
              value={tab.name}
              className="bg-white rounded-xl shadow p-8 min-h-[300px]"
            >
              <MediaSettingTab endpoint={tab.endpoint} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default MediaSettings;