import { Request, Response } from "express";
import createUsersServices from "../services/users/createUsers.services";
import { TUserRequest, TUserResponse } from "../interfaces/users.interfaces";
import listUsersService from "../services/users/listUsers.services";
import updateUsersService from "../services/users/updateUsers.services";
import listLoggedUsersService from "../services/users/listUsersLogged.services";

const createUsersController = async (request: Request, response: Response): Promise<Response> => {
    const userData: TUserRequest = request.body;
    const newUser: TUserResponse = await createUsersServices(userData);
    return response.status(201).json(newUser);
};

const listUsersController = async (request: Request, response: Response): Promise<Response> => {
    const userData = response.locals.user
    const users = await listUsersService(userData);
    return response.json(users);
};

const listUsersLoggedController = async (request: Request, response: Response): Promise<Response> => {
    const userData = response.locals.user
    const users = await listLoggedUsersService(userData);
    return response.json(users);
};

const updateUsersController = async (request: Request, response: Response): Promise<Response> => {
    const userId: number = parseInt(request.params.id);
    const userData: Partial<TUserRequest> = request.body;
    const updatedUser = await updateUsersService(userId, userData);
    return response.json(updatedUser);
};

const deleteUsersController = async (request: Request, response: Response): Promise<Response | void> => {};

const reactivateUsersController = async (request: Request, response: Response): Promise<Response | void> => {};

export { createUsersController, listUsersController, listUsersLoggedController, updateUsersController, deleteUsersController, reactivateUsersController };
