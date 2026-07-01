import { useState, useRef } from 'react';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Textarea } from '../../../ui/textarea';
import { UserCheck, Phone, Mail, FileText, Upload, Link } from 'lucide-react';

interface IdentityStepProps {
  onBack: () => void;
  onNext: (data: any) => void;
  initialData?: any;
}

export function IdentityStep({ onBack, onNext, initialData = {} }: IdentityStepProps) {
  const [formData, setFormData] = useState({
    fullName: initialData.fullName || '',
    phone: initialData.phone || '',
    email: initialData.email || '',
    idType: initialData.idType || 'passport',
    idNumber: initialData.idNumber || '',
    idPhotoUrl: initialData.idPhotoUrl || '',
    idPhotoFile: initialData.idPhotoFile || null as File | null,
    idPhotoPreview: initialData.idPhotoPreview || '',
    address: initialData.address || '',
    bio: initialData.bio || '',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        idPhotoFile: file,
        idPhotoPreview: previewUrl
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Require either a file upload or URL
    if (!formData.idPhotoFile && !formData.idPhotoUrl) {
      alert('Please upload your ID photo or provide a valid URL');
      return;
    }

    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* ... existing form fields ... */}

      <div className="border-t pt-4">
        <h3 className="text-lg font-medium mb-4">ID Verification</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ID Type</label>
            <select
              value={formData.idType}
              onChange={(e) => setFormData({ ...formData, idType: e.target.value })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="passport">Passport</option>
              <option value="national_id">National ID</option>
              <option value="drivers_license">Driver's License</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                ID Number
              </div>
            </label>
            <Input
              type="text"
              required
              value={formData.idNumber}
              onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
              placeholder="Enter your ID number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ID Photo
              <span className="text-red-500 ml-1">*</span>
            </label>
            
            <div className="space-y-4">
              {/* File Upload Section */}
              <div className="relative">
                {formData.idPhotoPreview ? (
                  <div className="relative">
                    <img
                      src={formData.idPhotoPreview}
                      alt="ID Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Change Photo
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Upload ID photo</span>
                    <span className="text-xs text-gray-500 mt-1">Click to browse</span>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {/* Optional URL Input */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Link className="h-4 w-4" />
                  <label className="text-sm font-medium text-gray-700">
                    Or provide a URL (Optional)
                  </label>
                </div>
                <Input
                  type="url"
                  value={formData.idPhotoUrl}
                  onChange={(e) => setFormData({ ...formData, idPhotoUrl: e.target.value })}
                  placeholder="https://example.com/id-photo.jpg"
                />
                <p className="mt-1 text-sm text-gray-500">
                  You can either upload a photo or provide a URL to your ID document
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ... rest of the form ... */}

      <div className="flex justify-between pt-6">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">Continue</Button>
      </div>
    </form>
  );
}