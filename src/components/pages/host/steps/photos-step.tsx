import { useState, useRef } from 'react';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Upload, X, Plus, Link, Image } from 'lucide-react';

interface PhotosStepProps {
  onBack: () => void;
  onNext: (data: any) => void;
  initialData?: any;
}

interface PhotoEntry {
  type: 'url' | 'file';
  value: string;
  file?: File;
}

export function PhotosStep({ onBack, onNext, initialData = {} }: PhotosStepProps) {
  const [photos, setPhotos] = useState<PhotoEntry[]>(
    initialData.photos?.map((p: string) => ({ type: 'url', value: p })) || [{ type: 'file', value: '' }]
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addPhotoField = (type: 'url' | 'file' = 'file') => {
    setPhotos([...photos, { type, value: '' }]);
  };

  const removePhotoField = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const updatePhoto = (index: number, value: string, type: 'url' | 'file' = 'file', file?: File) => {
    const newPhotos = [...photos];
    newPhotos[index] = { type, value, file };
    setPhotos(newPhotos);
  };

  const handleFileUpload = (index: number) => {
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      updatePhoto(index, previewUrl, 'file', file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if at least one file upload exists
    const hasFileUpload = photos.some(p => p.type === 'file' && p.value);
    if (!hasFileUpload) {
      alert('Please upload at least one photo');
      return;
    }

    // Filter out empty entries and prepare data for submission
    const validPhotos = photos.filter(p => p.value);
    onNext({ photos: validPhotos });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Add photos of your place</h2>
        <p className="text-gray-600 mb-2">
          Upload at least one photo of your place. You can also add optional photo URLs.
        </p>
        <p className="text-sm text-red-600 mb-6">
          * At least one uploaded photo is required
        </p>
      </div>

      <div className="space-y-4">
        {photos.map((photo, index) => (
          <div key={index} className="flex gap-2">
            {photo.type === 'url' ? (
              <div className="flex-1">
                <Input
                  type="url"
                  value={photo.value}
                  onChange={(e) => updatePhoto(index, e.target.value, 'url')}
                  placeholder="Enter photo URL (optional)"
                />
              </div>
            ) : (
              <div className="flex-1 relative">
                {photo.value ? (
                  <div className="relative">
                    <img
                      src={photo.value}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          fileInputRef.current?.click();
                          updatePhoto(index, '', 'file');
                        }}
                      >
                        Change Photo
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">
                      {index === 0 ? 'Upload required photo' : 'Upload photo'}
                    </span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={() => handleFileUpload(index)}
                  className="hidden"
                  ref={fileInputRef}
                  required={index === 0 && !photo.value}
                />
              </div>
            )}
            <div className="flex gap-2">
              {photo.type === 'url' ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    fileInputRef.current?.click();
                    updatePhoto(index, '', 'file');
                  }}
                  title="Upload image instead"
                >
                  <Upload className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => updatePhoto(index, '', 'url')}
                  title="Enter URL instead"
                >
                  <Link className="h-4 w-4" />
                </Button>
              )}
              {index > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removePhotoField(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}

        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => addPhotoField('file')}
          >
            <Upload className="h-4 w-4 mr-2" />
            Add Photo Upload
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => addPhotoField('url')}
          >
            <Link className="h-4 w-4 mr-2" />
            Add URL (Optional)
          </Button>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">
          Continue
        </Button>
      </div>
    </form>
  );
}