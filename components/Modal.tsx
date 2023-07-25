import * as Dialog from "@radix-ui/react-dialog"

interface ModalProps {
 isOpen:boolean;
 onChange: (open: boolean) => void;
 title: string;
 description: string;
 children: React.ReactNode
}

const Modal:React.FC<ModalProps> = ({
 isOpen,
 onChange,
 title,
 description,
 children
}) => {

return (
<Dialog.Root>
 
</Dialog.Root>
);
}

export default Modal;