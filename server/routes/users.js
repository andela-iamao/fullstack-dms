import usersController from '../controllers/users';
import documentsController from '../controllers/documents';
import auth from '../middlewares/auth';

export default (app) => {
  /**
   * @swagger
   * definitions:
   *   NewUser:
   *     type: object
   *     required:
   *       - firstname
   *       - lastname
   *       - username
   *       - email
   *       - password
   *     properties:
   *       firstname:
   *         type: string
   *         example: Han
   *       lastName:
   *         type: string
   *         example: Solo
   *       userName:
   *         type: string
   *         example: g-pirate
   *       password:
   *         type: string
   *         format: password
   *         example: millenium-falcon
   *       email:
   *         type: string
   *         example: hansolo@documan.api
   *   User:
   *     allOf:
   *       - $ref: '#/definitions/NewUser'
   *       - required:
   *         - id
   *       - properties:
   *         id:
   *           type: integer
   *           format: int64
   *   NewLogin:
   *    type: object
   *    required:
   *      - email or username
   *      - password
   *    properties:
   *      email:
   *        type: string
   *      username:
   *        type: string
   *      password:
   *        type: string
   *        format: password
   *   Login:
   *    allOf:
   *      - $ref: '#/definitions/NewLogin'
   *
   */


   /**
   * @swagger
   * /users:
   *   post:
   *     description: Creates a user
   *     tags:
   *      - Create User
   *     produces:
   *      - application/json
   *     parameters:
   *       - name: body
   *         description: User object
   *         in:  body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/NewUser'
   *     responses:
   *       200:
   *         description: users
   *         schema:
   *          type: object,
   *          items:
   *            $ref: '#/definitions/User'
   */
  app.post('/users', usersController.create);

  /**
   * @swagger
   * /users:
   *    get:
   *      description: Returns all users
   *      tags:
   *        - Get users
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: Authorization
   *          in: header
   *          description: an authorization header
   *          required: true
   *          type: string
   *      responses:
   *        200:
   *          description: users
   *          schema:
   *            type: array
   *            items:
   *              $ref: '#/definitions/User'
   */
  app.get('/users', auth.verifyToken, auth.permitAdmin, usersController.list);

  /**
   * @swagger
   * /users/1:
   *    get:
   *      description: Returns the user with the id of 1
   *      tags:
   *        - Get user
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: Authorization
   *          in: header
   *          description: an authorization header
   *          required: true
   *          type: string
   *      responses:
   *        200:
   *          description: users
   *          schema:
   *            type: array
   *            items:
   *              $ref: '#/definitions/User'
   */
  app.get('/users/:id', auth.verifyToken, usersController.retrieve);

  /**
   * @swagger
   * /users/1:
   *   put:
   *     description: Creates a user
   *     tags:
   *      - Update User
   *     produces:
   *      - application/json
   *     parameters:
   *       - name: Authorization
   *         in: header
   *         description: an authorization header
   *         required: true
   *         type: string
   *       - name: body
   *         description: User object
   *         in:  body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/NewUser'
   *     responses:
   *       200:
   *         description: users
   *         schema:
   *          type: object,
   *          items:
   *            $ref: '#/definitions/User'
   */
  app.put('/users/:id', auth.verifyToken, usersController.update);

  /**
   * @swagger
   * /users/1:
   *    delete:
   *      description: Deletes the user with the id of 1
   *      tags:
   *        - Delete user
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: Authorization
   *          in: header
   *          description: an authorization header
   *          required: true
   *          type: string
   *      responses:
   *        200:
   *          description: users
   *          schema:
   *            type: array
   *            items:
   *              $ref: '#/definitions/User'
   */
  app.delete('/users/:id', auth.verifyToken, usersController.destroy);

  /**
   * @swagger
   * /api/v1/users/1/documents:
   *    get:
   *      description: Returns the documents belonging to the user of id 1
   *      tags:
   *        - Get Documents of A User
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: Authorization
   *          in: header
   *          description: an authorization header
   *          required: true
   *          type: string
   *      responses:
   *        200:
   *          description: user's documents
   *          schema:
   *            type: array
   */
  app.get('/users/:id/documents', auth.verifyToken, documentsController.userDocuments);

  /** @swagger
   *  /users/?limit=4&offset=2:
   *   get:
   *     description: Returns {limit} users from the the {offset}
   *     tags:
   *       - Get users
   *     produces:
   *        - application/json
   *     parameters:
   *        - name: Authorization
   *          in: header
   *          description: an authorization header
   *          required: true
   *          type: string
   *     responses:
   *        200:
   *          description: users
   *          schema:
   *            type: array
   *            items:
   *              $ref: '#/definitions/User'
   */
  app.get('/search/users', auth.verifyToken, usersController.search);

  /**
   * @swagger
   * /users/login:
   *   post:
   *     description: Logs in a user
   *     tags:
   *      - Login User
   *     produces:
   *      - application/json
   *     parameters:
   *       - name: Authorization
   *         in: header
   *         description: an authorization header
   *         required: true
   *         type: string
   *       - name: body
   *         description: User object
   *         in:  body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/NewLogin'
   *     responses:
   *       200:
   *         description: users
   *         schema:
   *          type: object,
   *          items:
   *            $ref: '#/definitions/Login'
   */

  app.post('/users/login', usersController.login);
  app.post('/users/logout', usersController.logout);
};
