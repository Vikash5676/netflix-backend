// const authenticateToken = (req, res, next) => {
//     const token = req.header('Authorization');
//     if (!token) return res.status(401).json({ message: 'Unauthorized' });

//     jwt.verify(token, secretKey, (err, user) => {
//         if (err) return res.status(403).json({ message: 'Forbidden' });

//         req.user = user; // Make user information available in the request
//         next();
//     });
// };