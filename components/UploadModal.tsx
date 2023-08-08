" use client ";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Modal from "@/components/Modal";
import useUploadModal from "@/hooks/useUploadModal";

const UploadModal = () => {
 const uploadModal = useUploadModal();
 
 const {
  register,
  handleSubmit,
  reset
 } = useForm<FieldValues>({
  defaultValues:{
   author:'',
   title:'',
   song:null,
   image:null,
  }
 })

 const onChange = (open:boolean) => {
  if (!open){
   reset();
   uploadModal.onClose();
  }
 }

 const onSubmit: SubmitHandler<FieldValues> = async (values) => {

 }

return (
 <Modal
  title="Adicione uma Musica"
  description="Envie uma musica em mp3"
  isOpen={uploadModal.isOpen}
  onChange={onChange}
 >
  <form
   onSubmit={handleSubmit(onSubmit)}
  >
   
  </form>
 </Modal>
)
}

export default UploadModal;