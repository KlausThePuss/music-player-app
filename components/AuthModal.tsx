"use client";

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect } from "react";

import useAuthModal from "@/hooks/useAuthModal";

import Modal from "./Modal";


const AuthModal = () => {

 const supabaseClient = useSupabaseClient();
 const router = useRouter();
 const { session } =  useSessionContext();
 const { onClose, isOpen } = useAuthModal();

 useEffect(()=>{
  if (session){
   router.refresh();
   onClose();
  }
 },[
  session,
  router,
  onClose
 ]);

 const onChange = (open:boolean) => {
  if (!open){
   onClose();
  }
 }

return (
 <Modal
  title="Bem Vindo ao JinxPlayer"
  description="Acesse a sua Conta"
  isOpen={isOpen}
  onChange={onChange}
 >
  <Auth
   supabaseClient={supabaseClient}
   appearance={{
    theme: ThemeSupa,
    variables: {
     default: {
      colors: {
       brand: "#404040",
       brandAccent: "#22c55e",
      }
     }
    }    
   }}
   theme="dark"
   providers={[
    "google",
    "github"
   ]}
   magicLink
   localization={{
    variables: {
      sign_in: {
       email_label: "Email",
       password_label: "Senha",
       email_input_placeholder: "Seu Endereco de Email",
       password_input_placeholder: "Sua Senha",
       button_label: "Fazer Login",
       loading_button_label: " Fazendo login ...",
       social_provider_text: "Login com {{provider}}",
       link_text: "Ja tem uma conta registrada? Clique aqui"
      },
      sign_up: {
       email_label: "Email",
       password_label: "Crie uma Senha",
       email_input_placeholder: "Seu Endereco de Email",
       password_input_placeholder: "Sua Senha",
       button_label: "Registrar",
       loading_button_label: "Criando conta ...",
       social_provider_text: "Registrar-se com {{provider}}",
       link_text: "Ainda nao tem uma conta? Clique aqui",
       confirmation_text: "Cheque seu email e clique no link de confirmacao"
      },
      magic_link: {
       email_input_label: "Email",
       email_input_placeholder: "Seu Endereco de Email",
       button_label: "Enviar link magico",
       loading_button_label: "Enviando link magico, aguarde ...",
       link_text: "Envie-me um link magico por email",
       confirmation_text: "Cheque seu email e clique no link magico"
      },
      forgotten_password: {
       email_label: "Email",
       password_label: "Your Password",
       email_input_placeholder: "Seu Endereco de Email",
       button_label: "Enviar instrucoes para resetar a senha",
       loading_button_label: "Enviando instrucoes, aguarde ...",
       link_text: "Esqueceu sua senha?",
       confirmation_text: "Cheque seu email e siga as instrucoes para resetar sua senha"
      },
      update_password: {
       password_label: "Nova Senha",
       password_input_placeholder: "Sua nova senha",
       button_label: "Atualizar senha",
       loading_button_label: "Atualizando senha, aguarde ...",
       confirmation_text: "Sua senha foi atualiazada"
     }
    },
  }}
   
  />
 </Modal>
) 
}

export default AuthModal;