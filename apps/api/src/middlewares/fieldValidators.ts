import { request, response } from 'express';
import { validationResult } from 'express-validator';

export const fieldValidators = (req = request, res = response, next: any) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  next();
};
