import { useState } from 'react';
import { Spinner } from './Spinner';

const UpdateUserForm = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        old_password: '',
        new_password: '',
        confirm_new_password: '',
        phone_number: ''
    })

    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [isLoading, setIsLoading] = useState(false) 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
        setSuccess(null)
        
    };

    return (
        <div className="max-w-lg py-4">
            <h2 className="text-2xl font-semibold mb-6">Update Information</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Full Name */}
                <div>
                    <label className="block text-sm font-medium">Full Name</label>
                    <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        className="mt-1 block w-full border rounded-md px-3 py-2"
                        placeholder="Enter full name"
                    />
                </div>
                
                {/* Email */}
                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full border rounded-md px-3 py-2"
                        placeholder="Enter email"
                    />
                </div>
                
                {/* Phone Number */}
                <div>
                    <label className="block text-sm font-medium">Phone Number</label>
                    <input
                        type="tel"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        className="mt-1 block w-full border rounded-md px-3 py-2"
                        placeholder="Enter phone number"
                    />
                </div>
                
                {/* Old Password */}
                <div>
                    <label className="block text-sm font-medium">Old Password</label>
                    <input
                        type="password"
                        name="old_password"
                        value={formData.old_password}
                        onChange={handleChange}
                        className="mt-1 block w-full border rounded-md px-3 py-2"
                        placeholder="Enter old password"
                    />
                </div>
                
                {/* New Password */}
                <div>
                    <label className="block text-sm font-medium">New Password</label>
                    <input
                        type="password"
                        name="new_password"
                        value={formData.new_password}
                        onChange={handleChange}
                        className="mt-1 block w-full border rounded-md px-3 py-2"
                        placeholder="Enter new password"
                    />
                </div>
                
                {/* Confirm New Password */}
                <div>
                    <label className="block text-sm font-medium">Confirm New Password</label>
                    <input
                        type="password"
                        name="confirm_new_password"
                        value={formData.confirm_new_password}
                        onChange={handleChange}
                        className="mt-1 block w-full border rounded-md px-3 py-2"
                        placeholder="Confirm new password"
                    />
                </div>
                
                {/* Error Message */}
                {error && (
                    <div className="text-red-500 text-sm mt-2">{error}</div>
                )}
                
                {/* Success Message */}
                {success && (
                    <div className="text-green-500 text-sm mt-2">{success}</div>
                )}
                
                {/* Submit Button */}
                <button
                    disabled={isLoading}
                    type="submit"
                    className="w-full bg-mainOrange text-white rounded-md px-4 py-2 mt-4 hover:bg-mainTeal"
                >   
                    {isLoading ? <Spinner /> : 'Update'}
                </button>
            </form>
        </div>
    );
};

export default UpdateUserForm;
