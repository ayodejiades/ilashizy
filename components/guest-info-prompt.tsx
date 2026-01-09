"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { updateAnonymousGuestInfo } from "@/lib/anonymous-guest";
import { toast } from "sonner";
import { X } from "lucide-react";

interface GuestInfoPromptProps {
  onComplete: () => void;
  onSkip?: () => void;
  requireContact?: boolean;
  title?: string;
  description?: string;
}

/**
 * Component to collect optional guest information
 * Displayed when anonymous guest attempts to book or post content
 */
export function GuestInfoPrompt({
  onComplete,
  onSkip,
  requireContact = false,
  title = "Just a few details",
  description = "Help us serve you better by sharing some basic information. You can skip this if you prefer to remain completely anonymous.",
}: GuestInfoPromptProps) {
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data: {
        display_name?: string;
        phone?: string;
        email?: string;
      } = {};

      if (displayName.trim()) data.display_name = displayName.trim();
      if (phone.trim()) data.phone = phone.trim();
      if (email.trim()) data.email = email.trim();

      // Validate if contact is required
      if (requireContact && !phone.trim() && !email.trim()) {
        toast.error("Please provide either a phone number or email address");
        setIsLoading(false);
        return;
      }

      const success = await updateAnonymousGuestInfo(data);

      if (success) {
        toast.success("Information saved!");
        onComplete();
      } else {
        toast.error("Failed to save information");
      }
    } catch (error) {
      console.error("Error saving guest info:", error);
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    if (requireContact) {
      toast.error("Contact information is required for bookings");
      return;
    }
    if (onSkip) {
      onSkip();
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md relative animate-in fade-in zoom-in duration-200">
        {!requireContact && onSkip && (
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Skip"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <CardHeader>
          <CardTitle className="text-2xl font-bold text-slate-900">
            {title}
          </CardTitle>
          <CardDescription className="text-slate-600">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="display-name"
                className="text-slate-700 font-medium"
              >
                Display Name{" "}
                <span className="text-slate-400 text-sm">(Optional)</span>
              </Label>
              <Input
                id="display-name"
                type="text"
                placeholder="How should we call you?"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="rounded-xl border-slate-200 focus:border-blue-400 focus:ring-blue-400/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-slate-700 font-medium">
                Phone Number{" "}
                {requireContact && <span className="text-red-500">*</span>}
                {!requireContact && (
                  <span className="text-slate-400 text-sm">(Optional)</span>
                )}
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+234 XXX XXX XXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-xl border-slate-200 focus:border-blue-400 focus:ring-blue-400/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-medium">
                Email{" "}
                {requireContact && <span className="text-red-500">*</span>}
                {!requireContact && (
                  <span className="text-slate-400 text-sm">(Optional)</span>
                )}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl border-slate-200 focus:border-blue-400 focus:ring-blue-400/20"
              />
            </div>

            {requireContact && (
              <p className="text-sm text-slate-500">
                * We need at least one way to contact you about your booking
              </p>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                {isLoading ? "Saving..." : "Save Information"}
              </Button>

              {!requireContact && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSkip}
                  className="px-8 py-6 rounded-full border-slate-200 hover:bg-slate-50"
                >
                  Skip
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
