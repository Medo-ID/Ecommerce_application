import { useState, useEffect } from 'react';
import { Spinner } from './Spinner';
import { updateUserAddress } from '../apis/user';
import { toast } from 'sonner';

const UpdateAddressForm = ({ address }) => {
    const { address_line1, address_line2, city, state, postal_code, country } = address
    const [formData, setFormData] = useState(null);
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (address) {
            setFormData({
                address_line1: address_line1 || '',
                address_line2: address_line2 || '',
                city: city || '',
                state: state|| '',
                postal_code: postal_code || '',
                country: country || ''
            })
        }
    }, [address])
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setErrors([])

        const changedData = Object.fromEntries(
            Object.entries(formData).filter(([key, value]) => value && value !== address[key])
        );

        if (!Object.keys(changedData).length) {
            setIsLoading(false)
            toast.info('No changes detected')
            return
        }

        const res = await updateUserAddress(address.user_id, changedData)
        if (res.success) {
            setFormData(res.address)
            toast.success('Address has been updated!')
        } else {
            setErrors(Array.isArray(res.error) ? res.error : [res.error])
        }
        setIsLoading(false)
    };
    
    if (!formData) return <Spinner />

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
                {errors.length > 0 && (
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index} className="text-xs text-red-600 font-light">
                                {error}
                            </li>
                        ))}
                    </ul>
                )}
                {/* Submit Button */}
                <button
                    disabled={isLoading}
                    type="submit"
                    className="w-full text-sm font-medium bg-mainOrange text-white rounded-lg py-2 mt-4 hover:bg-neutral-900"
                >
                    {isLoading ? <Spinner /> : 'Update Address'}
                </button>
            </form>
        </div>
    );
};

export default UpdateAddressForm;