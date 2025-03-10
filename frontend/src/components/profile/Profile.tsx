import { useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import SkillProgressBar from "./SkillProgressBar";
import ActivityFeed from "./ActivityFeed";
import EditProfileForm from "./EditProfileForm";
import { useState, useEffect } from "react";
import Cropper from "react-easy-crop"; // Import a cropping library
import Modal from "react-modal"; // Import a modal library
import getCroppedImg from "./cropImage";

Chart.register(...registerables);

interface ProfileData {
  fullName: string | null;
  bio: string | null;
  preferredLanguages: string | null;
  editorTheme: string | null;
}

const Profile = () => {
  const { user } = useUser();
  const [coverPhoto, setCoverPhoto] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  Modal.setAppElement("#root");

  useEffect(() => {
    if (user) {
      setProfileData({
        fullName: `${user.firstName} ${user.lastName}`,
        bio: (user.unsafeMetadata?.bio as string) || "",
        preferredLanguages:
          (user.unsafeMetadata?.preferredLanguages as string) || "",
        editorTheme: (user.unsafeMetadata?.editorTheme as string) || "",
      });
    }
  }, [user]);

  // Dummy data for charts and activity feed
  const codingActivityData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Coding Activity",
        data: [12, 19, 3, 5, 2, 3],
        borderColor: "#3B82F6",
        fill: false,
      },
    ],
  };

  const languageUsageData = {
    labels: ["JavaScript", "Python", "TypeScript", "Java", "Go"],
    datasets: [
      {
        label: "Hours Spent",
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
        ],
      },
    ],
  };

  const collaborationData = {
    labels: ["Shared Sessions", "Unique Collaborators"],
    datasets: [
      {
        label: "Collaboration Metrics",
        data: [8, 15],
        backgroundColor: ["#3B82F6", "#10B981"],
      },
    ],
  };

  const updateProfileData = async (profileData: NonNullable<ProfileData>) => {
    if (!user) return;

    await user.update({
      firstName: profileData.fullName!.split(" ")[0],
      lastName: profileData.fullName!.split(" ")[1] || "",
      unsafeMetadata: {
        bio: profileData.bio,
        preferredLanguages: profileData.preferredLanguages,
        editorTheme: profileData.editorTheme,
      },
    });
  };

  const handleCoverPhotoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const coverPhoto = e.target?.result as string;
        setCoverPhoto(coverPhoto);        
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfilePictureChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const profilePicture = e.target?.result as string;
        setImageToCrop(profilePicture); // Set the image to crop
        setIsCropModalOpen(true); // Open the cropping modal
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = async () => {
    const croppedImage = await getCroppedImg(
      imageToCrop!,
      croppedAreaPixels,
      0
    );
    if (croppedImage) {
      user?.setProfileImage({ file: croppedImage }); // Set the profile image
    } else {
      console.error("File is invalid. must be a valid base64 encoded image");
    }
    setIsCropModalOpen(false);
  };

  return (
    <div className="min-h-screen py-4 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Profile Header Section */}
        <motion.div
          className="bg-[#1E293B]/30 rounded-lg p-8 backdrop-blur-sm border border-[#3B82F6]/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            {/* Cover Photo */}
            <div className="h-48 bg-[#0F172A]/50 rounded-lg mb-6 flex items-center justify-center">
              {coverPhoto ? (
                <img
                  src={coverPhoto}
                  alt="Cover Photo"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    multiple={false}
                    className="hidden cover-photo-input"
                    id="cover-photo-input"
                    onChange={handleCoverPhotoChange}                    
                  />
                  <button
                    onClick={() =>
                      document.getElementById("cover-photo-input")?.click()
                    }
                    className="text-sm text-gray-400 hover:text-white transition-all cursor-pointer"
                  >
                    Upload Cover Photo
                  </button>
                </>
              )}
            </div>

            {/* Avatar and User Info */}
            <div className="flex flex-col sm:flex-row items-center gap-6 -mt-16">
              <div className="relative">
                <img
                  src={user?.imageUrl}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-[#1E293B]"
                />
                <button
                  onClick={() =>
                    document.getElementById("profile-picture-input")?.click()
                  }
                  className="absolute bottom-2 right-2 bg-[#3B82F6] p-1 rounded-full text-white hover:bg-[#2563EB] transition-all cursor-pointer"
                >
                  <input
                    type="file"
                    accept="image/*"
                    multiple={false}
                    className="hidden profile-picture-input"
                    id="profile-picture-input"
                    onChange={handleProfilePictureChange}
                  />
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-bold text-white mb-1">
                  {user?.firstName} {user?.lastName}
                </h1>
                <p className="text-gray-400">
                  @{user?.username || "not defined"}
                </p>
                <p className="text-gray-400">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>
                <p className="text-gray-400 mt-1">
                  {profileData?.bio ||
                    "🚀 Passionate about building scalable systems"}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-sm text-gray-400">Online</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Modal for cropping image */}
        <Modal
          className="bg-[#1E293B]/30 rounded-lg p-8 backdrop-blur-sm border border-[#3B82F6]/20 h-full"
          isOpen={isCropModalOpen}
          onRequestClose={() => setIsCropModalOpen(false)}
        >
          {/* <h2 className="text-lg font-bold">Crop Your Profile Picture</h2> */}
          {imageToCrop && (
            <Cropper
              classes={{
                containerClassName:
                  "mx-auto max-w-[50%] max-h-full w-full h-full",
              }}
              image={imageToCrop}
              crop={crop}
              zoom={zoom}
              onZoomChange={setZoom}
              aspect={4 / 3}
              onCropComplete={(_, croppedAreaPixels) =>
                setCroppedAreaPixels(croppedAreaPixels)
              }
              onCropChange={setCrop}
            />
          )}
          <button
            className="absolute top-2 right-16 bg-[#3B82F6] p-2 rounded-md text-white hover:bg-[#2563EB] transition-all cursor-pointer"
            onClick={() => setIsCropModalOpen(false)}
          >
            Close
          </button>
          <button
            className="absolute top-2 right-2 bg-[#3B82F6] p-2 rounded-md text-white hover:bg-[#2563EB] transition-all cursor-pointer"
            onClick={() => handleCropComplete()}
          >
            Crop
          </button>
        </Modal>

        {/* Tabbed Interface */}
        <TabGroup className="">
          <TabList className="flex space-x-1 rounded-lg bg-[#1E293B]/30 p-1 mt-8">
            {["Overview", "Skills", "Activity", "Settings"].map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white ${
                    selected
                      ? "bg-[#3B82F6] shadow"
                      : "text-gray-400 hover:bg-[#1E293B]/50"
                  }`
                }
              >
                {tab}
              </Tab>
            ))}
          </TabList>
          <TabPanels className="mt-4">
            {/* Overview Tab */}
            <TabPanel>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Coding Activity Graph */}
                <div className="bg-[#1E293B]/30 rounded-lg p-6 backdrop-blur-sm border border-[#3B82F6]/20">
                  <h3 className="text-white font-medium mb-4">
                    Coding Activity
                  </h3>
                  <Line data={codingActivityData} />
                </div>

                {/* Language Usage */}
                <div className="bg-[#1E293B]/30 rounded-lg p-6 backdrop-blur-sm border border-[#3B82F6]/20">
                  <h3 className="text-white font-medium mb-4">
                    Language Usage
                  </h3>
                  <Pie data={languageUsageData} />
                </div>

                {/* Collaboration Metrics */}
                <div className="bg-[#1E293B]/30 rounded-lg p-6 backdrop-blur-sm border border-[#3B82F6]/20">
                  <h3 className="text-white font-medium mb-4">
                    Collaboration Metrics
                  </h3>
                  <Bar data={collaborationData} />
                </div>
              </div>
            </TabPanel>

            {/* Skills Tab */}
            <TabPanel>
              <div className="bg-[#1E293B]/30 rounded-lg p-6 backdrop-blur-sm border border-[#3B82F6]/20">
                <h3 className="text-white font-medium mb-4">
                  Skills & Preferences
                </h3>
                <SkillProgressBar skill="JavaScript" progress={80} />
                <SkillProgressBar skill="Python" progress={60} />
                <SkillProgressBar skill="TypeScript" progress={90} />
              </div>
            </TabPanel>

            {/* Activity Tab */}
            <TabPanel>
              <div className="bg-[#1E293B]/30 rounded-lg p-6 backdrop-blur-sm border border-[#3B82F6]/20">
                <h3 className="text-white font-medium mb-4">Recent Activity</h3>
                <ActivityFeed />
              </div>
            </TabPanel>

            {/* Settings Tab */}
            <TabPanel>
              <div className="bg-[#1E293B]/30 rounded-lg p-6 backdrop-blur-sm border border-[#3B82F6]/20">
                <h3 className="text-white font-medium mb-4">Edit Profile</h3>
                <EditProfileForm
                  updateProfileData={updateProfileData}
                  profileData={profileData}
                />
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
};

export default Profile;
