import {Button} from "@/components/ui/button.jsx";
import {ArrowRight, BookOpen, Home, TrendingUpIcon, Users} from "lucide-react";
import {useNavigate} from "react-router-dom";

export default function Hero() {

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login-form");
  }

  return (
    <section className="relative overflow-hidden bg-zinc-900 ">

      {/* Background Pattern - Subtle decorative element */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
          <defs>
            <pattern id="dots" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="3" fill="#1e3a8a" />
            </pattern>
          </defs>
          <rect width="1200" height="600" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative container mx-auto px-4 md:px-8 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-200">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-emerald-700">
                Bem-vindo ao Sistema de Consulta Escolar
              </span>
            </div>
            {/*<p className="text-red-500">CONTINUAR COM ESTA AREA VER MELHOR TEXTO - VER O QUE FIZ EM MANUS</p>*/}
            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-slate-300 leading-tight">
                Infraestrutura Escolar de {' '}
                <span className="text-emerald-600">Excelência</span>
              </h1>
              {/*<p className="text-sm md:text-xl text-slate-100 leading-relaxed max-w-lg">*/}
                Transformando a tecnologia de nossas escolas com soluções profissionais de rede, configuração de
                sistemas e suporte técnico especializado. Acesse informações das escolas, firewalls, provedores de
                internet e muito mais em um único lugar.
              {/*</p>*/}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-emerald-50 hover:bg-slate-100 text-zinc-900 font-semibold rounded-3xl transition-all
                 duration-300 hover:shadow-lg hover:-translate-y-0.5"
                onClick={handleLogin}
              >
                Acessar Sistema
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-slate-800 hover:border-slate-900 text-slate-300 font-semibold
                rounded-3xl transition-all duration-300"
              >
                Saiba Mais
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-slate-300">0+</div>
                <p className="text-sm text-slate-300">Escolas Ativas</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-slate-300">0+</div>
                <p className="text-sm text-slate-300">Escolas</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-slate-300">99.9%</div>
                <p className="text-sm text-slate-300">Disponibilidade</p>
              </div>
            </div>
          </div>

          {/* Right Visual Section */}
          <div className="relative h-full min-h-96 lg:min-h-full flex items-center justify-center">
            {/* Decorative Background Shape - inset-0 */}
            <div className="absolute  bg-linear-to-br from-slate-900 to-zinc-700 rounded-3xl opacity-50" />

            {/* Feature Cards - Floating Animation */}
            <div className="relative w-full max-w-md space-y-6">
              {/* Card 1 - Notas */}
              <div className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300
               hover:-translate-y-1 border border-slate-100 animate-slide-up" style={{ animationDelay: '0.1s' }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-slate-900">Anotações e relatórios</h3>
                    <p className="text-sm text-slate-600">Acompanhe suas anotações e emita relatórios</p>
                  </div>
                </div>
              </div>

              {/* Card 2 - Frequência */}
              <div className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300
               hover:-translate-y-1 border border-slate-100 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                    <Home className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-slate-900">Acompanhamento</h3>
                    <p className="text-sm text-slate-600">Controle de problemas de ''</p>
                  </div>
                </div>
              </div>

              {/* Card 3 - Progresso */}
              <div className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300
              hover:-translate-y-1 border border-slate-100 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-100 rounded-lg group-hover:bg-amber-200 transition-colors">
                    <TrendingUpIcon className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-slate-900">Progresso Atendimento</h3>
                    <p className="text-sm text-slate-600">Visualize o desenvolvimento</p>
                  </div>
                </div>
              </div>

              <div className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300
              hover:-translate-y-1 border border-slate-100 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                    <Home className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-slate-900">Serviços Completos</h3>
                    <p className="text-sm text-slate-600">Formatação e configuração de computadores</p>
                    <p className="text-sm text-slate-600">Instalação de impressoras em rede e local</p>
                    <p className="text-sm text-slate-600">Cabeamento e configuração de rede</p>
                    <p className="text-sm text-slate-600">Cabeamento e configuração de rede</p>
                    <h3 className="font-semibold text-slate-900">Instalação de Softwares</h3>
                    <p className="text-sm text-slate-600">Implantação de ferramentas educacionais, 
                      pacotes de escritório e sistemas de gestão escolar e configuração de rede</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider - Diagonal Cut */}
      <div className="relative h-16 md:h-24 bg-white overflow-hidden">
        <svg
          className="absolute bottom-0 left-0 w-full h-full text-slate-50"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <polygon points="0,40 1200,0 1200,120 0,120" fill="currentColor" />
        </svg>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in,
          .animate-slide-up {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
