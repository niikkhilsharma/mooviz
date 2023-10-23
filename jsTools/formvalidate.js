import { checkemail } from "./validateEmail";
export function validateform(Allformdata) {
  const { email, password, contact, name } = Allformdata;
  if (
    name.length > 1 &&
    checkemail(email) &&
    email.split("@")[1].includes(".") &&
    // contact.length === 10 &&
    password.length > 7 &&
    email.split("@")[1].split(".")[1].length !== 1
  ) {
    return "success";
  } else if (name.length < 2) {
    return "nameerr";
  } else if (!checkemail(email)) {
    return "emailerr";
  } else if (!email.split("@")[1].includes(".")) {
    return "emaildoterr";
  } else if (email.split("@")[1].split(".")[1].length === 1) {
    return "emaildoterr";
    // } else if (contact.length < 10) {
    //   return "contacterr";
  } else if (password.length < 8) {
    return "passworderr";
  }
}
