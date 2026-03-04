import * as React from "react";
import {FormProvider, useForm} from "react-hook-form";
import {useState} from "react";
import {Input} from "@/components/ui/input.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Button} from "@/components/ui/button.jsx";
// import {zodResolver} from "@hookform/resolvers/zod";
import {SchemaContact} from "@/components/zod/schemaContact.js";
import {Textarea} from "@/components/ui/textarea.jsx";

// const schema = SchemaContact();

export default function Contact() {

  const methods = useForm({
    // resolver: zodResolver(schema),
    defaultValues: {
      nomeCompleto: '',
      email: '',
      message: '',
    },
  });
  const {
    register,
    handleSubmit,
    formState : {errors, isSubmitting, isSubmitted},
    reset
  } = methods;

  const [error, setError] = useState();
  // const temErro = Object.keys(errors).length > 0;

  // * DEIXAR AQUI POR ENQUANTO PORQUE ISSO DEPENDE DOS REQUISITOS E PRECISO
  // AINDA DECIDIR COMO SERA FEITO O ATENDIMENTO *
  const handleSubmitContact = async ({e, data}) => {
    e.preventDefault();
    if (!data.nomeCompleto || !data.email || !data.message) {
      setError("Por favro, preencha todos os campos");
      return;
    }
    const formContact = await fetch("https://formspree.io/f/xwvnzbjb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (formContact.ok) {
      alert("Mensagem enviada com sucesso para clebergarzaro74@gmail.com ", formContact.message);
      reset();
    } else{
      alert("Erro ao enviar mensagem");
    }
  };

  return (
    <FormProvider {...methods} >
      <section id="contacts" className="py-20 md:py-32 bg-zinc-900">
        <main onSubmit={handleSubmit(handleSubmitContact)} className="space-y-6">
          {/*action="https://formspree.io/f/xwvnzbjb" method="POST"*/}
          <form >
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto">
                {/** section header **/}
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-300 mb-4"></h2>
                  <p className="text-lg text-gray-300">
                    Alguma dúvida ou problema? <br/> Nossa equipe está pronta para ajudar você a começar ou continuar sua
                    jornada.
                  </p>
                </div>

                {/** campo nome **/}
                <div className="block text-sm font-medium text-gray-300 mb-6">
                  <Label htmlFor="nome-completo">
                    Nome Completo
                    <span className="text-red-400 font-bold text-sm"> * </span>
                  </Label>
                  <Input
                    type="text"
                    {...register("nomeCompleto", { required: true })} //lidar com erros
                    placeholder="Digite seu nome completo"
                    id="nome-completo"
                    className="w-full border-l-2 border-zinc-600 hover:border-l-red-400 shadow-sm rounded h-10
                     text-zinc-300"
                  />
                </div>
                {/** campo email **/}
                <div className="block text-sm font-medium text-gray-300 mb-6">
                  <Label htmlFor="email">
                    Email
                    <span className="text-red-400 font-bold text-sm"> * </span>
                  </Label>
                  <Input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="Digite seu e-mail"
                    id="email"
                    className="w-full border-l-2 border-zinc-600 hover:border-l-red-400 shadow-sm rounded h-10
                    text-zinc-300"
                  />
                </div>

                {/** campo mensagem **/}
                <div className="block text-sm font-medium text-gray-300 mb-6">
                  <Label htmlFor="mensagem">
                    Mensagem
                    <span className="text-red-400 font-bold text-sm"> * </span>
                  </Label>
                  <Textarea
                    type="text"
                    {...register("mensagem", { required: true })}
                    placeholder="Digite sua mensagem"
                    id="mensagem"
                    className="w-full border-l-2 border-zinc-600 hover:border-l-red-400 shadow-sm rounded h-10
                    text-zinc-300"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center mt-4 border border-transparent rounded text-sm
                  font-medium text-zinc-300 bg-blue-900 hover:bg-blue-800 transition-colors"
                >
                  { isSubmitting ? 'Enviando...' : 'Enviar Mensagem' }

                </Button>

                {/* AVISO DE PREENCHIMENTO OBRIGATÓRIO */}
                {isSubmitted && errors && (
                  <div className="w-full p-4 bg-red-500/10 border  border-red-500/50 rounded text-red-400 text-center
                   text-sm font-bold mt-4 animate-pulse">
                    {/*CONTNINUAR COM O AVISO, TERMINAR ISSO AI MANO, DEPOIS VER A QUESTAO DO EMAIL ENVIADO*/}
                    {/*VER SE DEIXA SO UM EMAIL OU CONTINUA COMESTA FORMULARIO MESMO*/}
                    {/*VER TAMBEM OUTROS MDDELOA DE CONTADO PARA COLOCAR LA NO HEADER, CLICA EM CONTATO E MOSTRA OUTRA COISA , VAMOS DECIDIR ISTO*/}
                    {/*NA PROXIM ASEMANA*/}

                    ⚠️ Por favor, preencha todos os campos obrigatórios!

                  </div>
                )}
              </div>
            </div>
          </form>
        </main>
      </section>

    </FormProvider>
  );
}