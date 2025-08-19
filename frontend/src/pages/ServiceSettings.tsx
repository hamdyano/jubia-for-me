import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Edit, Trash2, Save, X, Plus, List } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import {
  SERVICE_TABS,
  ServiceSettingRow,
  AttributeDetail,
  fetchRows,
  createRow,
  updateRow,
  deleteRow,
  fetchAttributeDetails,
  createAttributeDetail,
  updateAttributeDetail,
  deleteAttributeDetail
} from "@/APIs/api-ServiceSettings";

function ServiceTab({ endpoint, isAttributeTab }: { endpoint: string; isAttributeTab: boolean }) {
  const [rows, setRows] = useState<ServiceSettingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state for main table
  const [enValue, setEnValue] = useState("");
  const [arValue, setArValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  // Popover state for attribute details
  const [popoverOpenId, setPopoverOpenId] = useState<number | null>(null);
  const [attributeDetails, setAttributeDetails] = useState<AttributeDetail[]>([]);
  const [detailEditId, setDetailEditId] = useState<number | null>(null);
  const [detailEn, setDetailEn] = useState("");
  const [detailAr, setDetailAr] = useState("");
  const [detailSort, setDetailSort] = useState("");

  // Fetch all rows
  const loadRows = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRows(endpoint);
      setRows(data);
    } catch (err: any) {
      setError(err.message || "Load error");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadRows();
    // eslint-disable-next-line
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
      setError(err.message || "Add error");
    }
  };

  // Edit row
  const startEdit = (row: ServiceSettingRow) => {
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
      setError(err.message || "Edit error");
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
      setError(err.message || "Delete error");
    }
  };

  // Popover for attribute details
  const openPopover = async (attributeId: number) => {
    setPopoverOpenId(attributeId);
    setDetailEditId(null);
    try {
      const details = await fetchAttributeDetails(attributeId);
      setAttributeDetails(details);
    } catch (err: any) {
      setAttributeDetails([]);
    }
    setDetailEn(""); setDetailAr(""); setDetailSort("");
  };

  const closePopover = () => {
    setPopoverOpenId(null);
    setAttributeDetails([]);
    setDetailEditId(null);
    setDetailEn(""); setDetailAr(""); setDetailSort("");
  };

  // Add attribute detail
  const handleAddDetail = async () => {
    if (!detailEn && !detailAr && !detailSort) return;
    const attributeId = popoverOpenId;
    if (!attributeId) return;
    try {
      const newDetail = await createAttributeDetail(attributeId, {
        englishName: detailEn || "-",
        arabicName: detailAr || "-",
        sorting: detailSort ? parseInt(detailSort) : (attributeDetails.length ? Math.max(...attributeDetails.map(d => d.sorting)) + 1 : 1),
      });
      setAttributeDetails([...attributeDetails, newDetail]);
      setDetailEn(""); setDetailAr(""); setDetailSort("");
    } catch {
      // Handle error if needed
    }
  };

  // Edit attribute detail
  const startEditDetail = (detail: AttributeDetail) => {
    setDetailEditId(detail.id);
    setDetailEn(detail.englishName);
    setDetailAr(detail.arabicName);
    setDetailSort(detail.sorting.toString());
  };

  const handleSaveDetailEdit = async () => {
    if (detailEditId == null || !popoverOpenId) return;
    try {
      await updateAttributeDetail(detailEditId, {
        englishName: detailEn,
        arabicName: detailAr,
        sorting: detailSort ? parseInt(detailSort) : 1,
        serviceAttributeId: popoverOpenId,
      });
      setAttributeDetails(attributeDetails.map(detail =>
        detail.id === detailEditId
          ? { ...detail, englishName: detailEn, arabicName: detailAr, sorting: detailSort ? parseInt(detailSort) : 1 }
          : detail
      ));
      setDetailEditId(null);
      setDetailEn(""); setDetailAr(""); setDetailSort("");
    } catch {
      // Handle error if needed
    }
  };

  const cancelDetailEdit = () => {
    setDetailEditId(null);
    setDetailEn(""); setDetailAr(""); setDetailSort("");
  };

  // Delete attribute detail
  const handleDeleteDetail = async (detailId: number) => {
    try {
      await deleteAttributeDetail(detailId);
      setAttributeDetails(attributeDetails.filter(d => d.id !== detailId));
    } catch {
      // Handle error if needed
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
              {isAttributeTab && <th className="px-4 py-2 font-semibold">Details</th>}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={isAttributeTab ? 5 : 4} className="text-center py-6">Loading...</td>
              </tr>
            ) : (
              rows.length === 0 ? (
                <tr>
                  <td colSpan={isAttributeTab ? 5 : 4} className="text-center text-gray-400 py-6">No data</td>
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
                      {isAttributeTab && <td className="px-2 py-2"></td>}
                    </tr>
                  ) : (
                    <tr key={row.id} className="border-t">
                      <td className="px-4 py-2">{row.englishName}</td>
                      <td className="px-4 py-2" dir="rtl">{row.arabicName}</td>
                      <td className="px-4 py-2 text-center">{row.sorting}</td>
                      <td className="px-4 py-2 text-center space-x-2 flex gap-1">
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
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-2 py-1 rounded"
                          onClick={handleSaveEdit}
                          title="Save"
                          disabled={editId !== row.id}
                          style={{ display: editId === row.id ? "inline-flex" : "none" }}
                        >
                          <Save size={16} />
                        </button>
                      </td>
                      {isAttributeTab && (
                        <td className="px-4 py-2 text-center">
                          {/* Details popover */}
                          <Popover open={popoverOpenId === row.id} onOpenChange={open => !open && closePopover()}>
                            <PopoverTrigger asChild>
                              <button
                                className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                                onClick={() => openPopover(row.id)}
                                title="Details"
                              >
                                <List size={18} />
                              </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[480px]">
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-semibold">
                                    Attribute Details: <span className="bg-yellow-100 px-1 text-yellow-700">{row.englishName}</span>
                                  </span>
                                  <button
                                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
                                    onClick={closePopover}
                                  >
                                    Close
                                  </button>
                                </div>
                                <table className="w-full border rounded-lg bg-gray-50 mb-2">
                                  <thead className="bg-blue-100">
                                    <tr>
                                      <th className="p-1">id</th>
                                      <th className="p-1">En. Name</th>
                                      <th className="p-1">Ar. Name</th>
                                      <th className="p-1">Sorting</th>
                                      <th className="p-1">Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {attributeDetails.map(detail =>
                                      detailEditId === detail.id ? (
                                        <tr key={detail.id} className="bg-yellow-50">
                                          <td className="p-1">{detail.id}</td>
                                          <td className="p-1">
                                            <input
                                              type="text"
                                              className="border rounded px-1 py-0.5"
                                              value={detailEn}
                                              onChange={e => setDetailEn(e.target.value)}
                                            />
                                          </td>
                                          <td className="p-1">
                                            <input
                                              type="text"
                                              className="border rounded px-1 py-0.5"
                                              value={detailAr}
                                              onChange={e => setDetailAr(e.target.value)}
                                              dir="rtl"
                                            />
                                          </td>
                                          <td className="p-1">
                                            <input
                                              type="number"
                                              className="border rounded px-1 py-0.5 w-12 text-center"
                                              value={detailSort}
                                              onChange={e => setDetailSort(e.target.value)}
                                            />
                                          </td>
                                          <td className="p-1 flex gap-1">
                                            <button
                                              className="inline-flex items-center text-green-700 hover:text-green-900"
                                              onClick={handleSaveDetailEdit}
                                              title="Save"
                                            >
                                              <Save size={16} />
                                            </button>
                                            <button
                                              className="inline-flex items-center text-gray-500 hover:text-gray-900"
                                              onClick={cancelDetailEdit}
                                              title="Cancel"
                                            >
                                              <X size={16} />
                                            </button>
                                          </td>
                                        </tr>
                                      ) : (
                                        <tr key={detail.id}>
                                          <td className="p-1">{detail.id}</td>
                                          <td className="p-1">{detail.englishName}</td>
                                          <td className="p-1">{detail.arabicName}</td>
                                          <td className="p-1">{detail.sorting}</td>
                                          <td className="p-1 flex gap-1">
                                            <button
                                              className="inline-flex items-center text-blue-600 hover:text-blue-800"
                                              onClick={() => startEditDetail(detail)}
                                              title="Edit"
                                            >
                                              <Edit size={16} />
                                            </button>
                                            <button
                                              className="inline-flex items-center text-red-600 hover:text-red-800"
                                              onClick={() => handleDeleteDetail(detail.id)}
                                              title="Delete"
                                            >
                                              <Trash2 size={16} />
                                            </button>
                                          </td>
                                        </tr>
                                      )
                                    )}
                                    {/* Add new detail row */}
                                    {detailEditId === null && (
                                      <tr>
                                        <td className="p-1"></td>
                                        <td className="p-1">
                                          <input
                                            type="text"
                                            placeholder="English Name"
                                            className="border rounded px-1 py-0.5"
                                            value={detailEn}
                                            onChange={e => setDetailEn(e.target.value)}
                                          />
                                        </td>
                                        <td className="p-1">
                                          <input
                                            type="text"
                                            placeholder="الاسم العربي"
                                            className="border rounded px-1 py-0.5"
                                            value={detailAr}
                                            onChange={e => setDetailAr(e.target.value)}
                                            dir="rtl"
                                          />
                                        </td>
                                        <td className="p-1">
                                          <input
                                            type="number"
                                            placeholder="Sort"
                                            className="border rounded px-1 py-0.5 w-12 text-center"
                                            value={detailSort}
                                            onChange={e => setDetailSort(e.target.value)}
                                          />
                                        </td>
                                        <td className="p-1 flex gap-1">
                                          <button
                                            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-2 py-1 rounded"
                                            onClick={handleAddDetail}
                                            title="Add"
                                          >
                                            <Plus size={15} />
                                          </button>
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </td>
                      )}
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
                {isAttributeTab && <td className="px-2 py-2"></td>}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const ServiceSettings = () => {
  const [active, setActive] = useState(SERVICE_TABS[0].name);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Service Settings</h1>
        <Tabs defaultValue={SERVICE_TABS[0].name} value={active} onValueChange={setActive} className="w-full">
          <TabsList className="w-full flex justify-start overflow-x-auto gap-2 mb-6">
            {SERVICE_TABS.map(tab => (
              <TabsTrigger
                key={tab.name}
                value={tab.name}
                className="flex-1 min-w-max px-4 py-2 rounded-lg text-md font-semibold bg-white hover:bg-blue-50 transition"
              >
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {SERVICE_TABS.map(tab => (
            <TabsContent
              key={tab.name}
              value={tab.name}
              className="bg-white rounded-xl shadow p-8 min-h-[300px]"
            >
              <ServiceTab
                endpoint={tab.endpoint}
                isAttributeTab={tab.name === "Attributes"}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default ServiceSettings;