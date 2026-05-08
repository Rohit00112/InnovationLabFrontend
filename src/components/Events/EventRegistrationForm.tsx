"use client";

import Button from "@/components/primitives/Button";
import { EventRegistrationType } from "@/lib/services/generated/frontend/schemas/eventRegistrationType";
import { Gender } from "@/lib/services/generated/frontend/schemas/gender";
import type { TeamMemberCreateDto } from "@/lib/services/generated/frontend/schemas/teamMemberCreateDto";
import { useState } from "react";

interface EventRegistrationFormProps {
  eventId: string;
  eventTitle: string;
  onSuccess?: () => void;
}

const initialTeamMember: TeamMemberCreateDto = {
  name: "",
  email: "",
  phone: "",
  faculty: "",
  gender: Gender.Male,
};

export default function EventRegistrationForm({
  eventId,
  eventTitle,
  onSuccess,
}: EventRegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    TeamName: "",
    Type: EventRegistrationType.Team,
    CollegeName: "",
    CollegeAddress: "",
  });
  const [teamMembers, setTeamMembers] = useState<TeamMemberCreateDto[]>([]);
  const [documents, setDocuments] = useState<File[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocuments(Array.from(e.target.files));
    }
  };

  const handleTeamMemberChange = (
    index: number,
    field: keyof TeamMemberCreateDto,
    value: string | File,
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

      const body = new FormData();
      body.append("EventId", eventId);
      body.append("Name", formData.Name);
      body.append("Email", formData.Email);
      body.append("Phone", formData.Phone || "");
      body.append("TeamName", formData.TeamName || formData.Name); // Fallback to Name if empty
      body.append("Type", formData.Type);

      if (formData.CollegeName) {
        body.append("RegistrationColleges[0].name", formData.CollegeName);
        body.append(
          "RegistrationColleges[0].address",
          formData.CollegeAddress || "",
        );
      }

      if (teamMembers.length > 0) {
        // Handle members - backend expects array or multiple appends
        teamMembers.forEach((member, index) => {
          if (member.name || member.email || member.phone) {
            body.append(`Members[${index}].name`, member.name || "");
            body.append(`Members[${index}].email`, member.email || "");
            body.append(`Members[${index}].phone`, member.phone || "");
            body.append(`Members[${index}].faculty`, member.faculty || "");
            body.append(
              `Members[${index}].gender`,
              member.gender || Gender.Male,
            );
            if (member.photo) {
              body.append(`Members[${index}].photo`, member.photo);
            }
          }
        });
      }

      if (documents.length > 0) {
        documents.forEach((file) => {
          body.append("Documents", file);
        });
      }

      const apiRoot = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL || "";
      const response = await fetch(
        `${apiRoot}/api/v1/Events/${eventId}/register`,
        {
          method: "POST",
          body,
        },
      ).then((res) => res.json());

      if (!response.success) {
        throw new Error(response.error?.message || `Registration failed`);
      }

      setSuccess(true);
      resetForm();
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
    setFormData({
      Name: "",
      Email: "",
      Phone: "",
      TeamName: "",
      Type: EventRegistrationType.Team,
      CollegeName: "",
      CollegeAddress: "",
    });
    setTeamMembers([]);
    setDocuments([]);
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
        {/* Registration Type: defaulted to Team (hidden) */}
        <input type="hidden" name="Type" value={formData.Type} />

        {/* Primary Registrant Section */}
        <fieldset className="space-y-4 border-b border-neutral-200 pb-8">
          <legend className="text-lg font-semibold text-neutral-900">
            Your Information
          </legend>

          {formData.Type === EventRegistrationType.Team && (
            <div className="mb-4">
              <label
                htmlFor="TeamName"
                className="block text-sm font-medium text-neutral-700"
              >
                Team Name
              </label>
              <input
                id="TeamName"
                type="text"
                placeholder="Team Alpha"
                value={formData.TeamName}
                onChange={(e) => handleInputChange(e, "TeamName")}
                className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 placeholder-neutral-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
                required={formData.Type === EventRegistrationType.Team}
              />
            </div>
          )}

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
                value={formData.Name}
                onChange={(e) => handleInputChange(e, "Name")}
                className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 placeholder-neutral-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
                required
              />
            </div>

            <div>
              <label
                htmlFor="Email"
                className="block text-sm font-medium text-neutral-700"
              >
                Email Address
              </label>
              <input
                id="Email"
                type="email"
                placeholder="john@example.com"
                value={formData.Email}
                onChange={(e) => handleInputChange(e, "Email")}
                className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 placeholder-neutral-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="Phone"
              className="block text-sm font-medium text-neutral-700"
            >
              Phone Number
            </label>
            <input
              id="Phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.Phone}
              onChange={(e) => handleInputChange(e, "Phone")}
              className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 placeholder-neutral-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>
        </fieldset>

        {/* College Section */}
        <fieldset className="space-y-4 border-b border-neutral-200 pb-8">
          <legend className="text-lg font-semibold text-neutral-900">
            College / Institution
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="CollegeName"
                className="block text-sm font-medium text-neutral-700"
              >
                College Name
              </label>
              <input
                id="CollegeName"
                type="text"
                placeholder="University of..."
                value={formData.CollegeName}
                onChange={(e) => handleInputChange(e, "CollegeName")}
                className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 placeholder-neutral-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
              />
            </div>
            <div>
              <label
                htmlFor="CollegeAddress"
                className="block text-sm font-medium text-neutral-700"
              >
                College Address
              </label>
              <input
                id="CollegeAddress"
                type="text"
                placeholder="City, Country"
                value={formData.CollegeAddress}
                onChange={(e) => handleInputChange(e, "CollegeAddress")}
                className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 placeholder-neutral-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
              />
            </div>
          </div>
        </fieldset>

        {/* Documents Section */}
        <fieldset className="space-y-4 border-b border-neutral-200 pb-8">
          <legend className="text-lg font-semibold text-neutral-900">
            Supporting Documents
          </legend>
          <p className="text-sm text-neutral-500">
            Upload any required documents (ID, abstract, etc.)
          </p>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-neutral-800"
          />
          {documents.length > 0 && (
            <ul className="mt-2 space-y-1">
              {documents.map((file, i) => (
                <li key={i} className="text-xs text-neutral-600">
                  {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </li>
              ))}
            </ul>
          )}
        </fieldset>

        {/* Team Members Section */}
        <fieldset className="space-y-4">
          <div className="flex items-center justify-between">
            <legend className="text-lg font-semibold text-neutral-900">
              Team Members {teamMembers.length > 0 && `(${teamMembers.length})`}
            </legend>
            {formData.Type === EventRegistrationType.Team && (
              <button
                type="button"
                onClick={addTeamMember}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                + Add Team Member
              </button>
            )}
          </div>

          {formData.Type === EventRegistrationType.Team ? (
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
                        className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 placeholder-neutral-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
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
                        className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 placeholder-neutral-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
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
                        className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 placeholder-neutral-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor={`team-member-faculty-${index}`}
                        className="block text-sm font-medium text-neutral-700"
                      >
                        Faculty / Department
                      </label>
                      <input
                        id={`team-member-faculty-${index}`}
                        type="text"
                        placeholder="Engineering"
                        value={member.faculty || ""}
                        onChange={(e) =>
                          handleTeamMemberChange(
                            index,
                            "faculty",
                            e.target.value,
                          )
                        }
                        className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 placeholder-neutral-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 mt-4">
                    <div>
                      <label
                        htmlFor={`team-member-gender-${index}`}
                        className="block text-sm font-medium text-neutral-700"
                      >
                        Gender
                      </label>
                      <select
                        id={`team-member-gender-${index}`}
                        value={member.gender || Gender.Male}
                        onChange={(e) =>
                          handleTeamMemberChange(
                            index,
                            "gender",
                            e.target.value,
                          )
                        }
                        className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
                      >
                        <option value={Gender.Male}>Male</option>
                        <option value={Gender.Female}>Female</option>
                        <option value={Gender.Others}>Others</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor={`team-member-photo-${index}`}
                        className="block text-sm font-medium text-neutral-700"
                      >
                        Photo
                      </label>
                      <input
                        id={`team-member-photo-${index}`}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleTeamMemberChange(index, "photo", file);
                          }
                        }}
                        className="mt-1 w-full text-xs text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-neutral-100 file:text-neutral-700 hover:file:bg-neutral-200"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-neutral-400 italic">
              Team members can only be added for Team registrations.
            </p>
          )}
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
