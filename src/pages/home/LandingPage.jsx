import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.jsx";
import {Menu, X} from "lucide-react";
// import {getLoginUrl} from "/utils/auth";


export default function Header(){

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const { user, isAuthenticated, logout } = useAuth();
  const [ isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    {label: 'Serviços', to: '/'},
    {label: 'Sobre', to: '/'},
    {label: 'Contato', to: '/'},
  ];

  return (
    <>

      <header className="fixed top-0 left-0 right-0 bg-zinc-900 border-b border-gray-600 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">

          {/**logo**/}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-linear-to-br from-blue-900 to-blue-700 rounded flex items-center justify-center">
              <span className="text-zinc-200 font-bold text-lg" style={{ fontFamily: "Poppins" }}>SE</span>
            </div>
            <span className="font-bold text-gray-200 text-lg" style={{ fontFamily: "Poppins" }}>
              Sistema Consulta Escolar
            </span>
          </div>

          {/** navegacao desktop **/}
          <nav className="hidden md-center gap-8">
            { navItems.map(item => (
              <Link
                key={item.label}
                to={item.to}
                className="text-gray-200 hover-blue-900 transition-colors duration-300 text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/** botao de login desktop **/}
          <div className="hidden md">
            { isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-200">Seja bem-vindo Cleber</span>
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-900 hover-gray-50"
                  // onclick={() => logout()}
                >
                  Sair
                </Button>
              </div>
            ) : (
              <Button
                className="bg-blue-900 hover-blue-800 text-gray-200 transition-colors duration-300"
                onClick={() => navigate("/login-form")}
              >
                Entrarrrr
              </Button>
            )}
          </div>

          {/** botao de menu mobile **/}
          <Button
            className="md-2 hover-gray-300 rounded transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-900"/>
            ) : (
              <Menu className="w-6 h-6 text-gray-900" />
            )}
          </Button>
        </div>

        {/** navegacao mobile **/}
        { mobileMenuOpen && (
          <div className="md-t border-gray-600 bg-zinc-800">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              { navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.label}
                  className="text-gray-200 hover-blue-900 transition-colors py-2 text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              { isAuthenticated ? (
                <Button
                  variant="outline"
                  className="w-full border-gray-600 text-gray-900 hover-gray-200 mt-2"
                  onClick={() => {
                    // logout();
                    setMobileMenuOpen(false)
                  }}
                >
                  Sair
                </Button>
              ) : (
                <Button
                  className="w-full bg-gray-200 hover-gray-300 text-gray-900 mt-2"
                  onClick={() => {
                    navigate("/login-form");
                    setMobileMenuOpen(true)
                  }}
                >
                  Entrar
                </Button>
              )}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
