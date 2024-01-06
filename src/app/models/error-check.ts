export class ErrorCheck {
  public userNameMinLength: number = 3;
  public userNameMaxLength: number = 20;
  public passwordMinLength: number = 4;
  public passwordMaxLength: number = 50;  
  
  public getUsernameError(errors: any) {
    if (errors?.required) {
      return "User name is required";
    }
    if (errors?.minlength) {
      return "Minimum length of user name is " + String(this.userNameMinLength);
    }
    if (errors?.maxlength) {
      return "Maximum length of user name is " + String(this.userNameMaxLength);
    }
    if (errors?.pattern) {
      return "Alphanumeric characters and _ only";
    }
    return '';
  }
  
  public getEmailError(errors: any) {
    if (errors?.required) {
      return "Email is required";
    }
    if (errors?.email) {
      return "Invalid email";
    }
    return '';
  }
  
  public getPasswordError(field: string, errors: any) {
    if (errors?.required) {
      return field + " is required";
    }
    if (errors?.minlength) {
      return "Minimum length of password is " + String(this.passwordMinLength);
    }
    if (errors?.maxlength) {
      return "Maximum length of password is " + String(this.passwordMaxLength);
    }
    return '';
  }
}