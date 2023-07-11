import { request, response } from 'express';

// Password encryption
import bcrypt from 'bcryptjs';

// User model
import User from '../models/User';

// JWT
import { generateJWT } from '../helpers/generateJWT';

// Register user
export const userRegister = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe un usuario con este correo electrónico',
      });
    }

    user = new User(req.body);

    // Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    user.photoURL = `https://source.boringavatars.com/marble/120/${user.username}?colors=0A0310,49007E,FF005B,FF7D10,FFB238`;

    // Save user in DB
    await user.save();

    // Generate JWT
    const token = await generateJWT(user.id, user.name);

    user.password = '';

    res.status(201).json({
      ok: true,
      uid: user.id,
      user,
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    });
  }
};

// Login user
export const userLogin = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe con ese correo institucional',
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'La contraseña es incorrecta',
      });
    }

    // Generate JWT
    const token = await generateJWT(user.id, user.name);

    user.password = '';

    res.json({
      ok: true,
      uid: user.id,
      user,
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: 'Error inespe',
    });
  }
};

// Update user information
export const updateUser = async (req = request, res = response) => {
  const { uid } = req.params;

  try {
    let user = await User.findById(uid);

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: 'El usuario no existe',
      });
    }

    const newUser = {
      ...req.body,
    };

    const userUpdated = await User.findByIdAndUpdate(uid, newUser, {
      new: true,
    });

    res.json({
      ok: true,
      user: userUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error actualizando la informacion del usuario, intente de nuevo mas tarde',
    });
  }
};

// Renew token
export const userTokenRenew = async (req: any, res = response) => {
  const { uid, name } = req;

  console.log(typeof req);

  // Generate JWT
  const token = await generateJWT(uid, name);

  const user = await User.findById(uid);

  if (user) user.password = '';

  res.json({
    ok: true,
    uid,
    user,
    token,
  });
};

// Get user data by username
export const getUserByUsername = async (req = request, res = response) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: 'El usuario no existe',
      });
    }

    user.password = '';

    res.json({
      ok: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error trayendo la informacion del usuario, intente de nuevo mas tarde',
    });
  }
};

// Change user password
export const changeUserPassword = async (req = request, res = response) => {
  const { uid } = req.params;
  const { password, newPassword, confirmNewPassword } = req.body;

  try {
    let user = await User.findById(uid);

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: 'El usuario no existe',
      });
    }

    // Confirm passwords
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'La contraseña es incorrecta',
      });
    }

    // Can't use the same password
    if (password === newPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'La nueva contraseña no puede ser igual a la anterior',
      });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Las contraseñas no coinciden',
      });
    }

    // Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(newPassword, salt);

    await user.save();

    user.password = '';

    res.json({
      ok: true,
      msg: 'Contraseña actualizada correctamente',
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error trayendo la informacion del usuario, intente de nuevo mas tarde',
    });
  }
};
