import React, { useState } from 'react';
import { Camera, X } from 'lucide-react';
import { Button } from '@/app/components/button';

interface Step2Props {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step2Photos({ formData, setFormData, onNext, onBack }: Step2Props) {
  const [previews, setPreviews] = useState<string[]>(formData.photos || []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPreviews: string[] = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        if (newPreviews.length === files.length) {
          const updatedPreviews = [...previews, ...newPreviews];
          setPreviews(updatedPreviews);
          setFormData({ ...formData, photos: updatedPreviews });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setPreviews(updatedPreviews);
    setFormData({ ...formData, photos: updatedPreviews });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl mb-2">Add photos of your donation</h2>
        <p className="text-muted-foreground">At least 2 photos help shelters know what to expect</p>
      </div>

      <div className="space-y-6">
        {/* Dropzone */}
        <label className="block">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="border-2 border-dashed border-border rounded-[14px] p-12 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Camera className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-lg mb-2">Click to upload photos</p>
            <p className="text-sm text-muted-foreground">or drag and drop images here</p>
          </div>
        </label>

        {/* Photo Previews */}
        {previews.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-3">{previews.length} photo(s) added</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {previews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-[14px] border border-border"
                  />
                  <button
                    onClick={() => removePhoto(index)}
                    className="absolute top-2 right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <button
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back
          </button>
          <Button
            variant="primary"
            size="lg"
            onClick={onNext}
            disabled={previews.length < 2}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
