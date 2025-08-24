import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Edit, Trash2, Save, X } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const TABS = [
  { name: "Catalogue", endpoint: "/media_catalogue" },
  { name: "Kind", endpoint: "/media_kind" },
  { name: "Size", endpoint: "/media_size", hasWidth: true, hasHeight: true },
  { name: "Weight", endpoint: "/media_weight" },
  { name: "Surface", endpoint: "/media_surface" },
  { name: "Color", endpoint: "/media_color" },
  { name: "Shape", endpoint: "/media_shape" },
  { name: "Thickness", endpoint: "/media_thickness" },
  { name: "Brand", endpoint: "/media_brand" },
  { name: "Trading Unit", endpoint: "/media_tradingunit" },
  { name: "Package Unit", endpoint: "/media_packageunit" },
];

export interface MediaSettingRow {
  id: number;
  englishName: string;
  arabicName: string;
  sorting: number;
  width?: number;
  height?: number;
}

const handleResponse = async (response: Response) => {
  const contentType = response.headers.get('content-type');
  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    try {
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } else {
        const text = await response.text();
        errorMessage = text.slice(0, 200);
      }
    } catch (_) {}
    throw new Error(errorMessage);
  }
  // Accept empty responses (204 No Content or missing content-type)
  if (response.status === 204 || response.status === 205) {
    return;
  }
  if (!contentType || !contentType.includes('application/json')) {
    const text = await response.text();
    if (!text && response.ok) return;
    console.error('Non-JSON response received:', text.slice(0, 200));
    throw new Error(`Invalid content type. Expected JSON, received: ${contentType}`);
  }
  return response.json();
};

export const fetchRows = async (endpoint: string): Promise<MediaSettingRow[]> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('authToken');
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    },
    mode: 'cors',
    credentials: 'include',
  });
  if (response.status === 401) {
    localStorage.removeItem('authToken');
    window.location.href = '/signin';
    throw new Error('Authentication required');
  }
  return handleResponse(response);
};

export const createRow = async (endpoint: string, data: Omit<MediaSettingRow, 'id'>): Promise<MediaSettingRow> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('authToken');
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
    mode: 'cors',
    credentials: 'include',
  });
  if (response.status === 401) {
    localStorage.removeItem('authToken');
    window.location.href = '/signin';
    throw new Error('Authentication required');
  }
  return handleResponse(response);
};

export const updateRow = async (
  endpoint: string,
  id: number,
  data: MediaSettingRow // Now requires id in body
): Promise<void> => {
  const url = `${API_BASE_URL}${endpoint}/${id}`;
  const token = localStorage.getItem('authToken');
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data), // must include id!
    mode: 'cors',
    credentials: 'include',
  });
  if (response.status === 401) {
    localStorage.removeItem('authToken');
    window.location.href = '/signin';
    throw new Error('Authentication required');
  }
  await handleResponse(response);
};

export const deleteRow = async (endpoint: string, id: number): Promise<void> => {
  const url = `${API_BASE_URL}${endpoint}/${id}`;
  const token = localStorage.getItem('authToken');
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    },
    mode: 'cors',
    credentials: 'include',
  });
  if (response.status === 401) {
    localStorage.removeItem('authToken');
    window.location.href = '/signin';
    throw new Error('Authentication required');
  }
  await handleResponse(response);
};

