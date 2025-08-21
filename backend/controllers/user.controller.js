import userModel from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'


const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}


// login
const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await userModel.findOne({email});

        if (!user){
            res.json({
                success:false,
                message:"User doesn't exist"
            })
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if (!isMatch){
            res.json({
                success:false,
                message:"Invalid Password"
            })
        }

        const token = createToken(user._id);
        res.json({
            success:true,
            token,
            message:"Login successful"
        })


    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error while logging in"
        })
    }


}


// register
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists = await userModel.findOne({email});
        if (exists){
            return res.json({
                success:false,
                message:"User already exists"
            })
        }

        if(!validator.isEmail(email)){
            return res.json({
                success:false,
                message:"Enter valid email"
            })
        }

        if (password.length<8){
            return res.json({
                success:false,
                message:"Enter strong password"
            })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword,
        })

        const user = await newUser.save();

        const token = createToken(user._id);
        res.json({
            success:true,
            token,
            message:"User registered successfully"
        })

    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error while registering user"
        })
    }
}

export { loginUser, registerUser }