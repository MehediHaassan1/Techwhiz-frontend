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
    title?: string;
    children: ReactNode | ((closeModal: () => void) => ReactNode);
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
    btnText?: string | ReactNode;
    isIconBtn?: boolean;
    btnSize?: "sm" | "md" | "lg" | undefined;
    btnStyle?: string;
    btnVariant?:
        | "solid"
        | "bordered"
        | "light"
        | "flat"
        | "faded"
        | "shadow"
        | "ghost"
        | undefined;
}

const TWModal = ({
    title,
    children,
    size = "md",
    scrollBehavior,
    btnIcon,
    btnText,
    btnSize = undefined,
    btnStyle,
    btnVariant,
}: IProps) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const closeModal = () => {
        onClose();
    };
    return (
        <>
            <Button
                size={btnSize}
                onPress={onOpen}
                startContent={btnIcon}
                className={`rounded ${btnStyle}`}
                variant={btnVariant}
            >
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
                            <ModalBody>
                                {typeof children === "function"
                                    ? children(closeModal)
                                    : children}
                            </ModalBody>
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
