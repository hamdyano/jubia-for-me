import React, { useState } from 'react';
import { X, Plus, Edit2, Trash2, Save, FileText, Settings, HelpCircle, Search } from 'lucide-react';

// Types
interface ProductGroup {
  id: string;
  arabicName: string;
  englishName: string;
  sorting: number;
}

interface Product {
  id: string;
  productionGroup: string;
  arabicName: string;
  englishName: string;
  active: boolean;
  flatPrice: boolean;
  price: number;
  minBatch: number;
  qtyStep: number;
  batchQty: number;
  invoicingCode: string;
  invoicingCodeType: string;
  type: string;
}

interface Service {
  id: string;
  arabicName: string;
  englishName: string;
  type: string;
  serviceCategory: string;
  kind: string;
  attributeValues: string;
  size: string;
  quantity: number;
  batchSize: string;
  locked: boolean;
  batchSizePricing: boolean;
  pricingPackage: string;
  pageClass: string;
  computeInBindThick: boolean;
  basicComponent: boolean;
  sizeAsFirstComponent: boolean;
  sizeIndependent: boolean;
  customized: boolean;
  showRelatedService: boolean;
  ordering: number;
}

interface Guidance {
  id: string;
  arabicGuideline: string;
  englishGuideline: string;
  group: string;
}

interface Note {
  id: string;
  noteAr: string;
  noteEn: string;
  ordering: string;
}

type ActiveTab = 'production-groups' | 'products' | 'guidance';
type ProductTab = 'customized' | 'non-customized';

const ProductManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('production-groups');
  const [activeProductTab, setActiveProductTab] = useState<ProductTab>('customized');
  const [showProductModal, setShowProductModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showGuidanceModal, setShowGuidanceModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  
  // Data states
  const [productGroups, setProductGroups] = useState<ProductGroup[]>([
    { id: '1', arabicName: 'هدايا', englishName: 'Promotional Gifts', sorting: 1 },
    { id: '2', arabicName: 'العودة للمدارس', englishName: 'Back to School', sorting: 2 },
    { id: '3', arabicName: 'منتجات تسويقية', englishName: 'Marketing Materials', sorting: 3 },
    { id: '4', arabicName: 'لوحات هندسية وخرائط', englishName: 'Dwgs & Maps', sorting: 4 },
    { id: '5', arabicName: 'طباعة نمطية', englishName: 'Typical Printing', sorting: 5 },
    { id: '6', arabicName: 'طباعة متقدمة', englishName: 'Advanced Printing', sorting: 6 },
    { id: '7', arabicName: 'ديجيتال مقاس طويل', englishName: 'Long Sheet', sorting: 6 },
    { id: '8', arabicName: 'لافتات وإعلانات', englishName: 'Signage & Posters', sorting: 7 },
    { id: '9', arabicName: 'تصميمات', englishName: 'Designs', sorting: 8 },
    { id: '10', arabicName: 'أشغال حاسوب', englishName: 'Computer Works', sorting: 9 }
  ]);

  const [products, setProducts] = useState<Product[]>([
    { id: '1', productionGroup: 'Typical Printing', arabicName: 'طباعة سريعة', englishName: 'Quick Print', active: true, flatPrice: false, price: 0, minBatch: 1, qtyStep: 1, batchQty: 1, invoicingCode: '', invoicingCodeType: '', type: 'Product' },
    { id: '2', productionGroup: 'Marketing Materials', arabicName: 'كارت شخصي', englishName: 'Business Cards', active: true, flatPrice: false, price: 0, minBatch: 100, qtyStep: 100, batchQty: 100, invoicingCode: '', invoicingCodeType: '', type: 'Product' },
    { id: '3', productionGroup: 'Advanced Printing', arabicName: 'ID كارت', englishName: 'ID Cards', active: true, flatPrice: false, price: 0, minBatch: 1, qtyStep: 1, batchQty: 1, invoicingCode: '', invoicingCodeType: '', type: 'Product' }
  ]);

  const [services, setServices] = useState<Service[]>([
    { id: '1', arabicName: '', englishName: 'Print', type: 'Service', serviceCategory: '', kind: '', attributeValues: '', size: '', quantity: 0, batchSize: 'Select_Size', locked: false, batchSizePricing: false, pricingPackage: '', pageClass: '', computeInBindThick: false, basicComponent: false, sizeAsFirstComponent: false, sizeIndependent: false, customized: true, showRelatedService: false, ordering: 1 },
    { id: '2', arabicName: '', englishName: 'Stapling', type: 'Service', serviceCategory: '', kind: '', attributeValues: '', size: '', quantity: 0, batchSize: '', locked: false, batchSizePricing: false, pricingPackage: '', pageClass: '', computeInBindThick: false, basicComponent: false, sizeAsFirstComponent: false, sizeIndependent: false, customized: false, showRelatedService: false, ordering: 2 },
    { id: '3', arabicName: '', englishName: 'Doc. Prepress', type: 'Service', serviceCategory: '', kind: '', attributeValues: '', size: '', quantity: 0, batchSize: '', locked: false, batchSizePricing: false, pricingPackage: '', pageClass: '', computeInBindThick: false, basicComponent: false, sizeAsFirstComponent: false, sizeIndependent: false, customized: false, showRelatedService: false, ordering: 3 }
  ]);

  const [guidances, setGuidances] = useState<Guidance[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  // Form states
  const [productGroupForm, setProductGroupForm] = useState({ arabicName: '', englishName: '', sorting: 0 });
  const [productForm, setProductForm] = useState<Partial<Product>>({
    productionGroup: '',
    arabicName: '',
    englishName: '',
    active: false,
    flatPrice: false,
    price: 0,
    minBatch: 0,
    qtyStep: 0,
    batchQty: 0,
    invoicingCode: '',
    invoicingCodeType: '',
    type: ''
  });
  const [serviceForm, setServiceForm] = useState<Partial<Service>>({
    arabicName: '',
    englishName: '',
    type: 'Service',
    serviceCategory: '',
    kind: '',
    attributeValues: '',
    size: '',
    quantity: 0,
    batchSize: 'Select_Size',
    locked: false,
    batchSizePricing: false,
    pricingPackage: '',
    pageClass: '',
    computeInBindThick: false,
    basicComponent: false,
    sizeAsFirstComponent: false,
    sizeIndependent: false,
    customized: true,
    showRelatedService: false,
    ordering: 1
  });
  const [guidanceForm, setGuidanceForm] = useState({ arabicGuideline: '', englishGuideline: '', group: '' });
  const [noteForm, setNoteForm] = useState({ noteAr: '', noteEn: '', ordering: '' });

  // Search states
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const handleSaveProductGroup = () => {
    if (productGroupForm.arabicName && productGroupForm.englishName) {
      const newGroup: ProductGroup = {
        id: Date.now().toString(),
        ...productGroupForm
      };
      setProductGroups([...productGroups, newGroup]);
      setProductGroupForm({ arabicName: '', englishName: '', sorting: 0 });
    }
  };

  const handleSaveProduct = () => {
    if (productForm.arabicName && productForm.englishName) {
      const newProduct: Product = {
        id: Date.now().toString(),
        productionGroup: productForm.productionGroup || '',
        arabicName: productForm.arabicName || '',
        englishName: productForm.englishName || '',
        active: productForm.active || false,
        flatPrice: productForm.flatPrice || false,
        price: productForm.price || 0,
        minBatch: productForm.minBatch || 0,
        qtyStep: productForm.qtyStep || 0,
        batchQty: productForm.batchQty || 0,
        invoicingCode: productForm.invoicingCode || '',
        invoicingCodeType: productForm.invoicingCodeType || '',
        type: productForm.type || 'Product'
      };
      setProducts([...products, newProduct]);
      setProductForm({
        productionGroup: '',
        arabicName: '',
        englishName: '',
        active: false,
        flatPrice: false,
        price: 0,
        minBatch: 0,
        qtyStep: 0,
        batchQty: 0,
        invoicingCode: '',
        invoicingCodeType: '',
        type: ''
      });
      setShowProductModal(false);
    }
  };

  const handleSaveService = () => {
    if (serviceForm.englishName) {
      const newService: Service = {
        id: Date.now().toString(),
        arabicName: serviceForm.arabicName || '',
        englishName: serviceForm.englishName || '',
        type: serviceForm.type || 'Service',
        serviceCategory: serviceForm.serviceCategory || '',
        kind: serviceForm.kind || '',
        attributeValues: serviceForm.attributeValues || '',
        size: serviceForm.size || '',
        quantity: serviceForm.quantity || 0,
        batchSize: serviceForm.batchSize || 'Select_Size',
        locked: serviceForm.locked || false,
        batchSizePricing: serviceForm.batchSizePricing || false,
        pricingPackage: serviceForm.pricingPackage || '',
        pageClass: serviceForm.pageClass || '',
        computeInBindThick: serviceForm.computeInBindThick || false,
        basicComponent: serviceForm.basicComponent || false,
        sizeAsFirstComponent: serviceForm.sizeAsFirstComponent || false,
        sizeIndependent: serviceForm.sizeIndependent || false,
        customized: activeProductTab === 'customized',
        showRelatedService: serviceForm.showRelatedService || false,
        ordering: serviceForm.ordering || services.length + 1
      };
      setServices([...services, newService]);
      setServiceForm({
        arabicName: '',
        englishName: '',
        type: 'Service',
        serviceCategory: '',
        kind: '',
        attributeValues: '',
        size: '',
        quantity: 0,
        batchSize: 'Select_Size',
        locked: false,
        batchSizePricing: false,
        pricingPackage: '',
        pageClass: '',
        computeInBindThick: false,
        basicComponent: false,
        sizeAsFirstComponent: false,
        sizeIndependent: false,
        customized: true,
        showRelatedService: false,
        ordering: 1
      });
      setShowServiceModal(false);
    }
  };

  const handleSaveGuidance = () => {
    if (guidanceForm.arabicGuideline && guidanceForm.englishGuideline) {
      const newGuidance: Guidance = {
        id: Date.now().toString(),
        ...guidanceForm
      };
      setGuidances([...guidances, newGuidance]);
      setGuidanceForm({ arabicGuideline: '', englishGuideline: '', group: '' });
      setShowGuidanceModal(false);
    }
  };

  const handleSaveNote = () => {
    if (noteForm.noteAr && noteForm.noteEn) {
      const newNote: Note = {
        id: Date.now().toString(),
        ...noteForm
      };
      setNotes([...notes, newNote]);
      setNoteForm({ noteAr: '', noteEn: '', ordering: '' });
      setShowNoteModal(false);
    }
  };

  const deleteProductGroup = (id: string) => {
    setProductGroups(productGroups.filter(group => group.id !== id));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const deleteService = (id: string) => {
    setServices(services.filter(service => service.id !== id));
  };

  const deleteGuidance = (id: string) => {
    setGuidances(guidances.filter(guidance => guidance.id !== id));
  };

  const filteredServices = services.filter(service => 
    service.customized === (activeProductTab === 'customized') &&
    (service.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     service.arabicName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const ServiceModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Add Service</h2>
          <button
            onClick={() => setShowServiceModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Arabic Name</label>
            <input
              type="text"
              value={serviceForm.arabicName}
              onChange={(e) => setServiceForm({...serviceForm, arabicName: e.target.value})}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">English Name</label>
            <input
              type="text"
              value={serviceForm.englishName}
              onChange={(e) => setServiceForm({...serviceForm, englishName: e.target.value})}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <select
              value={serviceForm.type}
              onChange={(e) => setServiceForm({...serviceForm, type: e.target.value})}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="Service">Service</option>
              <option value="Product">Product</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            className={`px-4 py-2 rounded ${activeProductTab === 'customized' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => {
              setActiveProductTab('customized');
              setServiceForm({...serviceForm, customized: true});
            }}
          >
            Customized
          </button>
          <button
            className={`px-4 py-2 rounded ${activeProductTab === 'non-customized' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => {
              setActiveProductTab('non-customized');
              setServiceForm({...serviceForm, customized: false});
            }}
          >
            Non Customized
          </button>
        </div>

        {activeProductTab === 'customized' ? (
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Service Category</label>
              <select
                value={serviceForm.serviceCategory}
                onChange={(e) => setServiceForm({...serviceForm, serviceCategory: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Select</option>
                <option value="printing">Printing</option>
                <option value="binding">Binding</option>
                <option value="finishing">Finishing</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Kind</label>
              <select
                value={serviceForm.kind}
                onChange={(e) => setServiceForm({...serviceForm, kind: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Select</option>
                <option value="digital">Digital</option>
                <option value="offset">Offset</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Attribute Values</label>
              <select
                value={serviceForm.attributeValues}
                onChange={(e) => setServiceForm({...serviceForm, attributeValues: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Select</option>
                <option value="color">Color</option>
                <option value="bw">Black & White</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Size</label>
              <select
                value={serviceForm.size}
                onChange={(e) => setServiceForm({...serviceForm, size: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Select</option>
                <option value="A4">A4</option>
                <option value="A3">A3</option>
                <option value="A5">A5</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <input
                type="number"
                value={serviceForm.quantity}
                onChange={(e) => setServiceForm({...serviceForm, quantity: parseInt(e.target.value)})}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Pricing Package</label>
              <input
                type="text"
                value={serviceForm.pricingPackage}
                onChange={(e) => setServiceForm({...serviceForm, pricingPackage: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Batch Size</label>
              <select
                value={serviceForm.batchSize}
                onChange={(e) => setServiceForm({...serviceForm, batchSize: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="Select_Size">Select Size</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Page Class</label>
              <select
                value={serviceForm.pageClass}
                onChange={(e) => setServiceForm({...serviceForm, pageClass: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Select</option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
              </select>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Service Category</label>
              <select
                value={serviceForm.serviceCategory}
                onChange={(e) => setServiceForm({...serviceForm, serviceCategory: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Select</option>
                <option value="printing">Printing</option>
                <option value="binding">Binding</option>
                <option value="finishing">Finishing</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Kind</label>
              <select
                value={serviceForm.kind}
                onChange={(e) => setServiceForm({...serviceForm, kind: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Select</option>
                <option value="digital">Digital</option>
                <option value="offset">Offset</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Attributes</label>
              <select
                value={serviceForm.attributeValues}
                onChange={(e) => setServiceForm({...serviceForm, attributeValues: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Select</option>
                <option value="color">Color</option>
                <option value="bw">Black & White</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <input
                type="number"
                value={serviceForm.quantity}
                onChange={(e) => setServiceForm({...serviceForm, quantity: parseInt(e.target.value)})}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Pricing Package</label>
              <input
                type="text"
                value={serviceForm.pricingPackage}
                onChange={(e) => setServiceForm({...serviceForm, pricingPackage: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Page Class</label>
              <select
                value={serviceForm.pageClass}
                onChange={(e) => setServiceForm({...serviceForm, pageClass: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Select</option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
              </select>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={serviceForm.locked}
              onChange={(e) => setServiceForm({...serviceForm, locked: e.target.checked})}
              className="rounded"
            />
            <label>Locked</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={serviceForm.batchSizePricing}
              onChange={(e) => setServiceForm({...serviceForm, batchSizePricing: e.target.checked})}
              className="rounded"
            />
            <label>Batch Size Pricing</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={serviceForm.computeInBindThick}
              onChange={(e) => setServiceForm({...serviceForm, computeInBindThick: e.target.checked})}
              className="rounded"
            />
            <label>Compute in Bind Thick.</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={serviceForm.sizeIndependent}
              onChange={(e) => setServiceForm({...serviceForm, sizeIndependent: e.target.checked})}
              className="rounded"
            />
            <label>Size Independent</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={serviceForm.sizeAsFirstComponent}
              onChange={(e) => setServiceForm({...serviceForm, sizeAsFirstComponent: e.target.checked})}
              className="rounded"
            />
            <label>Size as first component</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={serviceForm.basicComponent}
              onChange={(e) => setServiceForm({...serviceForm, basicComponent: e.target.checked})}
              className="rounded"
            />
            <label>Basic Component</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={serviceForm.showRelatedService}
              onChange={(e) => setServiceForm({...serviceForm, showRelatedService: e.target.checked})}
              className="rounded"
            />
            <label>Show Related Service</label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSaveService}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
          >
            <Save size={16} />
            Save
          </button>
        </div>
      </div>
    </div>
  );

  const ProductModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Add Product</h2>
          <button
            onClick={() => setShowProductModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Production Group</label>
            <select
              value={productForm.productionGroup}
              onChange={(e) => setProductForm({...productForm, productionGroup: e.target.value})}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select Group</option>
              {productGroups.map(group => (
                <option key={group.id} value={group.englishName}>{group.englishName}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Arabic Name</label>
            <input
              type="text"
              value={productForm.arabicName}
              onChange={(e) => setProductForm({...productForm, arabicName: e.target.value})}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">English Name</label>
            <input
              type="text"
              value={productForm.englishName}
              onChange={(e) => setProductForm({...productForm, englishName: e.target.value})}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={productForm.active}
              onChange={(e) => setProductForm({...productForm, active: e.target.checked})}
              className="rounded"
            />
            <label>Active</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={productForm.flatPrice}
              onChange={(e) => setProductForm({...productForm, flatPrice: e.target.checked})}
              className="rounded"
            />
            <label>Flat Price</label>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Min. Batch</label>
            <input
              type="number"
              value={productForm.minBatch}
              onChange={(e) => setProductForm({...productForm, minBatch: parseInt(e.target.value)})}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Qty. Step</label>
            <input
              type="number"
              value={productForm.qtyStep}
              onChange={(e) => setProductForm({...productForm, qtyStep: parseInt(e.target.value)})}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Batch Qty</label>
            <input
              type="number"
              value={productForm.batchQty}
              onChange={(e) => setProductForm({...productForm, batchQty: parseInt(e.target.value)})}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Invoicing Code</label>
            <input
              type="text"
              value={productForm.invoicingCode}
              onChange={(e) => setProductForm({...productForm, invoicingCode: e.target.value})}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Invoicing Code Type</label>
            <select
              value={productForm.invoicingCodeType}
              onChange={(e) => setProductForm({...productForm, invoicingCodeType: e.target.value})}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select</option>
              <option value="standard">Standard</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <select
              value={productForm.type}
              onChange={(e) => setProductForm({...productForm, type: e.target.value})}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select</option>
              <option value="Product">Product</option>
              <option value="Service">Service</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSaveProduct}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
          >
            <Save size={16} />
            Save
          </button>
        </div>
      </div>
    </div>
  );

  const GuidanceModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Add Guidance</h2>
          <button
            onClick={() => setShowGuidanceModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Guideline Ar</label>
            <textarea
              value={guidanceForm.arabicGuideline}
              onChange={(e) => setGuidanceForm({...guidanceForm, arabicGuideline: e.target.value})}
              className="w-full border border-gray-300 rounded px-3 py-2 h-32"
              placeholder="Arabic Guideline"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Guideline En</label>
            <textarea
              value={guidanceForm.englishGuideline}
              onChange={(e) => setGuidanceForm({...guidanceForm, englishGuideline: e.target.value})}
              className="w-full border border-gray-300 rounded px-3 py-2 h-32"
              placeholder="English Guideline"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Group</label>
            <input
              type="text"
              value={guidanceForm.group}
              onChange={(e) => setGuidanceForm({...guidanceForm, group: e.target.value})}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Group"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => setShowGuidanceModal(false)}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveGuidance}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
          >
            <Save size={16} />
            Save
          </button>
        </div>
      </div>
    </div>
  );

  const NoteModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Add Note</h2>
          <button
            onClick={() => setShowNoteModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Note Ar</label>
            <textarea
              value={noteForm.noteAr}
              onChange={(e) => setNoteForm({...noteForm, noteAr: e.target.value})}
              className="w-full border border-gray-300 rounded px-3 py-2 h-24"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Note En</label>
            <textarea
              value={noteForm.noteEn}
              onChange={(e) => setNoteForm({...noteForm, noteEn: e.target.value})}
              className="w-full border border-gray-300 rounded px-3 py-2 h-24"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Ordering</label>
          <input
            type="text"
            value={noteForm.ordering}
            onChange={(e) => setNoteForm({...noteForm, ordering: e.target.value})}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSaveNote}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
          >
            <Save size={16} />
            Save
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Product Management</h1>
      
      {/* Main Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'production-groups'
              ? 'bg-blue-600 text-white border-b-2 border-blue-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setActiveTab('production-groups')}
        >
          Production Group
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'products'
              ? 'bg-blue-600 text-white border-b-2 border-blue-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setActiveTab('products')}
        >
          Product
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'guidance'
              ? 'bg-blue-600 text-white border-b-2 border-blue-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setActiveTab('guidance')}
        >
          Guidance
        </button>
      </div>

      {/* Production Groups Tab */}
      {activeTab === 'production-groups' && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Arabic Name</label>
              <input
                type="text"
                value={productGroupForm.arabicName}
                onChange={(e) => setProductGroupForm({...productGroupForm, arabicName: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Arabic Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">English Name</label>
              <input
                type="text"
                value={productGroupForm.englishName}
                onChange={(e) => setProductGroupForm({...productGroupForm, englishName: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="English Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Sorting</label>
              <input
                type="number"
                value={productGroupForm.sorting}
                onChange={(e) => setProductGroupForm({...productGroupForm, sorting: parseInt(e.target.value)})}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Sorting"
              />
            </div>
          </div>

          <div className="flex justify-end mb-6">
            <div className="flex gap-2">
              <button
                onClick={handleSaveProductGroup}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center gap-2"
              >
                <Plus size={16} />
                Add
              </button>
              <button
                onClick={handleSaveProductGroup}
                className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 flex items-center gap-2"
              >
                <Save size={16} />
                Save
              </button>
              <button
                onClick={() => setProductGroups([])}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center gap-2"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="border border-gray-300 px-4 py-2 text-left">En. Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Ar. Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Group</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Active</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Min. Batch</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Qty Step</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Batch Qty</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {productGroups.map(group => (
                  <tr key={group.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{group.englishName}</td>
                    <td className="border border-gray-300 px-4 py-2">{group.arabicName}</td>
                    <td className="border border-gray-300 px-4 py-2">Signage</td>
                    <td className="border border-gray-300 px-4 py-2">Product</td>
                    <td className="border border-gray-300 px-4 py-2">Yes</td>
                    <td className="border border-gray-300 px-4 py-2">1</td>
                    <td className="border border-gray-300 px-4 py-2">1</td>
                    <td className="border border-gray-300 px-4 py-2">1</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex gap-1">
                        <button className="bg-teal-500 text-white p-1 rounded text-xs">Photo</button>
                        <button className="bg-red-500 text-white p-1 rounded text-xs">Component</button>
                        <button className="bg-blue-500 text-white p-1 rounded text-xs">Notes</button>
                        <button className="bg-green-500 text-white p-1 rounded text-xs">Guidance</button>
                        <button 
                          onClick={() => deleteProductGroup(group.id)}
                          className="bg-red-600 text-white p-1 rounded text-xs"
                        >
                          Delete
                        </button>
                        <button className="bg-yellow-500 text-white p-1 rounded text-xs">Edit</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-lg shadow p-6">
          {/* Product Form */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Production Group</label>
              <select
                value={productForm.productionGroup}
                onChange={(e) => setProductForm({...productForm, productionGroup: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Select Group</option>
                {productGroups.map(group => (
                  <option key={group.id} value={group.englishName}>{group.englishName}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Arabic Name</label>
              <input
                type="text"
                value={productForm.arabicName}
                onChange={(e) => setProductForm({...productForm, arabicName: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">English Name</label>
              <input
                type="text"
                value={productForm.englishName}
                onChange={(e) => setProductForm({...productForm, englishName: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={productForm.active}
                onChange={(e) => setProductForm({...productForm, active: e.target.checked})}
                className="rounded"
              />
              <label>Active</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={productForm.flatPrice}
                onChange={(e) => setProductForm({...productForm, flatPrice: e.target.checked})}
                className="rounded"
              />
              <label>Flat Price</label>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Min. Batch</label>
              <input
                type="number"
                value={productForm.minBatch}
                onChange={(e) => setProductForm({...productForm, minBatch: parseInt(e.target.value)})}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Qty. Step</label>
              <input
                type="number"
                value={productForm.qtyStep}
                onChange={(e) => setProductForm({...productForm, qtyStep: parseInt(e.target.value)})}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Batch Qty</label>
              <input
                type="number"
                value={productForm.batchQty}
                onChange={(e) => setProductForm({...productForm, batchQty: parseInt(e.target.value)})}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Invoicing Code</label>
              <input
                type="text"
                value={productForm.invoicingCode}
                onChange={(e) => setProductForm({...productForm, invoicingCode: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Invoicing Code Type</label>
              <select
                value={productForm.invoicingCodeType}
                onChange={(e) => setProductForm({...productForm, invoicingCodeType: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Select</option>
                <option value="standard">Standard</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <select
                value={productForm.type}
                onChange={(e) => setProductForm({...productForm, type: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Select</option>
                <option value="Product">Product</option>
                <option value="Service">Service</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end mb-6">
            <button
              onClick={() => setShowProductModal(true)}
              className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 flex items-center gap-2"
            >
              <Save size={16} />
              Save
            </button>
          </div>

          {/* Product Sub-tabs */}
          <div className="flex gap-2 mb-4">
            <button
              className={`px-4 py-2 rounded ${
                activeProductTab === 'customized'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setActiveProductTab('customized')}
            >
              Customized
            </button>
            <button
              className={`px-4 py-2 rounded ${
                activeProductTab === 'non-customized'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setActiveProductTab('non-customized')}
            >
              Non Customized
            </button>
          </div>

          {/* Service Management Section */}
          <div className="mb-4">
            <button
              onClick={() => setShowServiceModal(true)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center gap-2 mb-4"
            >
              <Plus size={16} />
              Add Service
            </button>
          </div>

          {/* Search and Entries */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span>Show</span>
              <select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(parseInt(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span>entries</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Search:</span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1"
              />
            </div>
          </div>

          {/* Services Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="border border-gray-300 px-2 py-2 text-left text-xs">Actions</th>
                  <th className="border border-gray-300 px-2 py-2 text-left text-xs">Ordering</th>
                  <th className="border border-gray-300 px-2 py-2 text-left text-xs">Name</th>
                  <th className="border border-gray-300 px-2 py-2 text-left text-xs">Type</th>
                  <th className="border border-gray-300 px-2 py-2 text-left text-xs">Customized</th>
                  <th className="border border-gray-300 px-2 py-2 text-left text-xs">Media Cataloge</th>
                  <th className="border border-gray-300 px-2 py-2 text-left text-xs">Media Kind</th>
                  <th className="border border-gray-300 px-2 py-2 text-left text-xs">Weight</th>
                  <th className="border border-gray-300 px-2 py-2 text-left text-xs">Color</th>
                  <th className="border border-gray-300 px-2 py-2 text-left text-xs">Shape</th>
                  <th className="border border-gray-300 px-2 py-2 text-left text-xs">Surface</th>
                  <th className="border border-gray-300 px-2 py-2 text-left text-xs">Thickness</th>
                  <th className="border border-gray-300 px-2 py-2 text-left text-xs">Brand</th>
                  <th className="border border-gray-300 px-2 py-2 text-left text-xs">Pack</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.length === 0 ? (
                  <tr>
                    <td colSpan={14} className="border border-gray-300 px-4 py-8 text-center text-gray-500">
                      No data available in table
                    </td>
                  </tr>
                ) : (
                  filteredServices.map((service, index) => (
                    <tr key={service.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-2 py-2">
                        <div className="flex gap-1">
                          <button 
                            onClick={() => deleteService(service.id)}
                            className="bg-red-500 text-white p-1 rounded text-xs"
                          >
                            <Trash2 size={12} />
                          </button>
                          <button className="bg-blue-500 text-white p-1 rounded text-xs">
                            <Edit2 size={12} />
                          </button>
                        </div>
                      </td>
                      <td className="border border-gray-300 px-2 py-2 text-xs">{service.ordering}</td>
                      <td className="border border-gray-300 px-2 py-2 text-xs">{service.englishName}</td>
                      <td className="border border-gray-300 px-2 py-2 text-xs">{service.type}</td>
                      <td className="border border-gray-300 px-2 py-2 text-xs">
                        <input type="checkbox" checked={service.customized} readOnly />
                      </td>
                      <td className="border border-gray-300 px-2 py-2 text-xs">-</td>
                      <td className="border border-gray-300 px-2 py-2 text-xs">-</td>
                      <td className="border border-gray-300 px-2 py-2 text-xs">-</td>
                      <td className="border border-gray-300 px-2 py-2 text-xs">-</td>
                      <td className="border border-gray-300 px-2 py-2 text-xs">-</td>
                      <td className="border border-gray-300 px-2 py-2 text-xs">-</td>
                      <td className="border border-gray-300 px-2 py-2 text-xs">-</td>
                      <td className="border border-gray-300 px-2 py-2 text-xs">-</td>
                      <td className="border border-gray-300 px-2 py-2 text-xs">-</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-600">
              Showing {Math.min(filteredServices.length, entriesPerPage)} of {filteredServices.length} entries
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm">Previous</button>
              <button className="px-3 py-1 bg-red-600 text-white rounded text-sm">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm">Next</button>
            </div>
          </div>

          {/* Products Table */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Products List</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="border border-gray-300 px-4 py-2 text-left">Group</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Arabic Name</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">English Name</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Active</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Flat Price</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Min. Batch</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Qty. Step</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Batch Qty</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">{product.productionGroup}</td>
                      <td className="border border-gray-300 px-4 py-2">{product.arabicName}</td>
                      <td className="border border-gray-300 px-4 py-2">{product.englishName}</td>
                      <td className="border border-gray-300 px-4 py-2">{product.type}</td>
                      <td className="border border-gray-300 px-4 py-2">{product.active ? 'Yes' : 'No'}</td>
                      <td className="border border-gray-300 px-4 py-2">{product.flatPrice ? 'Yes' : 'No'}</td>
                      <td className="border border-gray-300 px-4 py-2">{product.price}</td>
                      <td className="border border-gray-300 px-4 py-2">{product.minBatch}</td>
                      <td className="border border-gray-300 px-4 py-2">{product.qtyStep}</td>
                      <td className="border border-gray-300 px-4 py-2">{product.batchQty}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <div className="flex gap-1">
                          <button className="bg-teal-500 text-white p-1 rounded text-xs">
                            <FileText size={12} />
                          </button>
                          <button className="bg-red-500 text-white p-1 rounded text-xs">
                            <Settings size={12} />
                          </button>
                          <button className="bg-yellow-500 text-white p-1 rounded text-xs">
                            <HelpCircle size={12} />
                          </button>
                          <button className="bg-blue-500 text-white p-1 rounded text-xs">
                            <Edit2 size={12} />
                          </button>
                          <button 
                            onClick={() => deleteProduct(product.id)}
                            className="bg-red-600 text-white p-1 rounded text-xs"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Guidance Tab */}
      {activeTab === 'guidance' && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-end mb-6">
            <div className="flex gap-2">
              <button
                onClick={() => setShowGuidanceModal(true)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center gap-2"
              >
                <Plus size={16} />
                Add
              </button>
              <button
                onClick={() => setShowNoteModal(true)}
                className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 flex items-center gap-2"
              >
                <Save size={16} />
                Save
              </button>
              <button
                onClick={() => setGuidances([])}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center gap-2"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>

          {/* Guidance List */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="border border-gray-300 px-4 py-2 text-left">Guideline Ar</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Guideline En</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Group</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {guidances.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="border border-gray-300 px-4 py-8 text-center text-gray-500">
                      No data available in table
                    </td>
                  </tr>
                ) : (
                  guidances.map(guidance => (
                    <tr key={guidance.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 max-w-xs truncate">{guidance.arabicGuideline}</td>
                      <td className="border border-gray-300 px-4 py-2 max-w-xs truncate">{guidance.englishGuideline}</td>
                      <td className="border border-gray-300 px-4 py-2">{guidance.group}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <div className="flex gap-1">
                          <button className="bg-blue-500 text-white p-1 rounded text-xs">
                            <Edit2 size={12} />
                          </button>
                          <button 
                            onClick={() => deleteGuidance(guidance.id)}
                            className="bg-red-600 text-white p-1 rounded text-xs"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Notes Section */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Notes Management</h3>
            
            {/* Notes Form */}
            <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded">
              <div>
                <label className="block text-sm font-medium mb-2">Note Ar</label>
                <textarea
                  value={noteForm.noteAr}
                  onChange={(e) => setNoteForm({...noteForm, noteAr: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2 h-20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Note En</label>
                <textarea
                  value={noteForm.noteEn}
                  onChange={(e) => setNoteForm({...noteForm, noteEn: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2 h-20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Ordering</label>
                <input
                  type="text"
                  value={noteForm.ordering}
                  onChange={(e) => setNoteForm({...noteForm, ordering: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <button
                  onClick={handleSaveNote}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mt-2 w-full"
                >
                  Save
                </button>
              </div>
            </div>

            {/* Notes Table */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span>Show</span>
                <select className="border border-gray-300 rounded px-2 py-1">
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <span>entries</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Search:</span>
                <input
                  type="text"
                  className="border border-gray-300 rounded px-3 py-1"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="border border-gray-300 px-4 py-2 text-left">NoteAR</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Note En</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Ordering</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {notes.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="border border-gray-300 px-4 py-8 text-center text-gray-500">
                        No data available in table
                      </td>
                    </tr>
                  ) : (
                    notes.map(note => (
                      <tr key={note.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2">{note.noteAr}</td>
                        <td className="border border-gray-300 px-4 py-2">{note.noteEn}</td>
                        <td className="border border-gray-300 px-4 py-2">{note.ordering}</td>
                        <td className="border border-gray-300 px-4 py-2">
                          <div className="flex gap-1">
                            <button className="bg-blue-500 text-white p-1 rounded text-xs">
                              <Edit2 size={12} />
                            </button>
                            <button className="bg-red-600 text-white p-1 rounded text-xs">
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-600">
                Showing 0 to 0 of 0 entries
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-gray-300 rounded text-sm">Previous</button>
                <button className="px-3 py-1 bg-red-600 text-white rounded text-sm">1</button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm">Next</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {showServiceModal && <ServiceModal />}
      {showProductModal && <ProductModal />}
      {showGuidanceModal && <GuidanceModal />}
      {showNoteModal && <NoteModal />}
    </div>
  );
};

export default ProductManagement;