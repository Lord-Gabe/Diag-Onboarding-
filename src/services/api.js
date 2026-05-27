const API = "http://localhost:5000/api/users";

export const fetchUser = async (uid) => {
  const res = await fetch(`${API}/${uid}`);
  return await res.json();
};

export const completeOnboarding = async (data) => {
  const res = await fetch(`${API}/complete-onboarding`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
};