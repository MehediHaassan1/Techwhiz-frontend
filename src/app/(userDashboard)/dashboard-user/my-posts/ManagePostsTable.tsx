/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { Input } from "@nextui-org/input";
import {
  Button,
  Pagination,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import { ChangeEvent, useCallback, useState } from "react";
import { debounce } from "lodash";

import { useGetMyPosts } from "@/src/hooks/post.hook";
import { IPost } from "@/src/types";
import { postCategoryOptions, postColumns } from "@/src/constant";

import ManagePostCell from "./ManagePostCell";

const ManagePostsTable = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);

  const queryParams = {
    search: search,
    category: category,
    sortOrder: sortOrder,
    page: page,
    limit: 2,
  };

  const { data, isLoading } = useGetMyPosts(queryParams);

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearch(value);
    }, 500),
    [],
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const handleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "desc" ? "asc" : "desc"));
  };

  const totalPages = data?.meta?.totalPages || 1;
  const currentPage = data?.meta?.currentPage || 1;

  return (
    <div>
      <div className="mt-5 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <Input
          aria-labelledby="search"
          className="rounded max-w-sm w-full"
          placeholder="Search here"
          type="text"
          onChange={handleSearch}
        />
        <Select
          aria-labelledby="filter"
          className="max-w-xs"
          label="Select a category"
          size="sm"
          onChange={handleCategory}
        >
          {postCategoryOptions.map((category) => (
            <SelectItem key={category.key} value={category.key}>
              {category.label}
            </SelectItem>
          ))}
        </Select>

        {/* Sort Button */}
        <Button className="rounded" onPress={toggleSortOrder}>
          Sort: {sortOrder === "desc" ? "Descending" : "Ascending"}
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center mt-5">
          <Spinner />
        </div>
      ) : (
        <>
          {data?.posts?.length > 0 ? (
            <Table
              bottomContent={
                totalPages > 1 ? (
                  <div className="flex w-full justify-center">
                    <Pagination
                      isCompact
                      showControls
                      showShadow
                      color="primary"
                      page={currentPage}
                      total={totalPages}
                      onChange={(page) => setPage(page)}
                    />
                  </div>
                ) : null
              }
              className="mt-5"
            >
              <TableHeader columns={postColumns}>
                {(column) => (
                  <TableColumn
                    key={column?.uid}
                    align={column?.uid === "actions" ? "center" : "start"}
                  >
                    {column?.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody className="rounded z-0" items={data?.posts}>
                {(post: IPost) => (
                  <TableRow key={post?._id} className="z-0">
                    {(columnKey) => (
                      <TableCell>
                        <ManagePostCell
                          columnKey={columnKey as string}
                          post={post}
                        />
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          ) : (
            <h1 className="text-center text-3xl mt-5">No posts available</h1>
          )}
        </>
      )}
    </div>
  );
};

export default ManagePostsTable;
