import { useState } from 'react';
import { Spinner } from './Spinner';

const UpdateAddressForm = () => {
    const [formData, setFormData] = useState({
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        postal_code: '',
        country: ''
    });

    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
        setSuccess(null)
        
    }

    return (
        <div className="max-w-lg py-4">
            <h2 className="text-2xl font-semibold mb-6">Update Address</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Address Line 1 */}
                <div>
                    <label className="block text-sm font-medium">Address Line 1</label>
                    <input
                        type="text"
                        name="address_line1"
                        value={formData.address_line1}
                        onChange={handleChange}
                        className="mt-1 block w-full border rounded-md px-3 py-2"
                        placeholder="Enter address line 1"
                        required
                    />
                </div>
                
                {/* Address Line 2 */}
                <div>
                    <label className="block text-sm font-medium">Address Line 2</label>
                    <input
                        type="text"
                        name="address_line2"
                        value={formData.address_line2}
                        onChange={handleChange}
                        className="mt-1 block w-full border rounded-md px-3 py-2"
                        placeholder="Enter address line 2 (optional)"
                    />
                </div>
                
                {/* City */}
                <div>
                    <label className="block text-sm font-medium">City</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="mt-1 block w-full border rounded-md px-3 py-2"
                        placeholder="Enter city"
                        required
                    />
                </div>
                
                {/* State */}
                <div>
                    <label className="block text-sm font-medium">State</label>
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="mt-1 block w-full border rounded-md px-3 py-2"
                        placeholder="Enter state"
                        required
                    />
                </div>
                
                {/* Postal Code */}
                <div>
                    <label className="block text-sm font-medium">Postal Code</label>
                    <input
                        type="text"
                        name="postal_code"
                        value={formData.postal_code}
                        onChange={handleChange}
                        className="mt-1 block w-full border rounded-md px-3 py-2"
                        placeholder="Enter postal code"
                        required
                    />
                </div>
                
                {/* Country */}
                <div>
                    <label className="block text-sm font-medium">Country</label>
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="mt-1 block w-full border rounded-md px-3 py-2"
                        placeholder="Enter country"
                        required
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
                    {isLoading ? <Spinner /> : 'Update Address'}
                </button>
            </form>
        </div>
    );
};

export default UpdateAddressForm;