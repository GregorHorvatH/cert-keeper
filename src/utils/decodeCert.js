import ASN1 from './asn1';

const NAME_REGEX = /[a-zA-Z]+\n/;

const KEYS = [
  {
    idx: 3,
    name: 'center',
  },
  {
    idx: 5,
    name: 'user',
  },
];

const decodeCert = (rawCertData) => {
  const result = ASN1.decode(rawCertData);

  if (result.typeName() !== 'SEQUENCE') {
    throw 'Неправильна структура конверта сертифіката (очікується SEQUENCE)';
  }

  const certs = {
    base64File: btoa(rawCertData),
  };

  KEYS.forEach(({ idx, name }) => {
    certs[name] = {};

    for (let i = 0; i < result.sub[0].sub[idx].sub.length; i++) {
      const item0 = result.sub[0].sub[idx].sub[i].sub[0].sub[0];
      const item1 = result.sub[0].sub[idx].sub[i].sub[0].sub[1];
      const code = item0.content().match(NAME_REGEX)[0].replace(/\n/, '');

      certs[name][code] = item1.content();
    }
  });

  certs.validFrom = result.sub[0].sub[4].sub[0].content();
  certs.validTo = result.sub[0].sub[4].sub[1].content();

  return certs;
};

export const stringToBase64 = (data) => btoa(data);

export const base64ToString = (data) => atob(data);

export default decodeCert;
