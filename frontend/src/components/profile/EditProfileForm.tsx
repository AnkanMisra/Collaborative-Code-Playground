import { useState } from "react";

interface ProfileData {
  fullName: string | null;
  bio: string | null;
  preferredLanguages: string | null;
  editorTheme: string | null;
}
const EditProfileForm = ({ updateProfileData, profileData }: { updateProfileData: (profileData: ProfileData) => void, profileData: ProfileData | null }) => {
  const [formData, setFormData] = useState({
    fullName: profileData?.fullName || "" ,
    bio: profileData?.bio || "",
    preferredLanguages: profileData?.preferredLanguages || "",
    editorTheme: profileData?.editorTheme || "dark",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.bio && formData.preferredLanguages && formData.editorTheme) {
        updateProfileData(formData);    
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          required
          onChange={handleChange}
          className="w-full bg-[#0F172A]/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
          placeholder="Enter your full name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          required
          onChange={handleChange}
          className="w-full bg-[#0F172A]/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
          placeholder="Tell us about yourself"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Preferred Languages</label>
        <input
          type="text"
          name="preferredLanguages"
          value={formData.preferredLanguages}
          required
          onChange={handleChange}
          className="w-full bg-[#0F172A]/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
          placeholder="e.g., JavaScript, Python, TypeScript"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Editor Theme</label>
        <select
          name="editorTheme"
          value={formData.editorTheme}
          required
          onChange={handleChange}
          className="w-full bg-[#0F172A]/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
          <option value="solarized">Solarized</option>
        </select>
      </div>

      <button
        type="submit"
        className="px-6 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-all"
      >
        Save Changes
      </button>
    </form>
  );
};

export default EditProfileForm;