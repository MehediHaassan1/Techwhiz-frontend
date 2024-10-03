"use client";

import TWForm from "@/src/components/form/TWForm";
import TWInput from "@/src/components/form/TWInput";
import TWModal from "@/src/components/modal/TWModal";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";
import { CirclePlus } from "lucide-react";
import { FieldValues, SubmitHandler } from "react-hook-form";

const MyPosts = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
    };

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1>My Posts</h1>
                <Button
                    startContent={<CirclePlus />}
                    className="rounded"
                    onPress={onOpen}
                >
                    Create
                </Button>
                <TWModal
                    size="full"
                    isOpen={isOpen}
                    title="Create Post"
                    onOpenChange={onOpenChange}
                >
                    <TWForm onSubmit={onSubmit}>
                        <TWInput name="title" label="Content Title" />
                        <div className="flex justify-end">
                            <Button
                                startContent={<CirclePlus />}
                                type="submit"
                                className="mt-3 rounded"
                            >
                                Create
                            </Button>
                        </div>
                    </TWForm>
                </TWModal>
            </div>
        </div>
    );
};

export default MyPosts;
