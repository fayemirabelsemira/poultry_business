export const SMS_NUMBERS = ["+639059407500", "+639923700960"];

export const WHATSAPP_NUMBER = "+639156264993";
export const WHATSAPP_DIGITS = WHATSAPP_NUMBER.replace(/\D/g, "");
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_DIGITS}`;

/** "+639059407500" -> "+63 905 940 7500" */
export const formatPH = (n: string) => n.replace(/^\+63(\d{3})(\d{3})(\d{4})$/, "+63 $1 $2 $3");

export interface Owner {
  name: string;
  url: string;
  imageKey: string; // file name (without extension) in src/assets/owners
}

export const OWNERS: Owner[] = [
  { name: "Gloria Semira", url: "https://www.facebook.com/glsemira", imageKey: "gloria-semira" },
  { name: "Rene Semira", url: "https://www.facebook.com/semirarene", imageKey: "jerry-semira" },
  { name: "Jerry Semira", url: "https://www.facebook.com/jerry.semira.54", imageKey: "rene-semira" },
  { name: "Archie Macaraig", url: "https://www.facebook.com/archie.macaraig.3", imageKey: "archie-macaraig" },
];
