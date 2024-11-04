
import { Request,Response,NextFunction } from "express";
import appError from "../error/appError";



export const errorHandler = (err:appError, req:Request, res:Response, next:NextFunction):any => {

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';


    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message || 'Something went wrong!',
    });
};
