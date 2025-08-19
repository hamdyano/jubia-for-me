import React, { useState, useEffect } from 'react';
import { Edit, Eye, Save } from 'lucide-react';

interface MediaItem {
  id: string;
  category: string;
  kind: string;
  size: string;
  weight: string;
  surface: string;
  color: string;
  shape: string;
  thickness: string;
  brand: string;
  tradingUnit: string;
  packageUnit: string;
  productionUnit: string;
  invoicingCode: string;
  invoicingCodeType: string;
  bindingCapacity?: string;
  mediaThickness?: string;
}

interface FilterState {
  category: string;
  kind: string;
  size: string;
  weight: string;
  surface: string;
  color: string;
  shape: string;
  thickness: string;
  brand: string;
  tradingUnit: string;
  packageUnit: string;
  productionUnit: string;
  invoicingCodeType: string;
  invoicingCode: string;
}

const MediaManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('media');
  const [searchTerm, setSearchTerm] = useState('');
  const [allMediaData, setAllMediaData] = useState<MediaItem[]>([]);
  const [filteredData, setFilteredData] = useState<MediaItem[]>([]);

  const [filters, setFilters] = useState<FilterState>({
    category: '',
    kind: '',
    size: '',
    weight: '',
    surface: '',
    color: '',
    shape: '',
    thickness: '',
    brand: '',
    tradingUnit: '',
    packageUnit: '',
    productionUnit: '',
    invoicingCodeType: '',
    invoicingCode: ''
  });

  // Complete sample data initialization
  useEffect(() => {
    const sampleData: MediaItem[] = [
      {
        id: '1',
        category: 'Paper',
        kind: 'Plain',
        size: 'A3 (29.7x42 cm)',
        weight: '80gm',
        surface: '-',
        color: 'Yellow',
        shape: '-',
        thickness: '-',
        brand: '-',
        tradingUnit: 'Count',
        packageUnit: 'Sheet',
        productionUnit: 'Sheet',
        invoicingCode: '',
        invoicingCodeType: ''
      },
      {
        id: '2',
        category: 'Paper',
        kind: 'Plain',
        size: 'A5 (14.8x21)',
        weight: '80gm',
        surface: '-',
        color: 'Cyan',
        shape: '-',
        thickness: '-',
        brand: '-',
        tradingUnit: 'Count',
        packageUnit: 'Sheet',
        productionUnit: 'Sheet',
        invoicingCode: '',
        invoicingCodeType: ''
      },
      {
        id: '3',
        category: 'Paper',
        kind: 'Plain',
        size: 'A3 (29.7x42 cm)',
        weight: '80gm',
        surface: '-',
        color: 'Beige',
        shape: '-',
        thickness: '-',
        brand: '-',
        tradingUnit: 'Count',
        packageUnit: 'Sheet',
        productionUnit: 'Sheet',
        invoicingCode: '',
        invoicingCodeType: ''
      },
      {
        id: '4',
        category: 'Paper',
        kind: 'Plain',
        size: 'A5 (14.8x21)',
        weight: '80gm',
        surface: '-',
        color: 'Orange',
        shape: '-',
        thickness: '-',
        brand: '-',
        tradingUnit: 'Count',
        packageUnit: 'Sheet',
        productionUnit: 'Sheet',
        invoicingCode: '',
        invoicingCodeType: ''
      },
      {
        id: '5',
        category: 'Paper',
        kind: 'Plain',
        size: 'A3 (29.7x42 cm)',
        weight: '80gm',
        surface: '-',
        color: 'Magenta',
        shape: '-',
        thickness: '-',
        brand: '-',
        tradingUnit: 'Count',
        packageUnit: 'Sheet',
        productionUnit: 'Sheet',
        invoicingCode: '',
        invoicingCodeType: ''
      },
      {
        id: '6',
        category: 'Paper',
        kind: 'Plain',
        size: 'A5 (14.8x21)',
        weight: '80gm',
        surface: '-',
        color: 'Rose',
        shape: '-',
        thickness: '-',
        brand: '-',
        tradingUnit: 'Count',
        packageUnit: 'Sheet',
        productionUnit: 'Sheet',
        invoicingCode: '',
        invoicingCodeType: ''
      },
      {
        id: '7',
        category: 'Paper',
        kind: 'Plain',
        size: 'A3 (29.7x42 cm)',
        weight: '80gm',
        surface: '-',
        color: 'Red',
        shape: '-',
        thickness: '-',
        brand: '-',
        tradingUnit: 'Count',
        packageUnit: 'Sheet',
        productionUnit: 'Sheet',
        invoicingCode: '',
        invoicingCodeType: ''
      },
      {
        id: '8',
        category: 'Paper',
        kind: 'Plain',
        size: 'A4 (21x29.7 cm)',
        weight: '80gm',
        surface: '-',
        color: 'Magenta',
        shape: '-',
        thickness: '-',
        brand: '-',
        tradingUnit: 'Count',
        packageUnit: 'Sheet',
        productionUnit: 'Sheet',
        invoicingCode: '',
        invoicingCodeType: ''
      },
      {
        id: '9',
        category: 'Paper',
        kind: 'Plain',
        size: 'A6 (10.5x14.8)',
        weight: '80gm',
        surface: '-',
        color: 'Yellow',
        shape: '-',
        thickness: '-',
        brand: '-',
        tradingUnit: 'Count',
        packageUnit: 'Sheet',
        productionUnit: 'Sheet',
        invoicingCode: '',
        invoicingCodeType: ''
      },
      {
        id: '10',
        category: 'Binders',
        kind: 'Easy Bind',
        size: 'A4 (21x29.7 cm)',
        weight: '-',
        surface: '-',
        color: '-',
        shape: '-',
        thickness: '4.5mm',
        brand: 'Mintra',
        tradingUnit: 'Count',
        packageUnit: 'Piece ,50 pcs Pack',
        productionUnit: 'Piece',
        invoicingCode: '',
        invoicingCodeType: '',
        bindingCapacity: 'Long Sheet 90'
      },
      {
        id: '11',
        category: 'Sticker',
        kind: 'Custom',
        size: '-',
        weight: '-',
        surface: 'Glossy',
        color: 'White',
        shape: '-',
        thickness: '-',
        brand: '-',
        tradingUnit: 'Count',
        packageUnit: 'Sheet',
        productionUnit: 'Sheet',
        invoicingCode: '',
        invoicingCodeType: ''
      },
      {
        id: '12',
        category: 'Sticker',
        kind: 'Sticker sliced back',
        size: 'A4 (21x29.7 cm)',
        weight: '-',
        surface: 'Glossy',
        color: 'White',
        shape: '-',
        thickness: '-',
        brand: '-',
        tradingUnit: 'Count',
        packageUnit: 'Sheet',
        productionUnit: 'Sheet',
        invoicingCode: '',
        invoicingCodeType: ''
      },
      {
        id: '13',
        category: 'Sticker',
        kind: 'Sticker sliced back',
        size: 'A3 (29.7x42 cm)',
        weight: '-',
        surface: 'Glossy',
        color: 'White',
        shape: '-',
        thickness: '-',
        brand: '-',
        tradingUnit: 'Count',
        packageUnit: 'Sheet',
        productionUnit: 'Sheet',
        invoicingCode: '',
        invoicingCodeType: ''
      }
    ];
    setAllMediaData(sampleData);
  }, []);

  const handleFilterChange = (filterType: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleGenerateMediaList = () => {
    let filtered = allMediaData;

    // Apply filters
    if (filters.category) {
      filtered = filtered.filter(item => item.category === filters.category);
    }
    if (filters.kind) {
      filtered = filtered.filter(item => item.kind === filters.kind);
    }
    if (filters.size) {
      filtered = filtered.filter(item => item.size === filters.size);
    }
    if (filters.weight) {
      filtered = filtered.filter(item => item.weight === filters.weight);
    }
    if (filters.surface) {
      filtered = filtered.filter(item => item.surface === filters.surface);
    }
    if (filters.color) {
      filtered = filtered.filter(item => item.color === filters.color);
    }
    if (filters.shape) {
      filtered = filtered.filter(item => item.shape === filters.shape);
    }
    if (filters.thickness) {
      filtered = filtered.filter(item => item.thickness === filters.thickness);
    }
    if (filters.brand) {
      filtered = filtered.filter(item => item.brand === filters.brand);
    }
    if (filters.tradingUnit) {
      filtered = filtered.filter(item => item.tradingUnit === filters.tradingUnit);
    }
    if (filters.packageUnit) {
      filtered = filtered.filter(item => item.packageUnit === filters.packageUnit);
    }
    if (filters.productionUnit) {
      filtered = filtered.filter(item => item.productionUnit === filters.productionUnit);
    }
    if (filters.invoicingCodeType) {
      filtered = filtered.filter(item => item.invoicingCodeType === filters.invoicingCodeType);
    }
    if (filters.invoicingCode) {
      filtered = filtered.filter(item => 
        item.invoicingCode.toLowerCase().includes(filters.invoicingCode.toLowerCase())
      );
    }

    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(item => 
        Object.values(item).some(value => 
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    setFilteredData(filtered);
  };

  // Get unique values for dropdowns
  const getUniqueValues = (key: keyof MediaItem): string[] => {
    const values = allMediaData
      .map(item => item[key])
      .filter((value): value is string => typeof value === 'string' && value !== '-');
    return [...new Set(values)];
  };

  const handleExport = () => {
    console.log('Exporting data...');
  };

  const renderMediaTab = () => (
    <div className="space-y-6">
      {/* Filters Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="">Select</option>
              {getUniqueValues('category').map(value => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kind</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.kind}
              onChange={(e) => handleFilterChange('kind', e.target.value)}
            >
              <option value="">nothing selected</option>
              {getUniqueValues('kind').map(value => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.size}
              onChange={(e) => handleFilterChange('size', e.target.value)}
            >
              <option value="">nothing selected</option>
              {getUniqueValues('size').map(value => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.weight}
              onChange={(e) => handleFilterChange('weight', e.target.value)}
            >
              <option value="">nothing selected</option>
              {getUniqueValues('weight').map(value => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Surface</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.surface}
              onChange={(e) => handleFilterChange('surface', e.target.value)}
            >
              <option value="">nothing selected</option>
              {getUniqueValues('surface').map(value => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.color}
              onChange={(e) => handleFilterChange('color', e.target.value)}
            >
              <option value="">nothing selected</option>
              {getUniqueValues('color').map(value => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Shape</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.shape}
              onChange={(e) => handleFilterChange('shape', e.target.value)}
            >
              <option value="">nothing selected</option>
              {getUniqueValues('shape').map(value => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Thickness</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.thickness}
              onChange={(e) => handleFilterChange('thickness', e.target.value)}
            >
              <option value="">nothing selected</option>
              {getUniqueValues('thickness').map(value => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.brand}
              onChange={(e) => handleFilterChange('brand', e.target.value)}
            >
              <option value="">nothing selected</option>
              {getUniqueValues('brand').map(value => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Trading Unit</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.tradingUnit}
              onChange={(e) => handleFilterChange('tradingUnit', e.target.value)}
            >
              <option value="">Select</option>
              {getUniqueValues('tradingUnit').map(value => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Package Unit</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.packageUnit}
              onChange={(e) => handleFilterChange('packageUnit', e.target.value)}
            >
              <option value="">nothing selected</option>
              {getUniqueValues('packageUnit').map(value => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Production Unit</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.productionUnit}
              onChange={(e) => handleFilterChange('productionUnit', e.target.value)}
            >
              <option value="">Select</option>
              {getUniqueValues('productionUnit').map(value => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Invoicing Code</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.invoicingCode}
              onChange={(e) => handleFilterChange('invoicingCode', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Invoicing Code Type</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.invoicingCodeType}
              onChange={(e) => handleFilterChange('invoicingCodeType', e.target.value)}
            >
              <option value="">Select</option>
              {getUniqueValues('invoicingCodeType').map(value => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            <Save size={16} />
          </button>
          <button 
            onClick={handleGenerateMediaList}

             className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors font-medium flex  gap-2 mx-auto text-white hover:bg-orange-700 hover:text-white transition duration-300 ease-in-out rounded-md"
          >
            Generate Media List
          </button>
        </div>
      </div>



      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">   
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show</span>
            <select className="border border-gray-300 rounded px-2 py-1 text-sm">
              <option>50</option>
              <option>100</option>
              <option>200</option>
            </select>
            <span className="text-sm text-gray-600">entries</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Search:</span>
            <input
              type="text"
              className="border border-gray-300 rounded px-3 py-1 text-sm w-48"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-4 py-3 text-left text-sm font-semibold">Category</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Kind</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Size</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Weight</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Surface</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Color</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Shape</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Thickness</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Brand</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Trading Unit</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Package Unit</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Production Unit</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-4 py-3 text-sm">{item.category}</td>
                  <td className="px-4 py-3 text-sm">{item.kind}</td>
                  <td className="px-4 py-3 text-sm">{item.size}</td>
                  <td className="px-4 py-3 text-sm">{item.weight}</td>
                  <td className="px-4 py-3 text-sm">{item.surface}</td>
                  <td className="px-4 py-3 text-sm">{item.color}</td>
                  <td className="px-4 py-3 text-sm">{item.shape}</td>
                  <td className="px-4 py-3 text-sm">{item.thickness}</td>
                  <td className="px-4 py-3 text-sm">{item.brand}</td>
                  <td className="px-4 py-3 text-sm">{item.tradingUnit}</td>
                  <td className="px-4 py-3 text-sm">{item.packageUnit}</td>
                  <td className="px-4 py-3 text-sm">{item.productionUnit}</td>
                  <td className="px-4 py-3">
                    <button className="p-1 text-yellow-600 hover:bg-yellow-100 rounded">
                      <Edit size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={13} className="px-4 py-8 text-center text-gray-500">
                    No data found. Click "Generate Media List" to display results based on your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderBindingCapacityTab = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select className="w-48 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Paper</option>
            <option>Sticker</option>
            <option>Binders</option>
          </select>
        </div>
        <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
          <Save size={16} />
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-4 py-3 text-left text-sm font-semibold">Kind</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Weight</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Shape</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Thick.</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Brand</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Binding Capacity</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.filter(item => item.bindingCapacity).map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-4 py-3 text-sm">{item.kind}</td>
                  <td className="px-4 py-3 text-sm">{item.weight}</td>
                  <td className="px-4 py-3 text-sm">{item.shape}</td>
                  <td className="px-4 py-3 text-sm">{item.thickness}</td>
                  <td className="px-4 py-3 text-sm">{item.brand}</td>
                  <td className="px-4 py-3 text-sm">{item.bindingCapacity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderMediaThickTab = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select className="w-48 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>One Selection</option>
          </select>
        </div>
        <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
          <Save size={16} />
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-4 py-3 text-left text-sm font-semibold">Kind</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Weight</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Shape</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Thick.</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Brand</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Media Thick</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.filter(item => item.mediaThickness).map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-4 py-3 text-sm">{item.kind}</td>
                  <td className="px-4 py-3 text-sm">{item.weight}</td>
                  <td className="px-4 py-3 text-sm">{item.shape}</td>
                  <td className="px-4 py-3 text-sm">{item.thickness}</td>
                  <td className="px-4 py-3 text-sm">{item.brand}</td>
                  <td className="px-4 py-3 text-sm">{item.mediaThickness}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderMediaImageTab = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Rigid Signs Media</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kind</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Select kind</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
            <input type="file" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
          <Save size={16} />
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show</span>
            <select className="border border-gray-300 rounded px-2 py-1 text-sm">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span className="text-sm text-gray-600">entries</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Search:</span>
            <input
              type="text"
              className="border border-gray-300 rounded px-3 py-1 text-sm w-48"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-4 py-3 text-left text-sm font-semibold">Category</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Kind</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { category: 'AD stand', kind: 'X-Banner' },
                { category: 'Pitch Binding', kind: 'Easy Bind' },
                { category: 'Hat', kind: 'Coated' },
                { category: 'Paper', kind: 'Plain' },
                { category: 'Dividers', kind: 'Paper Tab Sheets' },
                { category: 'Coaster', kind: 'Wooden' },
                { category: 'Mug', kind: 'Ceramic' },
                { category: 'Puzzle', kind: 'Wooden' },
                { category: 'File', kind: 'CD sleeve' },
                { category: 'AD stand', kind: 'Rollup' }
              ].map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-4 py-3 text-sm">{item.category}</td>
                  <td className="px-4 py-3 text-sm">{item.kind}</td>
                  <td className="px-4 py-3">
                    <button className="p-1 text-blue-600 hover:bg-blue-100 rounded">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t flex justify-between items-center">
          <span className="text-sm text-gray-600">Showing 1 to 10 of 10 entries</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Previous</span>
            <button className="w-8 h-8 bg-blue-500 text-white rounded text-sm">1</button>
            <span className="text-sm text-gray-600">Next</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Media Management</h1>
          <p className="text-gray-600 mt-2">Manage your raw material</p>
        </div>
        {/* Tab Navigation */}
        <div className="flex border-b mb-8 bg-white rounded-t-lg">
          <button
            onClick={() => setActiveTab('media')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'media' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Media
          </button>
          <button
            onClick={() => setActiveTab('binding')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'binding' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Binding Capacity
          </button>
          <button
            onClick={() => setActiveTab('thick')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'thick' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Bind Media Thick.
          </button>
          <button
            onClick={() => setActiveTab('image')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'image' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Media Kind Image
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-gray-50">
          {activeTab === 'media' && renderMediaTab()}
          {activeTab === 'binding' && renderBindingCapacityTab()}
          {activeTab === 'thick' && renderMediaThickTab()}
          {activeTab === 'image' && renderMediaImageTab()}
        </div>
      </div>
    </div>
  );
};

export default MediaManagement;