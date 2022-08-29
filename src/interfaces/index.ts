export interface AnyObj {
  [key: string]: any;
}

export interface CertData {
  base64File?: string;
  center?: AnyObj;
  user?: AnyObj;
  validFrom?: string;
  validTo?: string;
}
