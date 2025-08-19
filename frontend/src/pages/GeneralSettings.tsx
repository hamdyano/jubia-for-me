import React, { useState } from 'react';
import { Edit2, Trash2, Plus, Save, RotateCcw } from 'lucide-react';

interface GeneralSetting {
  id: number;
  enName: string;
  arName: string;
  sorting: number;
  email: boolean;
  whatsapp: boolean;
  message: boolean;
}

const GeneralSettings: React.FC = () => {
  const [settings, setSettings] = useState<GeneralSetting[]>([
    { id: 1, enName: 'Company Name', arName: 'اسم الشركة', sorting: 1, email: true, whatsapp: false, message: true },
    { id: 2, enName: 'Email', arName: 'البريد الإلكتروني', sorting: 2, email: true, whatsapp: true, message: false },
    { id: 3, enName: 'Phone', arName: 'الهاتف', sorting: 3, email: false, whatsapp: true, message: true },
    { id: 4, enName: 'Address', arName: 'العنوان', sorting: 4, email: true, whatsapp: false, message: false },
    { id: 5, enName: 'Working Hours', arName: 'ساعات العمل', sorting: 5, email: false, whatsapp: false, message: true },
  ]);

  const [newSetting, setNewSetting] = useState({
    enName: '',
    arName: '',
    sorting: settings.length + 1,
    email: false,
    whatsapp: false,
    message: false
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<GeneralSetting | null>(null);
  const [, setHasModifications] = useState(false);

  const handleAdd = () => {
    if (newSetting.enName && newSetting.arName) {
      const newItem: GeneralSetting = {
        id: Math.max(...settings.map(s => s.id), 0) + 1,
        ...newSetting
      };
      setSettings([...settings, newItem]);
      setNewSetting({
        enName: '',
        arName: '',
        sorting: settings.length + 2,
        email: false,
        whatsapp: false,
        message: false
      });
      setHasModifications(true);
    }
  };

  const handleEdit = (setting: GeneralSetting) => {
    setEditingId(setting.id);
    setEditForm({ ...setting });
  };

  const handleSaveEdit = () => {
    if (editForm) {
      setSettings(settings.map(s => 
        s.id === editForm.id ? editForm : s
      ));
      setEditingId(null);
      setEditForm(null);
      setHasModifications(true);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleDelete = (id: number) => {
    setSettings(settings.filter(s => s.id !== id));
    setHasModifications(true);
  };



  const toggleCheckbox = (id: number, field: 'email' | 'whatsapp' | 'message') => {
    setSettings(settings.map(s => 
      s.id === id ? { ...s, [field]: !s[field] } : s
    ));
    setHasModifications(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">General Settings</h1>
          <p className="text-gray-600 mt-2">Order Status Notification</p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-lg shadow-sm">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Table Header */}
              <thead>
                <tr className="bg-blue-500">
                  <th className="px-6 py-4 text-left text-white font-semibold rounded-tl-lg">En. Name</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Ar. Name</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">Sorting</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">Email</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">WhatsApp</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">Message</th>
                  <th className="px-6 py-4 text-center text-white font-semibold rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody className="divide-y divide-gray-200">
                {settings.map((setting) => (
                  <tr key={setting.id} className="hover:bg-gray-50 transition-colors">
                    {editingId === setting.id ? (
                      <>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            value={editForm?.enName || ''}
                            onChange={(e) => setEditForm(prev => prev ? {...prev, enName: e.target.value} : null)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            value={editForm?.arName || ''}
                            onChange={(e) => setEditForm(prev => prev ? {...prev, arName: e.target.value} : null)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            dir="rtl"
                          />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <input
                            type="number"
                            value={editForm?.sorting || ''}
                            onChange={(e) => setEditForm(prev => prev ? {...prev, sorting: parseInt(e.target.value)} : null)}
                            className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                          />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <input
                            type="checkbox"
                            checked={editForm?.email || false}
                            onChange={(e) => setEditForm(prev => prev ? {...prev, email: e.target.checked} : null)}
                            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <input
                            type="checkbox"
                            checked={editForm?.whatsapp || false}
                            onChange={(e) => setEditForm(prev => prev ? {...prev, whatsapp: e.target.checked} : null)}
                            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <input
                            type="checkbox"
                            checked={editForm?.message || false}
                            onChange={(e) => setEditForm(prev => prev ? {...prev, message: e.target.checked} : null)}
                            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={handleSaveEdit}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                            >
                              <Save className="w-5 h-5" />
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                            >
                              <RotateCcw className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4 text-gray-900">{setting.enName}</td>
                        <td className="px-6 py-4 text-gray-900" dir="rtl">{setting.arName}</td>
                        <td className="px-6 py-4 text-center text-gray-900">{setting.sorting}</td>
                        <td className="px-6 py-4 text-center">
                          <input
                            type="checkbox"
                            checked={setting.email}
                            onChange={() => toggleCheckbox(setting.id, 'email')}
                            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                          />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <input
                            type="checkbox"
                            checked={setting.whatsapp}
                            onChange={() => toggleCheckbox(setting.id, 'whatsapp')}
                            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                          />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <input
                            type="checkbox"
                            checked={setting.message}
                            onChange={() => toggleCheckbox(setting.id, 'message')}
                            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleEdit(setting)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                            >
                              <Edit2 className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(setting.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
                
                {/* Add New Row */}
                <tr className="bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      placeholder="English Name"
                      value={newSetting.enName}
                      onChange={(e) => setNewSetting({...newSetting, enName: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      placeholder="الاسم العربي"
                      value={newSetting.arName}
                      onChange={(e) => setNewSetting({...newSetting, arName: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      dir="rtl"
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input
                      type="number"
                      placeholder="Sort"
                      value={newSetting.sorting}
                      onChange={(e) => setNewSetting({...newSetting, sorting: parseInt(e.target.value)})}
                      className="w-20 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={newSetting.email}
                      onChange={(e) => setNewSetting({...newSetting, email: e.target.checked})}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={newSetting.whatsapp}
                      onChange={(e) => setNewSetting({...newSetting, whatsapp: e.target.checked})}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={newSetting.message}
                      onChange={(e) => setNewSetting({...newSetting, message: e.target.checked})}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={handleAdd}
                      className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors font-medium flex items-center gap-2 mx-auto"
                    >
                      <Plus className="w-4 h-4" />
                      Add
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;