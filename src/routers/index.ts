import express from 'express';
const router = express.Router();

import { havePermission } from '../middlewares/havePermission';

import applicationControllers from '../controllers/application';
import authControllers from '../controllers/authentication'

router.post('/signup', authControllers.signUp);
router.post('/signin', authControllers.signIn);

router.get('/admin', havePermission(['admin']), applicationControllers.doSomething);
router.get('/moderator', havePermission(['moderator']), applicationControllers.doSomething);
router.get('/member', havePermission(['member']), applicationControllers.doSomething);

router.get('/staff', havePermission(['admin', 'moderator']), applicationControllers.doSomething);;
router.get('/all_users', havePermission(['admin', 'moderator', 'member']), applicationControllers.doSomething);

export { router };