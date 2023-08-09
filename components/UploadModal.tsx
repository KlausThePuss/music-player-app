" use client ";

import uniqid from "uniqid"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Button from "@/components/Button";

import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";

const UploadModal = () => {
 const uploadModal = useUploadModal();
 const [isLoading, setIsLoading] = useState(false);
 const { user } = useUser();
 const supabaseClient = useSupabaseClient();
 const router = useRouter();

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
  try {
   setIsLoading(true);

   const songFile = values.song?.[0];
   const imageFile = values.image?.[0];   

   if (!imageFile || !songFile || !user){
    toast.error("Arquivo nao encontrado");
    return;
   }

   const uniqueID = uniqid();

   // ENVIAR MUSICA
   const {
    data: songData,
    error: songError, 
   } = await supabaseClient
   .storage
   .from('songs')
   .upload(`song-${values.title}-${uniqueID}`, songFile, {
    cacheControl: '3600',
    upsert: false
   });
   if (songError) {
    setIsLoading(false);
    return toast.error('Falha ao enviar a musica')
   }

   // ENVIAR IMAGEM
   const {
    data: imageData,
    error: imageError, 
   } = await supabaseClient
   .storage
   .from('images')
   .upload(`image-${values.title}-${uniqueID}`, imageFile, {
    cacheControl: '3600',
    upsert: false
   });
   if (imageError) {
    setIsLoading(false);
    return toast.error('Falha ao enviar a imagem')
   }

   const {
    error: supabaseError
   } = await supabaseClient
   .from('songs')
   .insert({
    user_id: user.id,
    title: values.title,
    author: values.author,
    image_path: imageData.path,
    song_path: songData.path
   })
   if (supabaseError) {
    setIsLoading(false);
    return toast.error(supabaseError.message);
   }

   router.refresh();
   setIsLoading(false);
   toast.success('Musica Adicionada');
   reset();
   uploadModal.onClose();

  } catch (error) {
   toast.error("Algo deu errado");
  } finally {
   setIsLoading(false);
  }

 }

return (
 <Modal
  title="Adicionar Musica"
  description="Envie uma musica no formato (.mp3*)"
  isOpen={uploadModal.isOpen}
  onChange={onChange}
 >
  <form
   onSubmit={handleSubmit(onSubmit)}
   className="
    flex
    flex-col
    gap-y-4
   "
  >
   <Input
    id="title"
    disabled={isLoading}
    {...register('title', { required: true })}
    placeholder="Nome da Musica"
   />
   <Input
    id="author"
    disabled={isLoading}
    {...register('author', { required: true })}
    placeholder="Nome do Artista / Banda"
   />
   <div>
    <div
     className="
      pb-1
     " 
    >
     Selecione o arquivo da musica
    </div>
     <Input
     id="song"
     type="file"
     disabled={isLoading}
     accept=".mp3"
     className="
     text-neutral-400
     cursor-pointer
     transition
     "
     {...register('song', { required: true })}     
    />
   </div>
   <div>
    <div
     className="
      pb-1
     " 
    >
     Selecione uma imagem
    </div>    
    <Input     
     id="image"
     type="file"
     disabled={isLoading}
     accept="image/*"
     className="
     text-neutral-400
     cursor-pointer
     transition
     "
     {...register('image', { required: true })}     
    />    
   </div>
   <Button
    disabled={isLoading}
    type="submit"
    className="
     bg-green-400
     "
   >
    Adicionar
   </Button>
  </form>
 </Modal>
)
}

export default UploadModal;