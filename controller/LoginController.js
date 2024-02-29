import User from "../models/User.js";

class LoginController {
    async login(req, res) {
        let { email, password } = req.body;

        //find user by email
        let findData = await User.findOne({ "email": email });
        if (!findData) {
            return res.status(401).json({ error: 'Email or Password incorrect' });
        }
        else {


            let isMatch = await findData.comparePassword(password)
            if (!isMatch) {
                return res.status(401).send({ error: 'Email or Password incorrect' });
            } else {
                let token = findData.generateToken();
                return res.json({ token: token });
            }
        }
        return res.json({ message: 'Login successfull' });
    }
}

export default LoginController;
