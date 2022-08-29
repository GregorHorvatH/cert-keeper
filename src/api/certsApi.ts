export const loadCerts = () => {
  let certs = [] as string[];

  try {
    certs = JSON.parse(localStorage.getItem('certs') as string) || [];
  } catch (e) {
    console.log(e);
  }

  return Promise.resolve(certs);
};

export const saveCerts = (cert: string) =>
  loadCerts().then((certs: string[]) => {
    if (certs.includes(cert)) {
      throw new Error('Даний сертифікат вже завантажений');
    }

    localStorage.setItem('certs', JSON.stringify([...certs, cert]));

    return cert;
  });
