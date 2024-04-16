import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { User } from 'src/04-users/model/user.model';

@ValidatorConstraint({ async: true })
export class IsUniqueLoginConstraint implements ValidatorConstraintInterface {
  async validate(login: string) {
    const user = await User.findOne({ where: { login } });
    return !user;
  }
}

export function IsUniqueLogin(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniqueLoginConstraint,
    });
  };
}
