const jsonwebtoken = require('jsonwebtoken');

// const secretKey = 'your_secret_key'; // Replace with your actual secret key
const JWT = {
    // 生成
    generate: (payload: object, expiresIn: string = '100000') => {
        return jsonwebtoken.sign(payload, process.env.SECRETJWT, { expiresIn });
    },
    // 验证
    verify: (token: string) => {
        try {
            return jsonwebtoken.verify(token, process.env.SECRETJWT);
        } catch (err) {
            return null;
        }
    },
}
export default JWT;