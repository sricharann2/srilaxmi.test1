import React from 'react';
import { ClipboardList } from 'lucide-react';
import { EntryData } from '../types';

interface DataViewerPageProps {
  entries: EntryData[];
}

interface VillageData {
  entries: EntryData[];
  totalBags: number;
}

function DataViewerPage({ entries }: DataViewerPageProps) {
  const villageData = entries.reduce<Record<string, VillageData>>((acc, entry) => {
    if (!acc[entry.village]) {
      acc[entry.village] = { entries: [], totalBags: 0 };
    }
    
    const netWeight = entry.loadedWeight - entry.emptyWeight;
    const bags = Math.round((netWeight / entry.bagWeight) * 100) / 100;
    
    acc[entry.village].entries.push(entry);
    acc[entry.village].totalBags += bags;
    
    return acc;
  }, {});

  return (
    <div className="p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-orange-100 p-3 rounded-full">
              <ClipboardList className="w-8 h-8 text-orange-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Data Viewer</h1>
          </div>

          {Object.entries(villageData).length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No data entries yet. Start by adding some data in the Data Entry page.
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(villageData).map(([village, data]) => (
                <div key={village} className="border rounded-lg overflow-hidden">
                  <div className="bg-orange-50 px-6 py-4 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">{village}</h2>
                    <div className="text-orange-600 font-medium">
                      Total Bags: {Math.round(data.totalBags * 100) / 100}
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Vehicle Number
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Loaded Weight
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Empty Weight
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Bag Weight
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Net Weight
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total Bags
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {data.entries.map((entry, index) => {
                          const netWeight = entry.loadedWeight - entry.emptyWeight;
                          const bags = netWeight / entry.bagWeight;
                          return (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {entry.vehicleNumber}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {entry.loadedWeight.toFixed(2)} kg
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {entry.emptyWeight.toFixed(2)} kg
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {entry.bagWeight.toFixed(2)} kg
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {netWeight.toFixed(2)} kg
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {bags.toFixed(2)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DataViewerPage;