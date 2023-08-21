
export function trimerISHERE(phone: string){
    if (phone && phone.charAt(0) === '0') {
      return phone.slice(1);
    } else {
      return phone;
    }
  }