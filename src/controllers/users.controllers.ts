import { Request, Response } from "express";
import createUsersServices from "../services/users/createUsers.services";
import { TUserRequest, TUserResponse, TUserUpdate } from "../interfaces/users.interfaces";
import listUsersService from "../services/users/listUsers.services";
import updateUsersService from "../services/users/updateUsers.services";
import listLoggedUsersService from "../services/users/listUsersLogged.services";
import deleteUsersService from "../services/users/deleteUsers.services";
import { recoverUsersService } from "../services/users/recoverUsers.services";

const createUsersController = async (request: Request, response: Response): Promise<Response> => {
    const userData: TUserRequest = request.body;
    const newUser: TUserResponse = await createUsersServices(userData);
    return response.status(201).json(newUser);
};

const listUsersController = async (request: Request, response: Response): Promise<Response> => {
    const userData = response.locals.user;
    const users = await listUsersService(userData);
    return response.json(users);
};

const listUsersLoggedController = async (request: Request, response: Response): Promise<Response> => {
    const userData = response.locals.user;
    const users = await listLoggedUsersService(userData);
    return response.json(users);
};

const updateUsersController = async (request: Request, response: Response): Promise<Response> => {
    const userId: number = parseInt(request.params.id);
    const userData: TUserUpdate = request.body;
    const admin = response.locals.user.admin;
    const updatedUser = await updateUsersService(userId, userData, admin);
    return response.json(updatedUser);
};

const deleteUsersController = async (request: Request, response: Response): Promise<Response> => {
    const userId: number = parseInt(request.params.id);
    const admin = response.locals.user.admin;
    const deletedUser = await deleteUsersService(userId, admin);
    return response.status(204).send();
};

const recoverUsersController = async (request: Request, response: Response): Promise<Response> => {
    const userId: number = parseInt(request.params.id);
    const admin = response.locals.user.admin;
    const recoveredUser = await recoverUsersService(userId, admin);
    return response.json(recoveredUser);
};

export { createUsersController, listUsersController, listUsersLoggedController, updateUsersController, deleteUsersController, recoverUsersController };
