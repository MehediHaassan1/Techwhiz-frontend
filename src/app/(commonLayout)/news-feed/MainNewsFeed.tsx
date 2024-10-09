"use client";

import { Input, Select, SelectItem, Spinner } from "@nextui-org/react";
import { ChangeEvent, useCallback, useState } from "react";
import { debounce } from "lodash";

import NewsCard from "@/src/components/NewsCard";
import SiderNewsCard from "@/src/components/SiderNewsCard";
import { useGetPosts } from "@/src/hooks/post.hook";
import { IPost } from "@/src/types";
import { SearchIcon } from "@/src/components/icons";

const MainNewsFeed = () => {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const { data, isLoading } = useGetPosts(category, search);

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearch(value);
    }, 300),
    [],
  );

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const posts = data?.data as IPost[];

  const mostLikedBlog = posts?.sort(
    (a, b) => b?.upVotes?.length - a?.upVotes?.length,
  );

  return (
    <div>
      <div className="grid md:grid-cols-3">
        <div className="md:col-span-2 p-4 flex flex-col md:flex-row md:gap-2 sticky top-16">
          <Select
            aria-label="select category"
            className="max-w-xs"
            items={postCategories}
            placeholder="Select a category"
            size="md"
            onChange={handleCategoryChange}
          >
            {(post) => <SelectItem key={post?.key}>{post?.label}</SelectItem>}
          </Select>
          <div className="w-full">
            <Input
              aria-label="search"
              className="w-full sm:max-w-xs md:max-w-full md:flex-1"
              placeholder="Search here..."
              size="md"
              startContent={
                <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
              }
              type="text"
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="md:col-span-2 space-y-5 p-4">
          <div className="text-center">{isLoading && <Spinner />}</div>
          {posts?.map((post: IPost) => <NewsCard key={post._id} post={post} />)}
        </div>
        <div className="md:col-span-1 p-4 space-y-5 ">
          <div className="h-fit sticky top-16 ">
            <h1>Popular Posts</h1>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-5">
              {mostLikedBlog
                ?.slice(0, 6)
                ?.map((post: IPost) => (
                  <SiderNewsCard key={post?._id} post={post} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNewsFeed;

export const postCategories = [
  { key: "Web", label: "Web" },
  { key: "Software Engineering", label: "Software Engineering" },
  { key: "AI", label: "AI" },
  { key: "ML", label: "ML" },
  { key: "VR", label: "VR" },
  { key: "Others", label: "Others" },
];
