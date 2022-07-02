import express, { Request, Response } from 'express';
import { User } from './../model/userModel';
import { queryNullCheck } from './../utilities/utilities';

const router = express.Router();

router.get('/api/findAllUser', async (req: Request, res: Response) => {
    const {
        name,
        email,
        password,
        role,
        createdAt,
        profilePic,
        info
    } = req.body;

    const query = { $and: [queryNullCheck("email", email), queryNullCheck("role", role), ] };

    try {
        const user = await User.find(query);
        if (user) {
            return res.status(200).send(user);
        } else {
            return res.status(400).send({ message: "No user found" });
        }
    } catch (err) {
        res.status(400).send({ message: "Something is wrong" });
    }
});

router.get('/api/user/', async (req: Request, res: Response) => {
    const {
        name,
        email,
        password,
        role: {
            value: roleId,
            label: roleName
        },
        createdAt,
        profilePic,
        info
    } = req.body;

    const query = { $and: [queryNullCheck("email", email)] };

    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(200).send(user);
        } else {
            return res.status(400).send({ message: "No user found" });
        }
    } catch (err) {
        res.status(400).send({ message: "Something is wrong" });
    }
});

router.post('/api/user', async (req: Request, res: Response) => {
    const {
        name,
        email,
        password,
        role,
        createdAt,
        profilePic,
        info
    } = req.body;

    const newUser = new User({
        name,
        email,
        password,
        role,
        createdAt,
        profilePic,
        info
    });

    try {
        const result: any = await newUser.save();
        return res.status(201).send({ ...result._doc, message: 'user created' });
    }
    catch (err) {
        console.log("error message", err)
        return res.status(400).send("Could not create user");
    }

})

router.put('/api/user', async (req: Request, res: Response) => {
    const {
        name,
        email,
        password,
        role,
        createdAt,
        profilePic,
        info
    } = req.body;

    const query = { $and: [queryNullCheck("email", email)] };


    try {
        await User.findOneAndUpdate(query, {
            name,
            email,
            password,
            role,
            createdAt,
            profilePic,
            info
        }, {})
        return res.status(201).send({ message: 'user updated' });

    }
    catch (err) {
        console.log("error message", err)
        return res.status(400).send("failed to change user data");
    }

})

router.delete('/api/user', async (req: Request, res: Response) => {
    const {
        email
    } = req.body;

    try {
        await User.deleteOne({ email });
        return res.status(201).send({ message: 'user deleted' });

    }
    catch (err) {
        console.log("error message", err)
        return res.status(400).send("Failed to delete user");
    }

})

export { router as userRouter };