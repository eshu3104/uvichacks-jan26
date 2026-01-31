import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ProgressIndicator } from '@/app/components/progress-indicator';
import { Step1FoodDetails } from '@/app/components/donation-form-steps/step1-food-details';
import { Step2Photos } from '@/app/components/donation-form-steps/step2-photos';
import { Step3PickupInfo } from '@/app/components/donation-form-steps/step3-pickup-info';
import { Step4Confirm } from '@/app/components/donation-form-steps/step4-confirm';
import { SuccessScreen } from '@/app/components/donation-form-steps/success-screen';

interface DonationFormProps {
  onClose: () => void;
}

export function DonationForm({ onClose }: DonationFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    quantity: '',
    unit: 'lbs',
    expiryDate: '',
    description: '',
    photos: [],
    address: '',
    pickupDate: '',
    timeWindow: '',
    phone: '',
    instructions: '',
  });

  const steps = ['Food Details', 'Photos', 'Pickup Info', 'Confirm'];

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    console.log('Donation submitted:', formData);
    setSubmitted(true);
  };

  const handleTrack = () => {
    console.log('Track donation');
    onClose();
  };

  const handleDonateMore = () => {
    setSubmitted(false);
    setCurrentStep(0);
    setFormData({
      category: '',
      quantity: '',
      unit: 'lbs',
      expiryDate: '',
      description: '',
      photos: [],
      address: '',
      pickupDate: '',
      timeWindow: '',
      phone: '',
      instructions: '',
    });
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto bg-card rounded-[16px] shadow-2xl border border-border">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-2xl">
              {submitted ? 'Donation Submitted' : 'Create a Donation'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            {submitted ? (
              <SuccessScreen onTrack={handleTrack} onDonateMore={handleDonateMore} />
            ) : (
              <>
                <ProgressIndicator currentStep={currentStep} steps={steps} />

                <div className="mt-16">
                  {currentStep === 0 && (
                    <Step1FoodDetails
                      formData={formData}
                      setFormData={setFormData}
                      onNext={handleNext}
                    />
                  )}
                  {currentStep === 1 && (
                    <Step2Photos
                      formData={formData}
                      setFormData={setFormData}
                      onNext={handleNext}
                      onBack={handleBack}
                    />
                  )}
                  {currentStep === 2 && (
                    <Step3PickupInfo
                      formData={formData}
                      setFormData={setFormData}
                      onNext={handleNext}
                      onBack={handleBack}
                    />
                  )}
                  {currentStep === 3 && (
                    <Step4Confirm
                      formData={formData}
                      onBack={handleBack}
                      onSubmit={handleSubmit}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
