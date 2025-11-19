import React, { useState } from 'react';

interface Place {
  id: number;
  name: string;
  type: string;
  address: string;
  status: 'active' | 'inactive' | 'pending';
  rating: number;
  reviews: number;
}

const Placelist: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([
    {
      id: 1,
      name: 'Central Park Restaurant',
      type: 'Restaurant',
      address: '123 Main St, New York',
      status: 'active',
      rating: 4.5,
      reviews: 128
    },
    {
      id: 2,
      name: 'Downtown Cafe',
      type: 'Cafe',
      address: '456 Oak Ave, Chicago',
      status: 'active',
      rating: 4.2,
      reviews: 89
    },
    {
      id: 3,
      name: 'Mountain View Hotel',
      type: 'Hotel',
      address: '789 Pine Rd, Denver',
      status: 'pending',
      rating: 0,
      reviews: 0
    },
    {
      id: 4,
      name: 'City Mall',
      type: 'Shopping',
      address: '321 Elm St, Los Angeles',
      status: 'inactive',
      rating: 3.8,
      reviews: 256
    },
    {
      id: 5,
      name: 'Beach Resort',
      type: 'Resort',
      address: '654 Shore Dr, Miami',
      status: 'active',
      rating: 4.7,
      reviews: 342
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredPlaces = places.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         place.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || place.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const deletePlace = (id: number) => {
    setPlaces(places.filter(place => place.id !== id));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Places Management</h1>
        <p className="text-gray-600 mt-2">Manage all places in the system</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search places by name or address..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Add New Place
          </button>
        </div>
      </div>

      {/* Places Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Place
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPlaces.map((place) => (
                <tr key={place.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{place.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{place.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{place.address}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(place.status)}`}>
                      {place.status.charAt(0).toUpperCase() + place.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">
                      {place.rating > 0 ? (
                        <>
                          ⭐ {place.rating} ({place.reviews} reviews)
                        </>
                      ) : (
                        'No ratings'
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      Edit
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => deletePlace(place.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPlaces.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No places found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default Placelist;