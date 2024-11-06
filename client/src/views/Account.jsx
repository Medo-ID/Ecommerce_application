import { useState } from "react";
import UpdateUserForm from "../components/Update-User-Form";
import UpdateAddressForm from "../components/Update-Address-From";
import { MapPin, UserPen } from "lucide-react";

function Account() {
    const [field, setField] = useState('account')
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
                                    field === 'account' ? 'font-semibold border-l-2 border-mainOrange' : 'text-neutral-700'
                                }`}
                                onClick={() => setField('account')}
                            >
                                <UserPen size={18} />
                                Account
                            </button>
                        </li>
                        <hr className="border-neutral-300/50" />
                        <li>
                            <button
                                className={`flex gap-2 items-center w-full text-left py-2 px-6 text-sm hover:bg-mainTeal/5 ${
                                    field === 'address' ? 'font-semibold border-l-2 border-mainOrange' : 'text-neutral-700'
                                }`}
                                onClick={() => setField('address')}
                            >
                                <MapPin size={18} />
                                Address
                            </button>
                        </li>
                    </ul>
                </div>
                
                {/* Right Content Area */}
                <div className="grow bg-white p-6">
                    <h2 className="text-lg font-semibold text-mainTeal">{field === 'account' ? 'Account' : 'Address'}</h2>
                        {field === 'account'
                            ? <UpdateUserForm />
                            : <UpdateAddressForm />
                        }
                </div>
            </div>
        </div>
    
    )
}

export default Account;