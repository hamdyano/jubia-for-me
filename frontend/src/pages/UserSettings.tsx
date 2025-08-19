import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  mobile: string;
  email: string;
  jobTitle: string;
  type: string;
  roles: string;
  userName: string;
  creationDate: string;
  lastLoginDate: string;
  isActive: boolean;
}

const UserSettings: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      firstName: 'Mohamed',
      lastName: 'Hamdy',
      name: 'Mohamed Hamdy',
      mobile: '+201010979717',
      email: 'hamdyano993@gmail.com',
      jobTitle: 'Software Developer',
      type: 'Admin',
      roles: ['Delivery', 'Orders', 'ShippingSettings', 'CustomerService', 'Dashboard', 'Products', 'ManageOrders', 'Shipping', 'Maintenance', 'PrintBureau', 'Users_Management', 'Customers', 'QC', 'Reports', 'Production', 'General_Settings', 'Marketing'].join(', '),
      userName: 'mhamdy',
      creationDate: '18/05/2025, 01:51:59',
      lastLoginDate: '19/08/2025, 16:40:45',
      isActive: true
    },
    {
      id: '2',
      firstName: 'Hany',
      lastName: 'Ben',
      name: 'Hany Ben',
      mobile: '01001332277',
      email: 'hany.ben@gmail.com',
      jobTitle: 'GM',
      type: 'owner',
      roles: ['Media', 'Services', 'User settings'].join(', '),
      userName: 'hanyb',
      creationDate: '20/05/2025',
      lastLoginDate: '21/05/2025',
      isActive: true
    }
  ]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    name: '',
    mobile: '',
    email: '',
    jobTitle: '',
    type: '',
    roles: '',
    userName: ''
  });

  const [showDeleted, setShowDeleted] = useState(false);
  const [showActive, setShowActive] = useState(true);
  const [entriesPerPage, setEntriesPerPage] = useState(50);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState<string | null>(null);

  const jobTitleOptions = [
    'Software Developer',
    'GM',
    'Manager',
    'Team Lead',
    'Designer',
    'QA Engineer'
  ];

  const typeOptions = [
    'Admin',
    'User',
    'Owner',
    'Manager'
  ];

  const roleOptions = [
    'Delivery', 'Orders', 'ShippingSettings', 'CustomerService',
    'Dashboard', 'Products', 'ManageOrders', 'Shipping',
    'Maintenance', 'PrintBureau', 'Users_Management', 'Customers',
    'QC', 'Reports', 'Production', 'General_Settings', 'Marketing',
    'Media', 'Services', 'User settings'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-generate name from first and last name
    if (name === 'firstName' || name === 'lastName') {
      const firstName = name === 'firstName' ? value : formData.firstName;
      const lastName = name === 'lastName' ? value : formData.lastName;
      setFormData(prev => ({
        ...prev,
        name: `${firstName} ${lastName}`.trim()
      }));
    }
  };

  const handleRoleChange = (role: string) => {
    setFormData(prev => ({
      ...prev,
      roles: role
    }));
  };

  const handleSubmit = () => {
    
    if (editingUser) {
      // Update existing user
      setUsers(prev => prev.map(user => 
        user.id === editingUser 
          ? {
              ...user,
              ...formData,
              firstName: formData.firstName,
              lastName: formData.lastName
            }
          : user
      ));
      setEditingUser(null);
    } else {
      // Add new user
      const newUser: User = {
        id: Date.now().toString(),
        ...formData,
        firstName: formData.firstName,
        lastName: formData.lastName,
        creationDate: new Date().toLocaleString('en-GB'),
        lastLoginDate: 'Never',
        isActive: true
      };
      setUsers(prev => [...prev, newUser]);
    }

    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      name: '',
      mobile: '',
      email: '',
      jobTitle: '',
      type: '',
      roles: '',
      userName: ''
    });
  };

  const handleEdit = (user: User) => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      name: user.name,
      mobile: user.mobile,
      email: user.email,
      jobTitle: user.jobTitle,
      type: user.type,
      roles: user.roles,
      userName: user.userName
    });
    setEditingUser(user.id);
  };

  const handleDelete = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, isActive: false } : user
    ));
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, isActive: !user.isActive } : user
    ));
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.mobile.includes(searchTerm);
    const matchesStatus = showActive ? user.isActive : !user.isActive;
    return matchesSearch && (showDeleted || matchesStatus);
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-blue-500 text-white px-6 py-3 rounded-t-lg">
          <h1 className="text-xl font-semibold">User Data</h1>
        </div>

        {/* Form Section */}
        <div className="bg-white p-6 shadow-sm">
          <div className="space-y-6">
            {/* First Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Third Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title
                </label>
                <select
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select</option>
                  {jobTitleOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select</option>
                  {typeOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User Name
                </label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Roles Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Roles
              </label>
              <select
                name="roles"
                value={formData.roles}
                onChange={(e) => handleRoleChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Multi Selections</option>
                {roleOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md flex items-center space-x-2 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>{editingUser ? 'Update' : 'Save'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white px-6 py-4 border-t flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showDeleted}
                onChange={(e) => setShowDeleted(e.target.checked)}
                className="rounded border-gray-300"
              />
              <span className="text-sm">Show deleted</span>
            </label>
            <div className="flex items-center space-x-2">
              <span className="text-sm">Show</span>
              <select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="text-sm">entries</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm">Search:</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-sm w-48"
              placeholder="Search users..."
            />
          </div>
        </div>

        {/* Filter Toggle */}
        <div className="bg-white px-6 py-2 border-t">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowActive(true)}
              className={`px-3 py-1 text-sm rounded ${showActive ? 'bg-blue-500 text-white' : 'text-blue-500'}`}
            >
              Show Active
            </button>
            <button
              onClick={() => setShowActive(false)}
              className={`px-3 py-1 text-sm rounded ${!showActive ? 'bg-blue-500 text-white' : 'text-blue-500'}`}
            >
              Show All
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow-sm overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Job Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Mobile</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Roles</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Creation Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Last Login</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.slice(0, entriesPerPage).map(user => (
                <tr key={user.id} className={`${user.isActive ? 'bg-white' : 'bg-gray-100'} hover:bg-gray-50`}>
                  <td className="px-4 py-3 text-sm">{user.name}</td>
                  <td className="px-4 py-3 text-sm">{user.jobTitle}</td>
                  <td className="px-4 py-3 text-sm">{user.mobile}</td>
                  <td className="px-4 py-3 text-sm">{user.email}</td>
                  <td className="px-4 py-3 text-sm">{user.type}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="inline-block bg-gray-200 rounded px-2 py-1 text-xs">
                      {user.roles}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{user.creationDate}</td>
                  <td className="px-4 py-3 text-sm">{user.lastLoginDate}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <span className="text-gray-400">|</span>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`${user.isActive ? 'text-yellow-600 hover:text-yellow-800' : 'text-green-600 hover:text-green-800'}`}
                        title={user.isActive ? 'Deactivate' : 'Activate'}
                      >
                        {user.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No users found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSettings;