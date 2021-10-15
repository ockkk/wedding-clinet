export function phoneCall(phoneNumber: string) {
  window.location.href = "tel:" + phoneNumber;
}

export function phoneMessage(phoneNumber: string) {
  window.location.href = "sms:" + phoneNumber;
}