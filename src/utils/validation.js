export function validateStep(step, form) {
  if (step === 0) {
    if (!form.name.trim()) {
      return "Full name is required";
    }

    if (!form.email.trim()) {
      return "Email is required";
    }

    if (!form.password.trim()) {
      return "Password is required";
    }

    if (form.password.length < 8) {
      return "Password must be at least 8 characters";
    }
  }

  if (step === 1 && !form.role) {
    return "Please select a role";
  }

  if (step === 2) {
    if (!form.workspace.trim()) {
      return "Workspace name is required";
    }
    if (!form.wsSize) {
      return "Please select company size";
    }
  }

  return null;
}
// Now invalid but stored for future reference.