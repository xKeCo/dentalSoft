import jwt from 'jsonwebtoken';

export const generateJWT = (uid: string, name: string) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };

    jwt.sign(
      payload,
      // process.env.SECRET_JWT_SEED ||
      '3sTeS3cReT0-s33Ddd-D3SaRr0lL0pArA-UAOPR0j3Ct-b4Ck3end',
      {
        expiresIn: '4h',
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('Could not generate token');
        }

        resolve(token);
      }
    );
  });
};