function MediaSettingTab({ endpoint, tabName }: { endpoint: string; tabName: string }) {
  const [rows, setRows] = useState<MediaSettingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [enValue, setEnValue] = useState("");
  const [arValue, setArValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [widthValue, setWidthValue] = useState("");
  const [heightValue, setHeightValue] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  // Check if this is the Size tab
  const isSizeTab = tabName === "Size";

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
    if (!enValue && !arValue && !sortValue && (!isSizeTab || (!widthValue && !heightValue))) return;
    try {
      const rowData: any = {
        englishName: enValue || "-",
        arabicName: arValue || "-",
        sorting: sortValue ? parseInt(sortValue) : (rows.length ? Math.max(...rows.map(r => r.sorting)) + 1 : 1),
      };
      if (isSizeTab) {
        rowData.width = widthValue ? parseFloat(widthValue) : 0;
        rowData.height = heightValue ? parseFloat(heightValue) : 0;
      }
      const newRow = await createRow(endpoint, rowData);
      setRows([...rows, newRow]);
      clearForm();
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Clear form helper
  const clearForm = () => {
    setEnValue(""); 
    setArValue(""); 
    setSortValue(""); 
    setWidthValue(""); 
    setHeightValue("");
  };

  // Start editing
  const startEdit = (row: MediaSettingRow) => {
    setEditId(row.id);
    setEnValue(row.englishName);
    setArValue(row.arabicName);
    setSortValue(row.sorting.toString());
    if (isSizeTab) {
      setWidthValue(row.width?.toString() || "");
      setHeightValue(row.height?.toString() || "");
    }
  };

  // Save edit
  const handleSaveEdit = async () => {
    if (editId == null) return;
    try {
      // --- FIX: include id in update body! ---
      const updatedData: MediaSettingRow = {
        id: editId,
        englishName: enValue,
        arabicName: arValue,
        sorting: sortValue ? parseInt(sortValue) : 1,
        ...(isSizeTab ? { width: widthValue ? parseFloat(widthValue) : 0, height: heightValue ? parseFloat(heightValue) : 0 } : {})
      };
      await updateRow(endpoint, editId, updatedData);
      setRows(rows.map(row =>
        row.id === editId
          ? { ...row, ...updatedData }
          : row
      ));
      setEditId(null);
      clearForm();
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditId(null);
    clearForm();
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
      <div className="overflow-x-auto bg-white rounded-xl border">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="px-4 py-2 font-semibold">En. Name</th>
              <th className="px-4 py-2 font-semibold">Ar. Name</th>
              <th className="px-4 py-2 font-semibold text-center">Sorting</th>
              {isSizeTab && <th className="px-4 py-2 font-semibold text-center">Width (cm)</th>}
              {isSizeTab && <th className="px-4 py-2 font-semibold text-center">Height (cm)</th>}
              <th className="px-4 py-2 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={isSizeTab ? 6 : 4} className="text-center py-6">Loading...</td>
              </tr>
            ) : (
              rows.length === 0 ? (
                <tr>
                  <td colSpan={isSizeTab ? 6 : 4} className="text-center text-gray-400 py-6">No data</td>
                </tr>
              ) : (
                rows.map(row =>
                  editId === row.id ? (
                    <tr key={row.id} className="border-t bg-yellow-50">
                      <td className="px-2 py-2">
                        <input
                          type="text"
                          className="w-full border rounded px-2 py-1 text-sm"
                          value={enValue}
                          onChange={e => setEnValue(e.target.value)}
                        />
                      </td>
                      <td className="px-2 py-2">
                        <input
                          type="text"
                          className="w-full border rounded px-2 py-1 text-sm"
                          value={arValue}
                          onChange={e => setArValue(e.target.value)}
                          dir="rtl"
                        />
                      </td>
                      <td className="px-2 py-2">
                        <input
                          type="number"
                          className="w-full border rounded px-2 py-1 text-center text-sm"
                          value={sortValue}
                          onChange={e => setSortValue(e.target.value)}
                          min="0"
                        />
                      </td>
                      {isSizeTab && (
                        <td className="px-2 py-2">
                          <input
                            type="number"
                            className="w-full border rounded px-2 py-1 text-center text-sm"
                            value={widthValue}
                            onChange={e => setWidthValue(e.target.value)}
                            step="0.1"
                            min="0"
                          />
                        </td>
                      )}
                      {isSizeTab && (
                        <td className="px-2 py-2">
                          <input
                            type="number"
                            className="w-full border rounded px-2 py-1 text-center text-sm"
                            value={heightValue}
                            onChange={e => setHeightValue(e.target.value)}
                            step="0.1"
                            min="0"
                          />
                        </td>
                      )}
                      <td className="px-2 py-2 text-center space-x-2">
                        <button
                          className="inline-flex items-center text-green-700 hover:text-green-900"
                          onClick={handleSaveEdit}
                          title="Save"
                        >
                          <Save size={16} />
                        </button>
                        <button
                          className="inline-flex items-center text-gray-500 hover:text-gray-900"
                          onClick={cancelEdit}
                          title="Cancel"
                        >
                          <X size={16} />
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={row.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">{row.englishName}</td>
                      <td className="px-4 py-2" dir="rtl">{row.arabicName}</td>
                      <td className="px-4 py-2 text-center">{row.sorting}</td>
                      {isSizeTab && <td className="px-4 py-2 text-center">{row.width || 0}</td>}
                      {isSizeTab && <td className="px-4 py-2 text-center">{row.height || 0}</td>}
                      <td className="px-4 py-2 text-center space-x-2">
                        <button
                          className="inline-flex items-center text-blue-600 hover:text-blue-800"
                          onClick={() => startEdit(row)}
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="inline-flex items-center text-red-600 hover:text-red-800"
                          onClick={() => handleDelete(row.id)}
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  )
                )
              )
            )}
            {/* Add row */}
            {editId === null && (
              <tr className="border-t bg-green-50">
                <td className="px-2 py-2">
                  <input
                    type="text"
                    placeholder="English Name"
                    className="w-full border rounded px-2 py-1 text-sm"
                    value={enValue}
                    onChange={e => setEnValue(e.target.value)}
                  />
                </td>
                <td className="px-2 py-2">
                  <input
                    type="text"
                    placeholder="الاسم العربي"
                    className="w-full border rounded px-2 py-1 text-sm"
                    value={arValue}
                    onChange={e => setArValue(e.target.value)}
                    dir="rtl"
                  />
                </td>
                <td className="px-2 py-2">
                  <input
                    type="number"
                    placeholder="Sort"
                    className="w-full border rounded px-2 py-1 text-center text-sm"
                    value={sortValue}
                    onChange={e => setSortValue(e.target.value)}
                    min="0"
                  />
                </td>
                {isSizeTab && (
                  <td className="px-2 py-2">
                    <input
                      type="number"
                      placeholder="Width"
                      className="w-full border rounded px-2 py-1 text-center text-sm"
                      value={widthValue}
                      onChange={e => setWidthValue(e.target.value)}
                      step="0.1"
                      min="0"
                    />
                  </td>
                )}
                {isSizeTab && (
                  <td className="px-2 py-2">
                    <input
                      type="number"
                      placeholder="Height"
                      className="w-full border rounded px-2 py-1 text-center text-sm"
                      value={heightValue}
                      onChange={e => setHeightValue(e.target.value)}
                      step="0.1"
                      min="0"
                    />
                  </td>
                )}
                <td className="px-2 py-2 text-center">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold px-3 py-1 rounded text-sm flex items-center gap-1"
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
    </div>
  );
}

const MediaSettings = () => {
  const [active, setActive] = useState(TABS[0].name);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Media Settings</h1>
        </div>

        <Tabs defaultValue={TABS[0].name} value={active} onValueChange={setActive} className="w-full">
          <TabsList className="w-full flex justify-start overflow-x-auto gap-1 mb-6 bg-gray-100 p-1 rounded-lg">
            {TABS.map((tab) => (
              <TabsTrigger
                key={tab.name}
                value={tab.name}
                className="flex-1 min-w-max px-3 py-2 rounded-md text-sm font-medium bg-white hover:bg-blue-50 transition data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {TABS.map((tab) => (
            <TabsContent
              key={tab.name}
              value={tab.name}
              className="bg-white rounded-xl shadow-sm p-6 min-h-[400px]"
            >
              <MediaSettingTab endpoint={tab.endpoint} tabName={tab.name} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default MediaSettings;