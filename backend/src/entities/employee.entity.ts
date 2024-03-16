import { DateUtil } from '../util/date.util';
import { StringUtil } from '../util/string.util';

export class EmployeeEntity {
  _id: string | null;
  name: string;
  position: string;
  email: string;
  cellPhoneNumber: string | null;
  birthdayDate: string | Date;

  isValid() {
    let hasError = false;
    const errors: Record<Partial<keyof EmployeeEntity>, string> = Object.create(
      null,
    );

    if (!StringUtil.isValid(this.name)) {
      errors.name = 'Invalid name';
      hasError = true;
    }

    const isValidEmail =
      StringUtil.isValid(this.email) && StringUtil.isValidEmail(this.email);

    if (!isValidEmail) {
      hasError = true;
      errors.email = 'Invalid email';
    }

    if (this.cellPhoneNumber) {
      this.cellPhoneNumber = String(this.cellPhoneNumber);
    }

    if (DateUtil.isValid(this.birthdayDate)) {
      hasError = true;
      errors.birthdayDate = 'Invalid email';
    }

    return { hasError, errors };
  }

  get json() {
    return {
      name: this.name,
      position: this.position,
      email: this.email,
      cellPhoneNumber: this.cellPhoneNumber,
      birthdayDate: this.birthdayDate,
    };
  }
}
