import toastr from "toastr";

toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-bottom-center",
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

export function notification(titulo, mensagem, tipo) {
  toastr[tipo](mensagem, titulo);
}
export function errorLoginMessage(mensagem) {
  notification('Erro ao fazer login! ', mensagem, 'error');
}
export function errorSaveUserMessage(mensagem) {
  notification('Erro ao cadastrar usuario! ', mensagem, 'error');
}
export function errorSaveEscolaMessage(mensagem) {
  notification('Erro ao cadastrar escola! ', mensagem, 'error');
}
export function errorSaveProvedorMessage(mensagem) {
  notification('Erro ao cadastrar provedor! ', mensagem, 'error');
}
export function errorSaveMessage(mensagem) {
  notification('Ocorreu um erro! ', mensagem, 'error');
}
export function successMessage(mensagem) {
  notification('Sucesso', mensagem, 'success');
}
export function alertMessage(mensagem) {
  notification('Alerta', mensagem, 'warning');
}