import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { parseSafeJSON } from '../utils/auth'; // adjust the path if needed

export default function DistrictDashboard() {
  const navigate = useNavigate();
  const [district, setDistrict] = useState(() => {
    const saved = localStorage.getItem("districtUser");
    return saved ? JSON.parse(saved) : { name: '', user: '', email: '' };
  });

  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [filterStatus, setFilterStatus] = useState('Pending');

  useEffect(() => {
    const savedRequests = parseSafeJSON(localStorage.getItem('requests'), []);
    const filteredRequests = savedRequests.filter(req => req.to.includes(district.name));
    setRequests(filteredRequests);
  }, [district.name]);

  const confirmStatusChange = () => {
    const { index, status } = pendingAction;
    const updatedRequests = [...requests];
    updatedRequests[index].status = status;
    setRequests(updatedRequests);
    setMessage(`Request ${status}`);
    setTimeout(() => setMessage(''), 2000);

    const allRequests = parseSafeJSON(localStorage.getItem('requests'), []).map(req =>
      req.to.includes(district.name) && req.requestedAt === updatedRequests[index].requestedAt
        ? { ...req, status }
        : req
    );
    localStorage.setItem('requests', JSON.stringify(allRequests));
    setShowModal(false);
    setPendingAction(null);
  };

  const handleStatusChange = (index, status) => {
    setPendingAction({ index, status });
    setShowModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('districtUser');
    navigate('/district/login');
  };

  const filteredRequests = requests.filter(req =>
    filterStatus === 'All' || req.status === filterStatus
  );

  return (
    <main className="min-h-screen bg-white p-6">
      <div className="flex items-center justify-between mb-6">
        <Link to="/">
          <img src="/personl-logo.png" alt="PersonL Logo" className="h-10" />
        </Link>
        <button
          onClick={handleLogout}
          className="text-sm text-[#003594] font-semibold border border-[#003594] px-3 py-1 rounded hover:bg-[#003594] hover:text-white"
        >
          Logout
        </button>
      </div>

      <h1 className="text-3xl font-bold text-[#003594] mb-6 text-center">District Dashboard</h1>

      <section className="bg-white border p-6 rounded mb-6 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold text-[#003594] mb-4">District Information</h2>
        <p><strong>District:</strong> {district.name}</p>
        <p><strong>Name:</strong> {district.user}</p>
        <p><strong>Email:</strong> {district.email}</p>
      </section>

      <section className="bg-white border p-6 rounded max-w-3xl mx-auto">
        <h2 className="text-xl font-bold text-[#003594] mb-4">Incoming File Transfer Requests</h2>
        {message && (
          <div className="mb-4 p-2 bg-green-100 border border-green-300 text-green-800 rounded">
            {message}
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Filter by Status:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border p-2 rounded w-full md:w-1/2"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Denied">Denied</option>
          </select>
        </div>

        {filteredRequests.map((req, idx) => (
          <div key={idx} className="mb-4 border rounded p-4">
            <p><strong>Requested From:</strong> {req.from}</p>
            <p><strong>To:</strong> {req.to}</p>
            <p><strong>Requested At:</strong> {req.requestedAt}</p>
            <p><strong>Status:</strong> {req.status}</p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleStatusChange(idx, 'Approved')}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Approve
              </button>
              <button
                onClick={() => handleStatusChange(idx, 'Denied')}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Deny
              </button>
            </div>
          </div>
        ))}
      </section>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Status Change</h3>
            <p className="mb-4">Are you sure you want to <strong>{pendingAction.status}</strong> this request?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmStatusChange}
                className={`px-4 py-2 rounded text-white ${pendingAction.status === 'Approved' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
