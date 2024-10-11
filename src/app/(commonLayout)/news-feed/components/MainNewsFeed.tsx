"use client";

import { Input, Select, SelectItem, Spinner } from "@nextui-org/react";
import { ChangeEvent, useCallback, useState } from "react";
import { debounce } from "lodash";

import NewsCard from "@/src/components/NewsCard";
import SiderNewsCard from "@/src/components/SiderNewsCard";
import { useGetPosts } from "@/src/hooks/post.hook";
import { IPost } from "@/src/types";
import { SearchIcon } from "@/src/components/icons";
import { postCategoryOptions } from "@/src/constant";

const MainNewsFeed = () => {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const normalPostsParams = {
    category: category,
    search: search,
    isPopular: false,
    isRandom: false,
    page: 1,
    limit: 10,
  };
  const popularPostsParams = {
    category: "",
    search: "",
    isPopular: true,
    isRandom: false,
    page: 1,
    limit: 10,
  };
  const { data, isLoading: postLoading } = useGetPosts(normalPostsParams);
  const { data: popularPosts, isLoading: popularPostsLoading } =
    useGetPosts(popularPostsParams);

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearch(value);
    }, 500),
    [],
  );

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  return (
    <div>
      <div className="grid md:grid-cols-3">
        <div className="z-20 md:col-span-2 p-4 flex flex-col md:flex-row md:gap-2 sticky top-16">
          <Select
            aria-label="select category"
            className="max-w-xs"
            items={postCategoryOptions}
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
          <div className="text-center">{postLoading && <Spinner />}</div>
          {data?.posts?.length > 0 ? (
            data?.posts?.map((post: IPost) => (
              <NewsCard key={post?._id} post={post} />
            ))
          ) : (
            <div>
              {!postLoading && (
                <h1 className="text-3xl text-center">No Posts Available!</h1>
              )}
            </div>
          )}
        </div>
        <div className="md:col-span-1 p-4 space-y-5 ">
          <div className="h-fit sticky top-16 ">
            <h1 className="text-3xl mb-4">Popular Posts</h1>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-5">
              <div className="text-center">
                {popularPostsLoading && <Spinner />}
              </div>
              {popularPosts?.posts?.length > 3 &&
                popularPosts?.posts
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
