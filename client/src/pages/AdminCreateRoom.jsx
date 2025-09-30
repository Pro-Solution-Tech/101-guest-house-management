import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  X,
  Eye,
  Save,
  ArrowLeft,
  ImagePlus,
  AlertCircle,
  CheckCircle,
  Loader2,
  DollarSign,
  Bed,
  Thermometer,
  Tv,
  Wind,
  Refrigerator,
  Sofa,
  Percent,
  FileImage,
  Trash2,
} from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Make sure this is imported
import { showToast } from "../toastConfig.js";

const CreateRoom = ({ onNavigate = () => {} }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    regularPrice: "",
    discountedPrice: "",
    bedType: "",
    offer: false,
    waterHeater: false,
    Tv: false,
    DSTV: false,
    AC: false,
    fridge: false,
    sofa: false,
    imageURLs: [],
    isAvailable: true,
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({
    current: 0,
    total: 0,
  });
  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(null);

  const fileInputRef = useRef(null);

  // Cloudinary configuration - replace with your actual values
  const CLOUD_NAME = "dcmcrc4v3";
  const UPLOAD_PRESET = "101GuestHouse";

  // Bed types options
  const bedTypes = [
    "Single Size",
    "Double Size",
    "Queen Size",
    "King Size",
    "Half Size",
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Upload single image to Cloudinary
  const uploadImageToCloudinary = async (file) => {
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    formDataUpload.append("upload_preset", UPLOAD_PRESET);
    formDataUpload.append("folder", "guest-house-rooms"); // Optional: organize in folders

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: formDataUpload,
        }
      );

      const data = await res.json();

      if (data.secure_url) {
        return {
          url: data.secure_url,
          publicId: data.public_id,
          originalFilename: data.original_filename,
          format: data.format,
          width: data.width,
          height: data.height,
          bytes: data.bytes,
          resourceType: data.resource_type,
          createdAt: data.created_at,
          // These are useful for deletion and management
          signature: data.signature,
          version: data.version,
          deleteToken: data.delete_token, // If available
        };
      } else {
        throw new Error(data.error?.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };

  // Upload all images to Cloudinary
  const uploadAllImages = async () => {
    if (images.length === 0) return [];

    setUploadProgress({ current: 0, total: images.length });
    const uploadedImages = [];

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      setUploadProgress({ current: i + 1, total: images.length });

      try {
        const uploadResult = await uploadImageToCloudinary(image.file);
        uploadedImages.push({
          ...uploadResult,
          originalName: image.name,
          localId: image.id,
        });
      } catch (error) {
        console.error(`Failed to upload ${image.name}:`, error);
        throw new Error(`Failed to upload ${image.name}: ${error.message}`);
      }
    }

    return uploadedImages;
  };

  // Handle image selection (no upload yet)
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    // Validate file types
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const invalidFiles = files.filter(
      (file) => !validTypes.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      setErrors((prev) => ({
        ...prev,
        images: "Only JPEG, PNG, and WebP images are allowed",
      }));
      showToast("error", "Only JPEG, PNG, and WebP images are allowed", {
        autoClose: 3000,
      });
      return;
    }

    // Check file sizes (max 5MB each)
    const oversizedFiles = files.filter((file) => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      setErrors((prev) => ({
        ...prev,
        images: "Each image must be less than 5MB",
      }));
      showToast("error", "Each image must be less than 5MB", {
        autoClose: 3000,
      });
      return;
    }

    // Check total images limit (max 6)
    if (images.length + files.length > 6) {
      const message = `Maximum 6 images allowed. You can add ${
        6 - images.length
      } more.`;
      setErrors((prev) => ({
        ...prev,
        images: message,
      }));
      showToast("error", message, {
        autoClose: 3000,
      });
      return;
    }

    // Process each file and create preview
    const newImages = files.map((file) => {
      const id = Date.now() + Math.random();
      const reader = new FileReader();

      return new Promise((resolve) => {
        reader.onload = (e) => {
          resolve({
            id: id,
            file: file,
            preview: e.target.result,
            name: file.name,
            size: file.size,
            uploaded: false,
            url: null,
            publicId: null,
          });
        };
        reader.readAsDataURL(file);
      });
    });

    // Wait for all previews to be generated
    Promise.all(newImages).then((processedImages) => {
      setImages((prev) => [...prev, ...processedImages]);
    });

    // Clear any existing image errors
    setErrors((prev) => ({
      ...prev,
      images: "",
    }));

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Remove image from local state
  const removeImage = (imageId) => {
    const imageToRemove = images.find((img) => img.id === imageId);
    if (imageToRemove) {
      URL.revokeObjectURL(imageToRemove.preview); // Clean up memory
    }
    setImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  // Preview image in modal
  const openImagePreview = (image) => {
    setPreviewImage(image);
  };

  // Close preview modal
  const closeImagePreview = () => {
    setPreviewImage(null);
  };

  // Get total image count
  const getTotalImageCount = () => images.length;

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Room name is required";
      showToast("error", "Room name is required", {
        autoClose: 3000,
      });
    }

    if (!formData.description.trim()) {
      newErrors.description = "Room description is required";
      showToast("error", "Room description is required", {
        autoClose: 3000,
      });
    } else if (formData.description.length < 20) {
      newErrors.description = "Description must be at least 20 characters";
      showToast("error", "Description must be at least 20 characters", {
        autoClose: 3000,
      });
    }

    if (!formData.regularPrice) {
      newErrors.regularPrice = "Regular price is required";
      showToast("error", "Regular price is required", {
        autoClose: 3000,
      });
    } else if (formData.regularPrice <= 0) {
      newErrors.regularPrice = "Price must be greater than 0";
      showToast("error", "Price must be greater than 0", {
        autoClose: 3000,
      });
    }

    if (formData.offer) {
      if (!formData.discountedPrice) {
        newErrors.discountedPrice =
          "Discounted price is required when offer is enabled";
        showToast(
          "error",
          "Discounted price is required when offer is enabled",
          {
            autoClose: 3000,
          }
        );
      } else if (formData.discountedPrice <= 0) {
        newErrors.discountedPrice = "Discounted price must be greater than 0";
        showToast("error", "Discounted price must be greater than 0", {
          autoClose: 3000,
        });
      } else if (
        parseFloat(formData.discountedPrice) >=
        parseFloat(formData.regularPrice)
      ) {
        newErrors.discountedPrice =
          "Discounted price must be less than regular price";
        showToast("error", "Discounted price must be less than regular price", {
          autoClose: 3000,
        });
      }
    }

    if (!formData.bedType) {
      newErrors.bedType = "Bed type is required";
      showToast("error", "Bed type is required", {
        autoClose: 3000,
      });
    }

    if (images.length === 0) {
      newErrors.images = "At least one image is required";
      showToast("error", "At least one image is required", {
        autoClose: 3000,
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // First, upload all images to Cloudinary
      const uploadedImages = await uploadAllImages();

      // Prepare room data for API with uploaded image information
      const roomData = {
        ...formData,
        regularPrice: parseFloat(formData.regularPrice),
        discountedPrice: formData.offer
          ? parseFloat(formData.discountedPrice)
          : null,
        imageURLs: uploadedImages.map((img) => img.url),
      };

      // Reset upload progress
      setUploadProgress({ current: 0, total: 0 });

      // Send data to your API
      const response = await fetch("/api/room/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(roomData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to create room");
      }

      const result = await response.json();

      showToast("success", "Room created and posted successfully!", {
        autoClose: 3000,
      });

      // Reset form after successful creation
      setTimeout(() => {
        setFormData({
          name: "",
          description: "",
          regularPrice: "",
          discountedPrice: "",
          bedType: "",
          offer: false,
          waterHeater: false,
          Tv: false,
          DSTV: false,
          AC: false,
          fridge: false,
          sofa: false,
          imageURLs: [],
          isAvailable: true,
        });
        setImages([]);
      }, 2000);
    } catch (error) {
      console.error("Error creating room:", error);
      setErrors({
        submit: error.message || "Failed to create room. Please try again.",
      });
    } finally {
      setLoading(false);
      setUploadProgress({ current: 0, total: 0 });
    }
  };

  return (
    <div className="w-11/12 mx-auto space-y-6 p-4">
      <ToastContainer />

      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => onNavigate("dashboard")}
          className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Dashboard
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Create New Room</h1>
      </div>

      {/* Error Alert */}
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center gap-2">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <span>{errors.submit}</span>
        </div>
      )}

      {/* Upload Progress */}
      {loading && uploadProgress.total > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
            <span className="text-blue-700 font-medium">
              Uploading images... ({uploadProgress.current}/
              {uploadProgress.total})
            </span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  (uploadProgress.current / uploadProgress.total) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Room Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Executive Suite, Deluxe Room"
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Bed Type *
              </label>
              <select
                name="bedType"
                value={formData.bedType}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select bed type</option>
                {bedTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.bedType && (
                <p className="text-red-600 text-sm mt-1">{errors.bedType}</p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-3 border border-gray-300 focus:outline-none rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Describe the room features and amenities..."
            />
            <div className="flex justify-between items-center mt-1">
              {errors.description ? (
                <p className="text-red-600 text-sm">{errors.description}</p>
              ) : (
                <p className="text-sm text-gray-500">
                  {formData.description.length}/500 characters (minimum 20)
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Pricing</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Regular Price (₵) *
              </label>
              <input
                type="number"
                name="regularPrice"
                value={formData.regularPrice}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 focus:outline-none rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="0.00"
                min="0"
              />
              {errors.regularPrice && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.regularPrice}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-center mb-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="offer"
                  checked={formData.offer}
                  onChange={handleInputChange}
                  className="mr-2 rounded text-green-600 focus:ring-green-500"
                />
                <Percent className="h-4 w-4 mr-1 text-green-600" />
                <span className="text-sm font-medium text-gray-700">
                  Has Discount Offer
                </span>
              </label>
              {formData.offer && (
                <input
                  type="number"
                  name="discountedPrice"
                  value={formData.discountedPrice}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Discounted price"
                  min="0"
                />
              )}
              {errors.discountedPrice && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.discountedPrice}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Amenities
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { key: "waterHeater", label: "Water Heater", icon: Thermometer },
              { key: "Tv", label: "TV", icon: Tv },
              { key: "DSTV", label: "DSTV", icon: Tv },
              { key: "AC", label: "Air Conditioning", icon: Wind },
              { key: "fridge", label: "Refrigerator", icon: Refrigerator },
              { key: "sofa", label: "Sofa", icon: Sofa },
            ].map(({ key, label, icon: Icon }) => (
              <label
                key={key}
                className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  name={key}
                  checked={formData[key]}
                  onChange={handleInputChange}
                  className="rounded text-green-600  focus:ring-green-500"
                />
                <Icon className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-700">{label}</span>
              </label>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t">
            <label className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50">
              <input
                type="checkbox"
                name="isAvailable"
                checked={formData.isAvailable}
                onChange={handleInputChange}
                className="rounded text-green-600 focus:outline-none focus:ring-green-500"
              />
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-gray-700">
                Room is Available for Booking
              </span>
            </label>
          </div>
        </div>

        {/* Images Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Room Images
          </h2>

          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600">
              {getTotalImageCount()}/6 images selected
            </p>
            {getTotalImageCount() > 0 && (
              <span className="text-xs text-gray-500">
                Click images to remove them
              </span>
            )}
          </div>

          {/* Upload Area */}
          {getTotalImageCount() < 6 && (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all duration-200"
            >
              <ImagePlus className="mx-auto h-12 w-12 text-gray-400 mb-3" />
              <p className="text-gray-600 font-medium">
                Click to select room images
              </p>
              <p className="text-xs text-gray-500 mt-2">
                JPG, PNG, WEBP • Max 5MB each • Up to 6 images
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Images will be uploaded when you submit the form
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageSelect}
                className="hidden"
              />
            </div>
          )}

          {errors.images && (
            <p className="text-red-600 text-sm mt-2">{errors.images}</p>
          )}

          {/* Images Grid */}
          {getTotalImageCount() > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
              {images.map((image) => (
                <div key={image.id} className="relative group">
                  <img
                    src={image.preview}
                    alt={image.name}
                    className="w-full h-32 object-cover rounded-lg border-2 border-gray-200 group-hover:border-red-300 transition-colors cursor-pointer"
                    onClick={() => openImagePreview(image)}
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(image.id);
                    }}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg"
                    title="Remove image"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <div className="absolute bottom-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded font-medium">
                    Ready to upload
                  </div>
                  <div className="absolute bottom-2 right-2 bg-blue-500 text-white p-1 rounded-full">
                    <Upload className="h-3 w-3" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg flex items-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {uploadProgress.total > 0
                  ? `Uploading Images (${uploadProgress.current}/${uploadProgress.total})...`
                  : "Creating Room..."}
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Create Room
              </>
            )}
          </button>
        </div>
      </form>

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeImagePreview}
              className="absolute top-4 right-4 bg-white text-gray-700 p-2 rounded-full hover:bg-gray-100 z-10"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={previewImage.preview}
              alt={previewImage.name}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white p-3 rounded-lg">
              <p className="font-medium">{previewImage.name}</p>
              <p className="text-sm opacity-75">
                {(previewImage.size / 1024 / 1024).toFixed(1)} MB
              </p>
              <p className="text-sm text-blue-400">Ready to upload</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateRoom;
