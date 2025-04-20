const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const port = process.env.port || 3000;
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
  }));
const User = require('./Models/User.js')
const bcrypt = require('bcryptjs');



mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected to Atlas'))
    .catch(err => console.error('MongoDB connection error:', err));


//Login route

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        console.log(user);
        
        if (!user) {
            return res.status(400).json({ message: 'User Not Found ' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
       console.log(isMatch);
        console.log(user.password);
       
        
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Password ' });
        }
        res.status(200).json({ message: 'Login successful', user });
        

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }

})


//SignUp

app.post('/signup', async (req, res) => {
    const { name, email, password, phoneNumber, dateOfBirth } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const existingPhoneNumber = await User.findOne({ phoneNumber });
        if (existingPhoneNumber) {
            return res.status(400).json({ message: 'Phone number already exists' });
        }
        
        const newUser = new User({
            name,
            email,
            password: password,
            phoneNumber,
            dateOfBirth,
        });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
