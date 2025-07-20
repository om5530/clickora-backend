import { Request, Response, Router } from "express";
import joi from "joi";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { models } from "../datasource";

const router = Router();

router.post('login', async (req: Request, res: Response) => {
    await joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
        rememberMe: joi.boolean().optional(),
    }).validateAsync(req.body, {
        abortEarly: false,
        allowUnknown: true,
    });

    const { email, password, rememberMe } = req.body;

    const doesEmailExist = await models.User.findOne({ where: { email }})

    if(!doesEmailExist) throw new Error("Email does not exist");

    const isPasswordValid = await bcrypt.compare(password, doesEmailExist.password);

    if(!isPasswordValid) throw new Error("Invalid password");

    const token = jwt.sign({ userId: doesEmailExist.id }, process.env.JWT_SECRET as string, { expiresIn: rememberMe ? '30d' : '24h' });

    res.status(200).send({
        token,
        user: doesEmailExist
    });

    res.status(200).send({ message: "Login successful" });
})