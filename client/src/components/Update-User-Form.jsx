import { useState, useEffect } from 'react';
import { Spinner } from './Spinner';
import { updateCurrentUser } from '../apis/user';
import { toast } from 'sonner';

const UpdateUserForm = ({ user }) => {
    const { full_name, email, phone_number } = user
    const [formData, setFormData] = useState(null)
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (user) {
            setFormData({
                full_name: full_name || '',
                email: email || '',
                old_password: '',
                new_password: '',
                confirm_new_password: '',
                phone_number: phone_number || '',
            })
        }
    }, [user])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setErrors([])

        const changedData = Object.fromEntries(
            Object.entries(formData).filter(([key, value]) => value && value !== user[key])
        );

        if (!Object.keys(changedData).length) {
            setIsLoading(false)
            toast.info('No changes detected')
            return
        }

        const res = await updateCurrentUser(user.id, changedData)
        if (res.success) {
            setFormData(res.user)
            toast.success('Profile has been updated!')
        } else {
            setErrors(Array.isArray(res.error) ? res.error : [res.error])
        }
        setIsLoading(false)
    };

    if (!formData) return <Spinner />

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
                    className="w-full text-sm font-medium bg-mainOrange text-white rounded-lg px-4 py-2 mt-4 hover:bg-neutral-900"
                >
                    {isLoading ? <Spinner /> : 'Update Profile'}
                </button>
            </form>
        </div>
    );
};

export default UpdateUserForm;

