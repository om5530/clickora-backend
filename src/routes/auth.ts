import { Request, Response, Router } from "express";
import joi from "joi";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { models } from "../datasource";
import { UserStatus } from "../models/user";

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
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

    const token = jwt.sign({ userId: doesEmailExist.id }, process.env.JWT_SECRET as string, { 
        algorithm: 'RS256',
        expiresIn: rememberMe ? '30d' : '24h' 
    });

    res.status(200).send({
        token,
        user: doesEmailExist
    });

    res.status(200).send({ message: "Login successful" });
})

router.post('/register', async (req: Request, res: Response) => {
    await joi.object({
        username: joi.string().min(3).max(30).required(),
        salutation: joi.string().valid('Mr.', 'Ms.', 'Mrs.', 'Dr.', 'Prof.', 'Engr.', 'Mx.', '').required(),
        firstName: joi.string().min(1).max(50).required(),
        lastName: joi.string().max(50).optional(),
        email: joi.string().email().required(),
        countryCode: joi.string().optional(),
        phone: joi.string().optional(),
        password: joi.string().min(8).required(),
    }).validateAsync(req.body, {
        abortEarly: false,
        allowUnknown: true,
    });

    const { username, salutation, firstName, lastName, email, countryCode, phone, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await models.User.create({
        username,
        salutation,
        firstName,
        lastName,
        email,
        countryCode,
        phone,
        password: hashedPassword,
        status: 'ACTIVE' as UserStatus,
        LastLogin: new Date(),
        rememberMe: true,
    });

    res.status(201).send({ message: "User registered successfully", user: newUser });
})

export default router;