import React, { useState } from 'react';
import { Warehouse, Save, RotateCcw, Plus, X } from 'lucide-react';
import { PREDEFINED_VILLAGES } from '../utils/constants';
import { EntryData } from '../types';

interface DataEntryPageProps {
  onSave: (entry: EntryData) => void;
}

function DataEntryPage({ onSave }: DataEntryPageProps) {
  const [formData, setFormData] = useState<EntryData>({
    village: '',
    vehicleNumber: '',
    loadedWeight: 0,
    emptyWeight: 0,
    bagWeight: 0
  });
  const [showCustomVillage, setShowCustomVillage] = useState(false);
  const [customVillage, setCustomVillage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    handleReset();
  };

  const handleReset = () => {
    setFormData({
      village: '',
      vehicleNumber: '',
      loadedWeight: 0,
      emptyWeight: 0,
      bagWeight: 0
    });
    setShowCustomVillage(false);
    setCustomVillage('');
  };

  const handleVillageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'other') {
      setShowCustomVillage(true);
      setFormData({ ...formData, village: '' });
    } else {
      setShowCustomVillage(false);
      setFormData({ ...formData, village: value });
    }
  };

  const handleCustomVillageSubmit = () => {
    if (customVillage.trim()) {
      setFormData({ ...formData, village: customVillage.trim() });
      setShowCustomVillage(false);
    }
  };

  const netWeight = formData.loadedWeight - formData.emptyWeight - formData.bagWeight;

  return (
    <div className="p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-orange-100 p-3 rounded-full">
              <Warehouse className="w-8 h-8 text-orange-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Rice Mill Data Entry</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Village Name
                </label>
                {showCustomVillage ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customVillage}
                      onChange={(e) => setCustomVillage(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter village name"
                      required
                    />
                    <button
                      type="button"
                      onClick={handleCustomVillageSubmit}
                      className="px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowCustomVillage(false);
                        setCustomVillage('');
                      }}
                      className="px-4 py-3 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <select
                    value={formData.village || ''}
                    onChange={handleVillageChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  >
                    <option value="">Select a village</option>
                    {PREDEFINED_VILLAGES.map((village) => (
                      <option key={village} value={village}>
                        {village}
                      </option>
                    ))}
                    <option value="other">Add Other Village</option>
                  </select>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehicle Number
                </label>
                <input
                  type="text"
                  value={formData.vehicleNumber}
                  onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value.toUpperCase() })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter vehicle number"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loaded Weight (kg)
                </label>
                <input
                  type="number"
                  value={formData.loadedWeight || ''}
                  onChange={(e) => setFormData({ ...formData, loadedWeight: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                  min="0"
                  step="0.01"
                  placeholder="e.g., 1000.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Empty Weight (kg)
                </label>
                <input
                  type="number"
                  value={formData.emptyWeight || ''}
                  onChange={(e) => setFormData({ ...formData, emptyWeight: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                  min="0"
                  step="0.01"
                  placeholder="e.g., 800.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bag Weight (kg)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.bagWeight || ''}
                    onChange={(e) => setFormData({ ...formData, bagWeight: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                    min="0"
                    step="0.5"
                    placeholder="e.g., 42.5"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                    kg
                  </span>
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-lg font-semibold text-orange-800">
                  Net Weight: {netWeight.toFixed(2)} kg
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Save Entry
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DataEntryPage;