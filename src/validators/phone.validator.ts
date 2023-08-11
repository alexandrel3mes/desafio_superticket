import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { parse } from 'telefone';

@ValidatorConstraint({ name: 'phoneValidator', async: false })
export class PhoneValidator implements ValidatorConstraintInterface {
  validate(phone: string) {
    return parse(phone) ? true : false;
  }

  defaultMessage() {
    return 'Telefone inválido';
  }
}
