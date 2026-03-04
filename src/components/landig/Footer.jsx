
export default function Footer (){
  const anoAtual = new Date().getFullYear();
  return(
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-16">
        {/** conteudo principal de o rodapé **/}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/** brand **/}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-16 h-12 bg-linear-to-br from-blue-700 to-gray-900 rounded flex items-center
               justify-center "
              >
                <span className="text-gray-300 font-bold"> SCE </span>
              </div>
              <span className="text-gray-400 text-lg font-bold"> Sistema de de Consulta Escolar </span>
            </div>
            <p className="text-gray-300 text-sm">Seu sistema de acompanhamento tecnologica escolar</p>
          </div>

          {/** produto **/}
          <div>
            <h4 className="font-bold text-zinc-300 mb-4">Produto</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#services" className="hover:text-zinc-300 transition-colors">
                  Serviços
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-zinc-300 transition-colors">
                  Sobre
                </a>
              </li>
              {/*<li>*/}
              {/*  <a href="" className="hover:text-zinc-300 transition-colors">*/}
              {/*    Preços*/}
              {/*  </a>*/}
              {/*</li>*/}
              {/*<li>*/}
              {/*  <a href="#" className="hover:text-zinc-300 transition-colors">*/}
              {/*    Blog*/}
              {/*  </a>*/}
              {/*</li>*/}
            </ul>
          </div>

          {/** Company **/}
          <div>
            <h4 className="font-bold text-zinc-300 mb-4"> Empresa </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="" className="hover:text-white transition-colors">
                  Sobre Nós
                </a>
              </li>

              {/*<li>*/}
              {/*  <a href="" className="hover:text-white transition-colors">*/}
              {/*    Carreiras*/}
              {/*  </a>*/}
              {/*</li>*/}

              {/*<li>*/}
              {/*  <a href="" className="hover:text-white transition-colors">*/}
              {/*    Imprensa*/}
              {/*  </a>*/}
              {/*</li>*/}

              <li>
                <a href="" className="hover:text-white transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/** legal **/}
          <div>
            <h4 className="font-bold text-white mb-4"> Legal </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="" className="hover:text-white transition-colors">
                  Privacidade
                </a>
              </li>
              <li>
                <a href="" className="hover:text-white transition-colors">
                  Termos de Serviço
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Segurança
                </a>
              </li>
              <li>
                <a href="" className="hover:text-white transition-colors">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/** divider **/}
        <div className="border-t border-gray-600 pt-8">
          {/** bottom section **/}
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; { anoAtual } Sistema de Consulta Escolar. Todos os direitos tortos. </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-zinc-300 transition-colors">Facebook</a>
              <a href="#" className="hover:text-zinc-300 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-zinc-300 transition-colors">Instagram</a>
              <a href="#" className="hover:text-zinc-300 transition-colors">Youtube</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}