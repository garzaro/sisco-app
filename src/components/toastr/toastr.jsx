import toastr from "toastr";

toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "preventDuplicates": true,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

export function notificacao(titulo, mensagem, tipo) {
  toastr[tipo](mensagem, titulo);
}
export function errorLoginMessage(mensagem) {
  notificacao('Erro ao fazer login! ', mensagem, 'error');
}
export function errorSaveUserMessage(mensagem) {
  notificacao('Erro ao cadastrar usuario! ', mensagem, 'error');
}
export function errorSaveEscolaMessage(mensagem) {
  notificacao('Erro ao cadastrar escola! ', mensagem, 'error');
}
export function errorSaveProvedorMessage(mensagem) {
  notificacao('Erro ao cadastrar provedor! ', mensagem, 'error');
}
export function errorSaveMessage(mensagem) {
  notificacao('Ocorreu um erro! ', mensagem, 'error');
}
export function successMessage(mensagem) {
  notificacao('Sucesso', mensagem, 'success');
}
export function alertMessage(mensagem) {
  notificacao('Alerta', mensagem, 'warning');
}