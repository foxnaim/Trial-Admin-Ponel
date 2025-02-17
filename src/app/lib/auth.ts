export const login = (role: "user" | "admin") => {
 localStorage.setItem("role", role);
};

export const logout = () => {
 localStorage.removeItem("role");
};

export const getRole = (): "user" | "admin" | null => {
 return localStorage.getItem("role") as "user" | "admin" | null;
};
