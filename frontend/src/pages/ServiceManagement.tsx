import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

interface ServiceData {
  id: string;
  catalogue: string;
  kind: string[];
  size: string[];
  serviceAttributes: string[];
  countEachSide: boolean;
}

interface MediaMappingData {
  id: string;
  mediaCatalogue: string;
  mediaKind: string;
  serviceKind: string[];
  attributeValues: string[];
  relatedService: string;
  productionUnit: string;
  countEachSide: boolean;
  serviceCatalogue: string;
}

const ServiceManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'service' | 'media-mapping'>('service');
  const [services, setServices] = useState<ServiceData[]>([]);
  const [mediaMappings, setMediaMappings] = useState<MediaMappingData[]>([]);
  
  // Service form state
  const [catalogue, setCatalogue] = useState<string>('');
  const [kind, setKind] = useState<string[]>([]);
  const [size, setSize] = useState<string[]>([]);
  const [serviceAttributes, setServiceAttributes] = useState<string[]>([]);
  const [countEachSide, setCountEachSide] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Media mapping form state
  const [mediaCatalogue, setMediaCatalogue] = useState<string>('');
  const [mediaKind, setMediaKind] = useState<string>('');
  const [serviceKind, setServiceKind] = useState<string[]>([]);
  const [attributeValues, setAttributeValues] = useState<string[]>([]);
  const [relatedService, setRelatedService] = useState<string>('');
  const [productionUnit, setProductionUnit] = useState<string>('');
  const [mmCountEachSide, setMmCountEachSide] = useState<boolean>(false);
  const [serviceCatalogue, setServiceCatalogue] = useState<string>('');
  const [editingMediaId, setEditingMediaId] = useState<string | null>(null);

  // Search state for both tabs
  const [serviceSearch, setServiceSearch] = useState('');
  const [mediaSearch, setMediaSearch] = useState('');

  // Sample options for dropdowns
  const catalogueOptions = ['Digital Printing', 'Offset Printing', 'Dwgs & Maps', 'Signage & Posters', 'Folding', 'Lamination', 'Hard Lamination', 'Plate Printing', 'Binding', 'Cutting'];
  const kindOptions = ['Color+1spec. color', '1 Color', 'B/W', 'Color', 'Poster Lamination', 'Publication Folding', 'Soft lamination', 'Hard lamination', '2 Colors', 'Pitch Binding', 'Corner Cutting'];
  const sizeOptions = ['A4 (21x29.7 cm)', 'A3 (29.7x42 cm)', 'A5 (14.8x21)', 'B5 (17.5x25 cm)', 'B4 (25x35 cm)', 'B3 (35x50 cm)', 'B1 (70x100 cm)', 'Custom'];
  const attributeOptions = ['Sides', 'Coverage', 'Paper Folding', 'Formation', 'Binding Side', 'Cut size'];

  // Media mapping options
  const mediaCatalogueOptions = ['Posters Media', 'Paper', 'Plates', 'Soft Lamination'];
  const mediaKindOptions = ['Vinyl', 'Banner', 'Envelopes', 'Thermal', 'PP film', 'Flex', 'See Through', 'Satan', 'Canvas', 'Lamination film'];
  const serviceKindOptions = ['Color', 'Color+1spec. color', '1 Color', '2 Colors', 'Soft lamination'];
  const attributeValuesOptions = ['1 sided', '2 sided', '1 sided,2 sided'];
  const productionUnitOptions = ['Piece', 'Sheet'];
  const relatedServiceOptions = ['Service A', 'Service B', 'Service C'];

  const handleMultiSelect = (
    value: string,
    currentValues: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (currentValues.includes(value)) {
      setter(currentValues.filter(v => v !== value));
    } else {
      setter([...currentValues, value]);
    }
  };

  const handleSave = () => {
    if (!catalogue) {
      alert('Please select a catalogue');
      return;
    }

    const serviceData: ServiceData = {
      id: editingId || Date.now().toString(),
      catalogue,
      kind,
      size,
      serviceAttributes,
      countEachSide
    };

    if (editingId) {
      setServices(services.map(s => s.id === editingId ? serviceData : s));
      setEditingId(null);
    } else {
      setServices([...services, serviceData]);
    }

    // Reset form
    setCatalogue('');
    setKind([]);
    setSize([]);
    setServiceAttributes([]);
    setCountEachSide(false);
  };

  const handleEdit = (service: ServiceData) => {
    setCatalogue(service.catalogue);
    setKind(service.kind);
    setSize(service.size);
    setServiceAttributes(service.serviceAttributes);
    setCountEachSide(service.countEachSide);
    setEditingId(service.id);
  };

  const handleDelete = (id: string) => {
    setServices(services.filter(s => s.id !== id));
  };

  // Media mapping handlers
  const handleMediaSave = () => {
    if (!mediaCatalogue) {
      alert('Please select a media catalogue');
      return;
    }

    const mediaMappingData: MediaMappingData = {
      id: editingMediaId || Date.now().toString(),
      mediaCatalogue,
      mediaKind,
      serviceKind,
      attributeValues,
      relatedService,
      productionUnit,
      countEachSide: mmCountEachSide,
      serviceCatalogue
    };

    if (editingMediaId) {
      setMediaMappings(mediaMappings.map(m => m.id === editingMediaId ? mediaMappingData : m));
      setEditingMediaId(null);
    } else {
      setMediaMappings([...mediaMappings, mediaMappingData]);
    }

    // Reset form
    setMediaCatalogue('');
    setMediaKind('');
    setServiceKind([]);
    setAttributeValues([]);
    setRelatedService('');
    setProductionUnit('');
    setMmCountEachSide(false);
    setServiceCatalogue('');
  };

  const handleMediaEdit = (media: MediaMappingData) => {
    setMediaCatalogue(media.mediaCatalogue);
    setMediaKind(media.mediaKind);
    setServiceKind(media.serviceKind);
    setAttributeValues(media.attributeValues);
    setRelatedService(media.relatedService);
    setProductionUnit(media.productionUnit);
    setMmCountEachSide(media.countEachSide);
    setServiceCatalogue(media.serviceCatalogue);
    setEditingMediaId(media.id);
  };

  const handleMediaDelete = (id: string) => {
    setMediaMappings(mediaMappings.filter(m => m.id !== id));
  };

  const MultiSelectDropdown: React.FC<{
    label: string;
    options: string[];
    selectedValues: string[];
    onChange: React.Dispatch<React.SetStateAction<string[]>>;
    placeholder?: string;
  }> = ({ label, options, selectedValues, onChange, placeholder = "Multi Selection" }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}:</label>
        <div className="relative">
          <button
            type="button"
            className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-left flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="text-blue-600">
              {selectedValues.length > 0 ? `${selectedValues.length} selected` : placeholder}
            </span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {options.map((option) => (
                <label key={option} className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(option)}
                    onChange={() => handleMultiSelect(option, selectedValues, onChange)}
                    className="mr-2"
                  />
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
 {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Service Management</h1>
          <p className="text-gray-600 mt-2">Manage your service</p>
        </div>
      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          <button
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'service'
                ? 'text-white bg-blue-500 border-b-2 border-blue-500'
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab('service')}
          >
            Service
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'media-mapping'
                ? 'text-white bg-blue-500 border-b-2 border-blue-500'
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab('media-mapping')}
          >
            Media Mapping
          </button>
        </div>
      </div>

      {activeTab === 'service' && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Form Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Catalogue */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Catalogue:</label>
              <select
                value={catalogue}
                onChange={(e) => setCatalogue(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">One Selection</option>
                {catalogueOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Kind */}
            <MultiSelectDropdown
              label="Kind"
              options={kindOptions}
              selectedValues={kind}
              onChange={setKind}
            />

            {/* Size */}
            <MultiSelectDropdown
              label="Size"
              options={sizeOptions}
              selectedValues={size}
              onChange={setSize}
            />

            {/* Service Attributes */}
            <MultiSelectDropdown
              label="Service Attributes"
              options={attributeOptions}
              selectedValues={serviceAttributes}
              onChange={setServiceAttributes}
              placeholder="One Selection"
            />
          </div>

          {/* Count Each Side Checkbox */}
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={countEachSide}
                onChange={(e) => setCountEachSide(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">Count Each Side:</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-8">
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add
            </button>
            <button
              onClick={handleSave}
              className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600"
            >
              {editingId ? 'Update' : 'Generate'}
            </button>
          </div>

          {/* Pagination & Search */}
          <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
            <span>Show 50 entries</span>
            <input
              type="text"
              placeholder="Search by any field..."
              value={serviceSearch}
              onChange={e => setServiceSearch(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ minWidth: 200 }}
            />
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="border border-gray-300 px-4 py-2 text-left">Catalogue</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Kind</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Size</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Service Attributes</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Count each Side</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services
                  .filter(service => {
                    const search = serviceSearch.toLowerCase();
                    return (
                      service.catalogue.toLowerCase().includes(search) ||
                      service.kind.join(', ').toLowerCase().includes(search) ||
                      service.size.join(', ').toLowerCase().includes(search) ||
                      service.serviceAttributes.join(', ').toLowerCase().includes(search) ||
                      (service.countEachSide ? 'yes' : 'no').includes(search)
                    );
                  })
                  .map((service) => (
                    <tr key={service.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">{service.catalogue}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        {service.kind.join(', ') || '-'}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {service.size.join(', ') || '-'}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {service.serviceAttributes.join(', ') || '-'}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {service.countEachSide ? 'Yes' : 'No'}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(service)}
                            className="text-blue-600 hover:text-blue-800 p-1"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(service.id)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                {services.length === 0 && (
                  <tr>
                    <td colSpan={6} className="border border-gray-300 px-4 py-8 text-center text-gray-500">
                      No services added yet. Fill the form above and click Generate to add services.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Info */}
          <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
            <span>Show 50 entries</span>
            <span>Search: </span>
          </div>
        </div>
      )}

      {activeTab === 'media-mapping' && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Form Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Media Catalogue */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Media Catalogue:</label>
              <select
                value={mediaCatalogue}
                onChange={(e) => setMediaCatalogue(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                {mediaCatalogueOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Media Kind */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Media Kind:</label>
              <select
                value={mediaKind}
                onChange={(e) => setMediaKind(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                {mediaKindOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Service Kind */}
            <MultiSelectDropdown
              label="Service Kind"
              options={serviceKindOptions}
              selectedValues={serviceKind}
              onChange={setServiceKind}
            />

            {/* Attribute Values */}
            <MultiSelectDropdown
              label="Attributes_Values"
              options={attributeValuesOptions}
              selectedValues={attributeValues}
              onChange={setAttributeValues}
            />

            {/* Production Unit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Production Unit:</label>
              <select
                value={productionUnit}
                onChange={(e) => setProductionUnit(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                {productionUnitOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Count Each Side */}
            <div className="flex items-end">
              <label className="flex items-center pb-2">
                <input
                  type="checkbox"
                  checked={mmCountEachSide}
                  onChange={(e) => setMmCountEachSide(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Count each side</span>
              </label>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Service Catalogue */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Catalogue:</label>
              <select
                value={serviceCatalogue}
                onChange={(e) => setServiceCatalogue(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                {catalogueOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Related Service */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Related Service:</label>
              <select
                value={relatedService}
                onChange={(e) => setRelatedService(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                {relatedServiceOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-8">
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add
            </button>
            <button
              onClick={handleMediaSave}
              className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600"
            >
              {editingMediaId ? 'Update' : 'Generate'}
            </button>
          </div>

          {/* Pagination & Search */}
          <div className="mb-4 flex justify-between items-center text-sm text-gray-600">
            <span>Show 10 entries</span>
            <input
              type="text"
              placeholder="Search by any field..."
              value={mediaSearch}
              onChange={e => setMediaSearch(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ minWidth: 200 }}
            />
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="border border-gray-300 px-2 py-2 text-left">Media Catalogue</th>
                  <th className="border border-gray-300 px-2 py-2 text-left">Media Kind</th>
                  <th className="border border-gray-300 px-2 py-2 text-left">Service Kinds</th>
                  <th className="border border-gray-300 px-2 py-2 text-left">Attribute values</th>
                  <th className="border border-gray-300 px-2 py-2 text-left">Related Service</th>
                  <th className="border border-gray-300 px-2 py-2 text-left">Count each side</th>
                  <th className="border border-gray-300 px-2 py-2 text-left">PackageUnitName</th>
                  <th className="border border-gray-300 px-2 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mediaMappings
                  .filter(media => {
                    const search = mediaSearch.toLowerCase();
                    return (
                      media.mediaCatalogue.toLowerCase().includes(search) ||
                      media.mediaKind.toLowerCase().includes(search) ||
                      media.serviceKind.join(', ').toLowerCase().includes(search) ||
                      media.attributeValues.join(', ').toLowerCase().includes(search) ||
                      media.relatedService.toLowerCase().includes(search) ||
                      media.productionUnit.toLowerCase().includes(search) ||
                      (media.countEachSide ? 'yes' : 'no').includes(search)
                    );
                  })
                  .map((media, index) => (
                    <tr key={media.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100`}>
                      <td className="border border-gray-300 px-2 py-2">{media.mediaCatalogue}</td>
                      <td className="border border-gray-300 px-2 py-2">{media.mediaKind}</td>
                      <td className="border border-gray-300 px-2 py-2">
                        {media.serviceKind.join(', ') || '-'}
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        {media.attributeValues.join(', ') || '-'}
                      </td>
                      <td className="border border-gray-300 px-2 py-2">{media.relatedService || '-'}</td>
                      <td className="border border-gray-300 px-2 py-2 text-center">
                        <input type="checkbox" checked={media.countEachSide} readOnly />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">{media.productionUnit}</td>
                      <td className="border border-gray-300 px-2 py-2">
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleMediaEdit(media)}
                            className="text-blue-600 hover:text-blue-800 p-1"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleMediaDelete(media.id)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                {mediaMappings.length === 0 && (
                  <tr>
                    <td colSpan={8} className="border border-gray-300 px-4 py-8 text-center text-gray-500">
                      No media mappings added yet. Fill the form above and click Generate to add media mappings.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceManagement;