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
    btnText: string;
    title: string;
    children: ReactNode;
    btnVariant?:
        | "ghost"
        | "flat"
        | "solid"
        | "bordered"
        | "light"
        | "faded"
        | "shadow"
        | undefined;
}

const TWModal = ({ btnText, btnVariant = "flat", title, children }: IProps) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <>
            <Button className="rounded" variant={btnVariant} onPress={onOpen}>
                {btnText}
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                scrollBehavior="inside"
            >
                <ModalContent className="pb-2">
                    {(onClose) => (
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
