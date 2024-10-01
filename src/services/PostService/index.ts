import envConfig from "@/src/config/envConfig"

export const getPosts = async () => {
  const res = await fetch(`${envConfig.baseApi}/posts`)

  return res.json();
}


export const getPost = async (id: string) => {
  let fetchOptions = {};

  fetchOptions = {
    cache: "no-store",
  };

  const res = await fetch(`${envConfig.baseApi}/posts/${id}`, fetchOptions);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}