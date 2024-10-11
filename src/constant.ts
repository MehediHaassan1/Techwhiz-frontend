export const protectedRoutes = [
  "/profile",
  "/dashboard-admin",
  "/dashboard-user",
  "/login",
  "/register",
  "/settings",
];

export const postCategoryOptions = [
  { key: "Web", label: "Web" },
  { key: "Software Engineering", label: "Software Engineering" },
  { key: "AI", label: "AI" },
  { key: "ML", label: "ML" },
  { key: "VR", label: "VR" },
  { key: "Others", label: "Others" },
];

export const postColumns = [
  { name: "Title", uid: "title" },
  { name: "Category", uid: "category" },
  { name: "Likes", uid: "upVotes" },
  { name: "Dislikes", uid: "downVotes" },
  { name: "Comments", uid: "comments" },
  { name: "ACTIONS", uid: "actions" },
];
