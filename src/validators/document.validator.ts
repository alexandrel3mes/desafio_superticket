import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { cpf, cnpj } from 'cpf-cnpj-validator';

@ValidatorConstraint({ name: 'documentValidator', async: false })
export class DocumentValidator implements ValidatorConstraintInterface {
  validate(document: string) {
    const cpfValid = cpf.isValid(document);
    const cnpjValid = cnpj.isValid(document);

    if (cpfValid || cnpjValid) return true;
    return false;
  }

  defaultMessage() {
    return 'Documento inválido';
  }
}
