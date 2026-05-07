"use client";

import { useState } from "react";
import type { EventRegistrationCreateDto } from "@/lib/services/generated/frontend/schemas";
import type { TeamMemberCreateDto } from "@/lib/services/generated/frontend/schemas";
import Button from "@/components/primitives/Button";
import { bffApi } from "@/lib/services/bff-client";

interface EventRegistrationFormProps {
  eventId: string;
  eventTitle: string;
  onSuccess?: () => void;
}

const initialTeamMember: TeamMemberCreateDto = {
  name: "",
  email: "",
  phone: "",
};

export default function EventRegistrationForm({
  eventId,
  eventTitle,
  onSuccess,
}: EventRegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<EventRegistrationCreateDto>({
    name: "",
    email: "",
    phone: "",
    teamMembers: [],
  });

  const [teamMembers, setTeamMembers] = useState<TeamMemberCreateDto[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof EventRegistrationCreateDto,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleTeamMemberChange = (
    index: number,
    field: keyof TeamMemberCreateDto,
    value: string,
  ) => {
    setTeamMembers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addTeamMember = () => {
    setTeamMembers((prev) => [...prev, { ...initialTeamMember }]);
  };

  const removeTeamMember = (index: number) => {
    setTeamMembers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      setError(null);

      const payload: EventRegistrationCreateDto = {
        ...formData,
        teamMembers:
          teamMembers.length > 0
            ? teamMembers.filter((tm) => tm.name || tm.email || tm.phone)
            : undefined,
      };
      const response = await bffApi.events.register(eventId, payload);

      if (!response.success) {
        throw new Error(response.error?.message || `Registration failed`);
      }

      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", teamMembers: [] });
      setTeamMembers([]);
      onSuccess?.();

      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", phone: "", teamMembers: [] });
    setTeamMembers([]);
    setError(null);
    setSuccess(false);
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-neutral-900">
          Register for {eventTitle}
        </h2>
        <p className="mt-2 text-neutral-600">
          Fill in your details below to secure your spot.
        </p>
      </div>

      {success && (
        <div className="mb-6   -lg bg-green-50 p-4 text-green-800">
          <p className="font-medium">
            Registration successful! Check your email for confirmation.
          </p>
        </div>
      )}

      {error && (
        <div className="mb-6   -lg bg-red-50 p-4 text-red-800">
          <p className="font-medium">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Primary Registrant Section */}
        <fieldset className="space-y-4 border-b border-neutral-200 pb-8">
          <legend className="text-lg font-semibold text-neutral-900">
            Your Information
          </legend>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-neutral-700"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name || ""}
                onChange={(e) => handleInputChange(e, "name")}
                className="mt-1 w-full   -lg border border-neutral-300 px-4 py-2 text-neutral-900 placeholder-neutral-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral-700"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email || ""}
                onChange={(e) => handleInputChange(e, "email")}
                className="mt-1 w-full   -lg border border-neutral-300 px-4 py-2 text-neutral-900 placeholder-neutral-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-neutral-700"
            >
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.phone || ""}
              onChange={(e) => handleInputChange(e, "phone")}
              className="mt-1 w-full   -lg border border-neutral-300 px-4 py-2 text-neutral-900 placeholder-neutral-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>
        </fieldset>

        {/* Team Members Section */}
        <fieldset className="space-y-4">
          <div className="flex items-center justify-between">
            <legend className="text-lg font-semibold text-neutral-900">
              Team Members {teamMembers.length > 0 && `(${teamMembers.length})`}
            </legend>
            <button
              type="button"
              onClick={addTeamMember}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              + Add Team Member
            </button>
          </div>

          <p className="text-sm text-neutral-500">
            Optionally add team members who will attend with you.
          </p>

          <div className="space-y-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="space-y-4   -lg border border-neutral-200 bg-neutral-50 p-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-neutral-900">
                    Team Member {index + 1}
                  </h3>
                  <button
                    type="button"
                    onClick={() => removeTeamMember(index)}
                    className="text-sm font-medium text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor={`team-member-name-${index}`}
                      className="block text-sm font-medium text-neutral-700"
                    >
                      Full Name
                    </label>
                    <input
                      id={`team-member-name-${index}`}
                      type="text"
                      placeholder="Jane Doe"
                      value={member.name || ""}
                      onChange={(e) =>
                        handleTeamMemberChange(index, "name", e.target.value)
                      }
                      className="mt-1 w-full   -lg border border-neutral-300 px-4 py-2 text-neutral-900 placeholder-neutral-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`team-member-email-${index}`}
                      className="block text-sm font-medium text-neutral-700"
                    >
                      Email Address
                    </label>
                    <input
                      id={`team-member-email-${index}`}
                      type="email"
                      placeholder="jane@example.com"
                      value={member.email || ""}
                      onChange={(e) =>
                        handleTeamMemberChange(index, "email", e.target.value)
                      }
                      className="mt-1 w-full   -lg border border-neutral-300 px-4 py-2 text-neutral-900 placeholder-neutral-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor={`team-member-phone-${index}`}
                    className="block text-sm font-medium text-neutral-700"
                  >
                    Phone Number
                  </label>
                  <input
                    id={`team-member-phone-${index}`}
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={member.phone || ""}
                    onChange={(e) =>
                      handleTeamMemberChange(index, "phone", e.target.value)
                    }
                    className="mt-1 w-full   -lg border border-neutral-300 px-4 py-2 text-neutral-900 placeholder-neutral-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
                  />
                </div>
              </div>
            ))}
          </div>
        </fieldset>

        {/* Form Actions */}
        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="primary"
            className="flex-1"
          >
            {isSubmitting ? "Registering..." : "Complete Registration"}
          </Button>
          <Button
            type="button"
            onClick={resetForm}
            variant="outline"
            disabled={isSubmitting}
          >
            Clear Form
          </Button>
        </div>
      </form>
    </div>
  );
}
