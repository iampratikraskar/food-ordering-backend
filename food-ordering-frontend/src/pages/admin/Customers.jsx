import { useEffect, useState } from "react";
import {
    getAllCustomers,
    deleteCustomer
} from "../../services/customerService";

const Customers = () => {

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const loadCustomers = async () => {

        try {

            setLoading(true);

            const data = await getAllCustomers();

            setCustomers(data);

        } catch (error) {

            console.error(
                "Failed to load customers:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to load customers."
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {
        loadCustomers();
    }, []);


    const handleDelete = async (id, name) => {

        const confirmed = window.confirm(
            `Are you sure you want to delete ${name}?`
        );

        if (!confirmed) {
            return;
        }

        try {

            await deleteCustomer(id);

            alert(
                "Customer deleted successfully!"
            );

            await loadCustomers();

        } catch (error) {

            console.error(
                "Failed to delete customer:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to delete customer."
            );
        }
    };


    const filteredCustomers = customers.filter(
        (customer) => {

            const searchText =
                search.toLowerCase().trim();

            return (
                customer.fullName
                    ?.toLowerCase()
                    .includes(searchText) ||

                customer.email
                    ?.toLowerCase()
                    .includes(searchText) ||

                customer.phone
                    ?.toLowerCase()
                    .includes(searchText)
            );
        }
    );


    if (loading) {

        return (
            <div className="min-h-screen flex items-center justify-center">

                <div className="text-center">

                    <div className="text-5xl mb-4">
                        👥
                    </div>

                    <p className="text-gray-600">
                        Loading customers...
                    </p>

                </div>

            </div>
        );
    }


    return (

        <div className="min-h-screen bg-gray-50">

            {/* HEADER */}

            <div className="bg-white shadow-sm">

                <div className="max-w-7xl mx-auto px-6 py-6">

                    <div className="flex justify-between items-center gap-6">

                        <div>

                            <h1 className="text-3xl font-bold text-gray-800">
                                👥 Customer Management
                            </h1>

                            <p className="text-gray-500 mt-1">
                                View and manage registered customers
                            </p>

                        </div>

                        <button
                            onClick={loadCustomers}
                            className="bg-orange-500 text-white px-5 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
                        >
                            Refresh
                        </button>

                    </div>

                </div>

            </div>


            <div className="max-w-7xl mx-auto px-6 py-8">


                {/* STATISTICS */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                    <div className="bg-white rounded-xl shadow-sm p-6">

                        <p className="text-gray-500">
                            Total Customers
                        </p>

                        <p className="text-3xl font-bold text-gray-800 mt-2">
                            {customers.length}
                        </p>

                    </div>


                    <div className="bg-white rounded-xl shadow-sm p-6">

                        <p className="text-gray-500">
                            Search Results
                        </p>

                        <p className="text-3xl font-bold text-orange-500 mt-2">
                            {filteredCustomers.length}
                        </p>

                    </div>

                </div>


                {/* SEARCH */}

                <div className="bg-white rounded-xl shadow-md p-5 mb-8">

                    <label className="block font-semibold text-gray-700 mb-2">
                        🔍 Search Customers
                    </label>

                    <input
                        type="text"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        placeholder="Search by name, email or phone..."
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />

                </div>


                {/* CUSTOMER TABLE */}

                {filteredCustomers.length === 0 ? (

                    <div className="bg-white rounded-xl shadow-md p-12 text-center">

                        <div className="text-6xl mb-4">
                            👤
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800">
                            No Customers Found
                        </h2>

                        <p className="text-gray-500 mt-2">

                            {search
                                ? "No customers match your search."
                                : "There are no registered customers yet."}

                        </p>

                    </div>

                ) : (

                    <div className="bg-white rounded-xl shadow-md overflow-hidden">

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead className="bg-gray-100">

                                    <tr>

                                        <th className="text-left px-6 py-4">
                                            ID
                                        </th>

                                        <th className="text-left px-6 py-4">
                                            Customer
                                        </th>

                                        <th className="text-left px-6 py-4">
                                            Email
                                        </th>

                                        <th className="text-left px-6 py-4">
                                            Phone
                                        </th>

                                        <th className="text-center px-6 py-4">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {filteredCustomers.map(
                                        (customer) => (
                                            <tr
                                                key={customer.id}
                                                className="border-t hover:bg-gray-50"
                                            >
                                                <td className="px-6 py-4 text-gray-500">
                                                    #{customer.id}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-lg">
                                                            👤
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-gray-800">
                                                                {customer.fullName}
                                                            </p>
                                                            <p className="text-xs text-gray-400">
                                                                Customer
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600">
                                                    {customer.email}
                                                </td>
                                                <td className="px-6 py-4 text-gray-600">
                                                    {customer.phone || "Not provided"}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex justify-center">
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    customer.id,
                                                                    customer.fullName
                                                                )
                                                            }
                                                            className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
                                                        >
                                                            🗑️ Delete
                                                        </button>
                                                  </div>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Customers;