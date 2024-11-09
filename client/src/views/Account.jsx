import { useState, useEffect, Suspense } from "react";
import OrdersList from "../components/Orders-List";
import UpdateUserForm from "../components/Update-User-Form";
import UpdateAddressForm from "../components/Update-Address-From";
import { MapPin, ShoppingBasket, UserPen } from "lucide-react";
import { fetchCurrentUser, fetchUserAddress } from "../apis/user";
import { Spinner } from "../components/Spinner";
import { fetchOrders } from "../apis/orders";

function Account() {
    const [field, setField] = useState(() => localStorage.getItem("selectedField") || "orders");
    const [orders, setOrders] = useState([]);
    const [currentUser, setCurrentUser] = useState();
    const [userAddress, setUserAddress] = useState(null);

    const loadData = async () => {
        const [userRes, addressRes, ordersRes] = await Promise.all([
            fetchCurrentUser(),
            fetchUserAddress(),
            fetchOrders(),
        ]);

        if (userRes.success) setCurrentUser(userRes.user);
        if (addressRes.success) setUserAddress(addressRes.address);
        if (ordersRes.success) setOrders(ordersRes.orders);
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        localStorage.setItem("selectedField", field);
    }, [field]);

    return (
        <div className="container mx-auto space-y-8 my-8 md:py-4 px-4">
            <h2 className="text-xl font-semibold">Account Details</h2>
            <div className="flex w-full h-fit border border-mainTeal/10 space-y-4 md:space-y-0 flex-col md:flex-row">
                {/* Left Sidebar */}
                <div className="flex-none max-w-full md:max-w-xs bg-white p-4 border-r border-mainTeal/25">
                    <ul className="space-y-2">
                        <li>
                            <button
                                className={`flex gap-2 items-center w-full text-left py-2 px-6 text-sm hover:bg-mainTeal/5 ${
                                    field === "orders" ? "font-semibold border-l-2 border-mainOrange" : "text-neutral-700"
                                }`}
                                onClick={() => setField("orders")}
                            >
                                <ShoppingBasket size={18} />
                                Orders
                            </button>
                        </li>
                        <hr className="border-neutral-300/50" />
                        <li>
                            <button
                                className={`flex gap-2 items-center w-full text-left py-2 px-6 text-sm hover:bg-mainTeal/5 ${
                                    field === "profile" ? "font-semibold border-l-2 border-mainOrange" : "text-neutral-700"
                                }`}
                                onClick={() => setField("profile")}
                            >
                                <UserPen size={18} />
                                Profile
                            </button>
                        </li>
                        <hr className="border-neutral-300/50" />
                        <li>
                            <button
                                className={`flex gap-2 items-center w-full text-left py-2 px-6 text-sm hover:bg-mainTeal/5 ${
                                    field === "address" ? "font-semibold border-l-2 border-mainOrange" : "text-neutral-700"
                                }`}
                                onClick={() => setField("address")}
                            >
                                <MapPin size={18} />
                                Address
                            </button>
                        </li>
                        <hr className="border-neutral-300/50" />
                    </ul>
                </div>

                {/* Right Content Area */}
                <div className="grow bg-white p-6">
                    <h2 className="text-lg font-semibold text-mainTeal">
                        {field === "orders" ? "Orders" : field === "profile" ? "Profile" : "Address"}
                    </h2>

                    <Suspense fallback={<Spinner />}>
                        {field === "orders" && currentUser ? (
                            <OrdersList orders={orders} />
                        ) : field === "profile" && currentUser ? (
                            <UpdateUserForm user={currentUser} />
                        ) : field === "address" && userAddress ? (
                            <UpdateAddressForm address={userAddress} />
                        ) : (
                            <Spinner />
                        )}
                    </Suspense>
                </div>
            </div>
        </div>
    );
}

export default Account;