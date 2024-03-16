import { DateUtil } from '../util/date.util';
import { StringUtil } from '../util/string.util';

export class EmployeeEntity {
  _id: string | null;
  name: string;
  position: string;
  email: string;
  cellPhoneNumber: string | null;
  birthdayDate: string | Date;

  isValid(ignoreFields: (keyof EmployeeEntity)[] = []) {
    const errors: Record<Partial<keyof EmployeeEntity>, string> = Object.create(
      null,
    );

    if (!StringUtil.isValid(this.name)) {
      errors.name = 'Invalid name';
    }

    const isValidEmail =
      StringUtil.isValid(this.email) && StringUtil.isValidEmail(this.email);

    if (!isValidEmail) {
      errors.email = 'Invalid email';
    }

    if (this.cellPhoneNumber) {
      this.cellPhoneNumber = String(this.cellPhoneNumber);
    }

    if (!DateUtil.isValid(this.birthdayDate)) {
      errors.birthdayDate = 'Invalid birthdayDate';
    } else {
      this.birthdayDate = new Date(this.birthdayDate);
    }

    for (const fieldToIgnore of ignoreFields) {
      Reflect.deleteProperty(errors, fieldToIgnore);
    }

    let hasError = false;
    for (const _ in errors) {
      hasError = true;
      break;
    }

    return { hasError, errors };
  }

  getJson(ignoreFields: (keyof EmployeeEntity)[] = []) {
    const entity = {
      name: this.name,
      position: this.position,
      email: this.email,
      cellPhoneNumber: this.cellPhoneNumber,
      birthdayDate: this.birthdayDate,
    };

    for (const fieldToRemove of ignoreFields) {
      if (Reflect.has(entity, fieldToRemove)) {
        Reflect.deleteProperty(entity, fieldToRemove);
      }
    }

    return entity;
  }
}
