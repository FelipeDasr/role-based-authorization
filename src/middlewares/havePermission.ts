import { Request, Response, NextFunction } from 'express';
import UserServices from '../services/User';

import { IJWTPayload } from '../interfaces/Jwt';

import jwt from 'jsonwebtoken';

function havePermission(roles: string[]) {

    const errorResponse = {
        errors: ['unauthorized']
    };

    // Middleware
    return (req: Request, res: Response, next: NextFunction) => {
        const bearerToken = req.headers.authorization;

        // Checks bearer type
        if (typeof (bearerToken) === 'string') {

            const bearerTokenSplited = bearerToken.split(' ');

            // Bearer token validation
            if (!bearerToken.startsWith('Bearer ') || bearerTokenSplited.length !== 2)
                return res.status(401).json(errorResponse);

            const token = bearerTokenSplited[1];

            // Checks jwt token
            jwt.verify(token, process.env.API_TOKEN, async (err, payload: IJWTPayload) => {
                if (err) return res.status(422).json({
                    errors: ['Expired token']
                });

                const userResult = await UserServices.getUserById(payload.id);

                if (userResult instanceof Error) {
                    return res.status(userResult.httpCode).json({
                        errors: [userResult.message]
                    })
                }

                // Checks the user role
                if (roles.includes(userResult.role)){
                    return next()
                }

                return res.status(401).json(errorResponse);
            })
        }
        else {
            return res.status(401).json(errorResponse);
        }
    }

}

export { havePermission }