import React, { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/app/components/button';

interface SuccessScreenProps {
  onTrack: () => void;
  onDonateMore: () => void;
}

export function SuccessScreen({ onTrack, onDonateMore }: SuccessScreenProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Hide confetti after animation
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10%',
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: ['#E07A5F', '#81B29A', '#F4D35E'][Math.floor(Math.random() * 3)],
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Success Icon */}
      <div className="mb-8 relative">
        <div className="w-24 h-24 mx-auto rounded-full bg-secondary/10 flex items-center justify-center mb-4 animate-scale-in">
          <CheckCircle className="w-16 h-16 text-secondary" />
        </div>
      </div>

      {/* Success Message */}
      <h1 className="text-4xl mb-4">Thank you!</h1>
      <p className="text-xl text-muted-foreground mb-3">Your donation has been listed.</p>
      <p className="text-lg text-muted-foreground mb-12">
        Shelters in your area will be notified and can request pickup
      </p>

      {/* Impact Message */}
      <div className="bg-accent/10 rounded-[14px] p-6 mb-8 border border-accent/20">
        <p className="text-sm text-foreground/80">
          🎉 You're making a difference! This donation could help feed multiple families in your community.
        </p>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="primary" size="lg" onClick={onTrack}>
          Track this donation
        </Button>
        <Button variant="secondary" size="lg" onClick={onDonateMore}>
          Donate more
        </Button>
      </div>

      {/* Additional Info */}
      <div className="mt-12 text-sm text-muted-foreground">
        <p>You'll receive email notifications when shelters respond to your donation</p>
      </div>

      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        @keyframes scale-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-confetti {
          animation: confetti linear forwards;
        }
        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
