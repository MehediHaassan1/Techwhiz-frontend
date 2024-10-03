"use client";

import { Button } from "@nextui-org/button";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/modal";
import { ReactNode } from "react";

interface IProps {
    title: string;
    children: ReactNode;
    size?:
        | "xs"
        | "sm"
        | "md"
        | "lg"
        | "xl"
        | "2xl"
        | "3xl"
        | "4xl"
        | "5xl"
        | "full";
    scrollBehavior?: "inside" | "outside";
    btnIcon?: ReactNode;
    btnText: string;
}

const TWModal = ({
    title,
    children,
    size = "md",
    scrollBehavior,
    btnIcon,
    btnText,
}: IProps) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <>
            <Button onPress={onOpen} startContent={btnIcon} className="rounded">
                {btnText}
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                scrollBehavior={scrollBehavior}
                size={size}
            >
                <ModalContent className="pb-2">
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {title}
                            </ModalHeader>
                            <ModalBody>{children}</ModalBody>
                            {/* <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter> */}
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default TWModal;
