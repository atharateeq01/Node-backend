export const isAlphabetic = (value: string): boolean => {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(value);
  };
  
  export const isAlphaNumeric = (value: string): boolean => {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(value);
  };
  
  export const isAlphaNumericWithSpecial = (value: string): boolean => {
    const regex = /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\-\s]*$/;
    return regex.test(value);
  };  
  
  export const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  export const isStrongPassword = (password: string): boolean => {    
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };
