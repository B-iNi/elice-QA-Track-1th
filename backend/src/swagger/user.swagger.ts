/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Users API
 *
 * /api/users:
 *   get:
 *     summary: Get users list
 *     description: 유저 명단 조회
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         required: false
 *         default: 10
 *         description: 한 페이지 당 조회되는 데이터의 개수
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         default: 1
 *         description: 조회할 페이지
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *         description: 검색어
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 * /api/users/{userId}:
 *   get:
 *     summary: Get user details by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: Successfully retrieved the user details
 *         headers:
 *           Cache-Control:
 *             description: Prevent caching of the response
 *             schema:
 *               type: string
 *               example: no-store
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 * /api/users/me:
 *   get:
 *     summary: Get the details of the logged-in user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 * /api/users/signup:
 *   post:
 *     summary: Sign up user
 *     description: 유저 회원가입
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               passwordConfirm:
 *                 type: string
 *     responses:
 *       201:
 *         description: You have successfully signed up
 *       400:
 *         description: Bad request
 *       409:
 *         description: User already exists
 * /api/users/login:
 *   post:
 *     summary: Log in user
 *     description: 유저 로그인
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: You have successfully logged in
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: token=<Access Token>; Path=/
 *       403:
 *         description: Incorrect password
 *       404:
 *         description: User not found
 * /api/users/{userId}/schedules:
 *   get:
 *     summary: Get all schedules for a user within a date range
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Start date to filter the schedules
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: End date to filter the schedules
 *     responses:
 *       200:
 *         description: Successfully retrieved the schedules
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   startsAt:
 *                     type: string
 *                     format: date-time
 *                   endsAt:
 *                     type: string
 *                     format: date-time
 *                   owner:
 *                     type: string
 *                   participant:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         participant:
 *                           type: string
 *                         isNecessary:
 *                           type: boolean
 *       400:
 *         description: Invalid date format
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: token
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: objectId
 *           description: 유저 고유 ID
 *         username:
 *           type: string
 *           maxLength: 50
 *           description: 이름
 *         email:
 *           type: string
 *           format: email  
 *           description: 이메일
 *         password:
 *           type: string
 *           description: 비밀번호
 *       required:
 *         - username
 *         - email
 * */
