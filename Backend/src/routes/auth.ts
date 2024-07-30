
import express, { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

const router = express.Router();

router.get('/check-session', (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.json({ valid: false });
  }

  jwt.verify(token, process.env.JWT_SECRET as Secret, (err, decoded) => {
    if (err) {
      return res.json({ valid: false });
    }
    return res.json({ valid: true });
  });
});

export default router;
