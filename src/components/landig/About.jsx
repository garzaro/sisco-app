import {MonitorCheckIcon} from "lucide-react";

export default function About() {
  const computerImageUrl = '../../public/computer.webp'
  const cableImageUrl = '../../public/cable_switch.webp'
  const dashboardImageUrl = '../../public/dashboard.webp'

  const features = [
    {
      id: 1,
      title: 'Formatação Profissional',
      description:
        'Restauramos completamente seus computadores com sistemas operacionais otimizados e seguros, removendo ' +
        'dados antigos e configurando tudo para máxima eficiência.',
      image: computerImageUrl,
      bgColor: 'bg-primary/5',
      order: 'md:order-1',
      imageOrder: 'md:order-20',
    },
    {
      id: 2,
      title: 'Infraestrutura de Rede Robusta',
      description:
        'Cabeamento profissional com padrões TIA/EIA 568, patch panels organizados, conectores RJ45 de qualidade e' +
        ' testes completos de validação para garantir performance máxima.',
      image: cableImageUrl,
      bgColor: 'bg-zinc-900',
      order: 'md:order-3',
      imageOrder: 'md:order-4',
    },
    {
      id: 3,
      title: 'Dashboard de Gestão',
      description:
        'Acompanhe em tempo real o status da sua infraestrutura com relatórios detalhados, análise de uso de ' +
        'banda, gerenciamento de dispositivos e compliance de segurança.',
      image: dashboardImageUrl,
      bgColor: 'bg-zinc-900',
      order: 'md:order-5',
      imageOrder: 'md:order-6',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-zinc-950">
      <div className="container space-y-2">
        { features.map(( feature ) => (
          <div key={ feature.id }
               className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center ${ feature.bgColor} 
               p-8 md:p-16 rounded-2xl shadow-soft`}>
            {/** imagem **/}
            <div className={`fade-in-10 ${ feature.imageOrder } `}>
              <img
                src={ feature.image }
                alt={ feature.title }
                className="p-8 hover:border-blue-900 shadow-lg shadow-border
               hover:shadow-zinc-500 transition-colors duration-300 bg-zinc-900"
              />
            </div>

            {/** texto **/}
            <div className={`fade-in-10 ${ feature.order } space-y-4`}>
              <h3 className="text-4xl md:text-5xl font-bold text-zinc-300">
                { feature.title }
              </h3>
              <div className="divide-accent"></div>
              <p>{ feature.description }</p>
              <ul className="space-y-2 pt-4">
                <li className="flex items-center gap-2 text-zinc-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-300"></span>
                  Suporte técnico especializado
                </li>
                <li className="flex items-center gap-2 text-zinc-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-300"></span>
                  Documentação completa
                </li>
                <li className="flex items-center gap-2 text-zinc-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-300"></span>
                  Garantia de qualidade
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}