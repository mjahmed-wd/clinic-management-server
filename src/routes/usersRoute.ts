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

    const query = { $and: [queryNullCheck("email", email), queryNullCheck("role", role)] };

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

router.get('/api/user/getUser', async (req: Request, res: Response) => {
    const {
        id
    } = req?.query;

    const query = { id };

    console.log(query)

    try {
        const user = await User.findOne(query);
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
    // const {
    //     name,
    //     email,
    //     phone,
    //     password,
    //     role,
    //     createdAt,
    //     profilePic,
    //     info
    // } = req.body;

    const newUser = new User({
        ...req.body
    });

    try {
        const result: any = await newUser.save();
        return res.status(201).send({ ...result._doc, message: 'user created' });
    }
    catch (err: any) {
        return res.status(401).send({ message: err?.code === 11000 ? 'User already exists' : 'Something is wrong' });
    }

})

router.put('/api/user/editUser', async (req: Request, res: Response) => {
    const {
        id
    } = req.query;

    const query = { id };

    console.log({ query, body: req.body })

    try {
        await User.findOneAndUpdate(query, {
            ...req.body
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