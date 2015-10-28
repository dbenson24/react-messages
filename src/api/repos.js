import { Router } from 'express';

const router = new Router();

router.get('/:username', (req, res, next) => {
  console.log("Hit the server request");
  res.send({msg: "hello"});
});

router.get('/', (req, res, next) => {
  console.log("Hit the server request");
  res.send({msg: "hello"});
});

export default router;