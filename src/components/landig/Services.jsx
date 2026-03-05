import {
  FileIcon, FilesIcon,
  MonitorCheckIcon, NetworkIcon, PackageIcon, PrinterIcon, TextIcon, TextSelectIcon, WifiIcon, ZapIcon

} from "lucide-react";
import {Card} from "@/components/ui/card.jsx";
import {AiFillProfile} from "react-icons/ai";



const serviceItem = [
  {
    icon: <MonitorCheckIcon className="w-8 h-8 text-blue-500"/>,
    title: "Formatação de Computadores",
    description: "Restauração do sistema operacional, backup de dados, formatação, " +
      "e configuração inicial para uso seguro e eficiente",
  },
  {
    icon: <PrinterIcon className="w-8 h-8 text-blue-500"/>,
    title: "Configuração de Impressoras",
    description: "Instalação de drivers, configuração de impressão em rede (local ou remota) e solução de problemas.",
  },
  {
    icon: <ZapIcon className="w-8 h-8 text-blue-500"/>,
    title: "Instalação de Softwares",
    description: "Implantação de ferramentas educacionais, pacotes de escritório e sistemas de gestão escolar.",
  },
  {
    icon: <NetworkIcon className="w-8 h-8 text-blue-500"/>,
    title: "Cabeamento de Rede",
    description: "Instalação e organização de cabos UTP, conformidade com padrões TIA/EIA 568 e testes de validação.",
  },
  {
    icon: <WifiIcon className="w-8 h-8 text-blue-500"/>,
    title: "Configuração de Internet",
    description: "Definição de endereços IP, configuração de roteadores, switches e pontos de acesso (Wi-Fi).",
  },
  {
    icon: <AiFillProfile className="w-8 h-8 rounded text-blue-500"/>,
    title: "Emissão de Relatórios",
    description: "Documentação detalhada do serviço realizado, laudos de equipamentos inservíveis e obsoletos.",
  },
  {
    icon: <PackageIcon className="w-8 h-8 rounded text-blue-500"/>,
    title: "Listagem de Materiais",
    description: "Elaboração de listas de itens necessários para manutenção da rede de internet da escolas.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-32 bg-zinc-900 ">
      <div className=" container mx-auto px-4">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-300 mb-4">Serviços</h2>
          <p className="text-lg text-gray-300">Controle de tecnologia das escolas em um único lugar</p>
        </div>
        {/** services grid **/}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {serviceItem.map((service, index) => (
            <Card
              key={index}
              className="p-8 border border-zinc-700 hover:border-blue-900 shadow-lg shadow-border
               hover:shadow-zinc-500 transition-colors duration-300 bg-zinc-800 "
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-300 mb-3">{service.title}</h3>
              <p className="text-gray-300 leading-relaxed">{service.description}</p>
            </Card>
          ))}
        </div>
        {/** divider **/}
        <div className="mt-20 pt-20 border-t border-gray-500"></div>
      </div>
    </section>
  );
}