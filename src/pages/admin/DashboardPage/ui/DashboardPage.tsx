export const DashboardPage = () => {
    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your overview.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium">Total Orders</h3>
            <p className="text-3xl font-bold text-[#3E236E]">142</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium">Vendors</h3>
            <p className="text-3xl font-bold text-[#3E236E]">24</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium">Active Packs</h3>
            <p className="text-3xl font-bold text-[#3E236E]">89</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium">Revenue</h3>
            <p className="text-3xl font-bold text-[#3E236E]">$42,850</p>
          </div>
        </div>
      </div>
    );
  };