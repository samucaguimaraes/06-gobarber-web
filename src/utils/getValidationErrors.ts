/** Componente responsavel por tratar os erros com o yup */
import { ValidationError } from 'yup';


/** Interface generica para receber os erros no formato [ name:string : erros:string] */
interface Errors {
  [key: string]: string;
}

//** Função que recebe todos os erros do form */
export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  /** Percorrendo os erros e setando as mensagens referentes */
  err.inner.forEach((error) => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
