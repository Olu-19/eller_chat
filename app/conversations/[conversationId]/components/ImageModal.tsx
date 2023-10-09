"use client";

import Modal from "@/app/components/Modal";
import Image from "next/image";

interface ImageModalProps {
    isOpen?: boolean;
    onClose: () => void;
    src?: string | null;
}

const ImageModal = ({ isOpen, onClose, src }: ImageModalProps) => {
    if (!src) {
        return null;
    }


    return (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
        >
            <div className="w-[80vw] h-[80vh]">
                <Image
                  alt="Image"
                  fill
                  src={src}
                  className="object-cover"
                />
            </div>
        </Modal>
    );
}
 
export default ImageModal;