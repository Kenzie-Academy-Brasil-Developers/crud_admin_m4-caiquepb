import { Request, Response } from "express";
import { TLoginRequest, TLoginResponse } from "../interfaces/login.interfaces";
import createLoginService from "../services/login/createLogin.services";

const loginController = async (request: Request, response: Response): Promise<Response> => {
    const userData: TLoginRequest = request.body;
    const token: TLoginResponse = await createLoginService(userData);
    return response.status(201).json(token);
};

export default loginController;
