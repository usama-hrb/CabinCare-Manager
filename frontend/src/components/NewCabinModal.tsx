import { useState } from "react";
import { Button } from "./ui/button";

type NewCabinModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    location: string;
    description: string;
  }) => void;
};

const initialForm = {
  name: "",
  location: "",
  description: "",
};

export default function NewCabinModal({
  open,
  onClose,
  onSubmit,
}: NewCabinModalProps) {
  const [formData, setFormData] = useState(initialForm);

  const [errors, setErrors] = useState({
    name: false,
    location: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      name: formData.name.trim() === "",
      location: formData.location.trim() === "",
    };
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) return;
    onSubmit(formData);
    setFormData(initialForm);
    setErrors({ name: false, location: false });
  };

  const handleClose = () => {
    setFormData(initialForm);
    setErrors({name: false, location: false});
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div
        className="bg-card rounded-2xl p-8 w-full max-w-md shadow-xl border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Create New Cabin
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Cabin Name
            </label>
            <input
              type="text"
              placeholder="e.g., Cabin 1"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-border focus:ring-primary"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Location
            </label>
            <input
              type="text"
              placeholder="e.g., Campus 1"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground ${
                errors.location
                  ? "border-red-500 focus:ring-red-500"
                  : "border-border focus:ring-primary"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <textarea
              placeholder="Describe your cabin..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none h-24"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button className="flex-1" onClick={handleClose} variant='outline'>Cancel</Button>
            <Button className="flex-1" onClick={handleClose} type="submit">Create Cabin</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
