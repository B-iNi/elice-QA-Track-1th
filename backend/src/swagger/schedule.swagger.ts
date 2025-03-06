/**
 * @swagger
 * tags:
 *   - name: Schedules
 *     description: Schedules API
 * /api/schedules:
 *   post:
 *     summary: Create a new schedule
 *     description: 새로운 일정 생성
 *     tags: [Schedules]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               startsAt:
 *                 type: string
 *                 format: date-time
 *               endsAt:
 *                 type: string
 *                 format: date-time
 *               participantIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: 참가자 user id
 *     responses:
 *       201:
 *         description: Details of created schedule
 *       400:
 *         description: Bad request
 *       403:
 *         description: Unauthorized
 * /api/schedules/{scheduleId}:
 *   get:
 *     summary: Get schedule by ID
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: scheduleId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the schedule
 *     responses:
 *       200:
 *         description: Successfully retrieved schedule
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Schedule not found
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Update a schedule
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: scheduleId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the schedule to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - startsAt
 *               - endsAt
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               startsAt:
 *                 type: string
 *                 format: date-time
 *               endsAt:
 *                 type: string
 *                 format: date-time
 *               participantIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Schedule updated successfully
 *       400:
 *         description: Only the owner can update the schedule or invalid participant ID
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Schedule not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete a schedule
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: scheduleId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the schedule to delete
 *     responses:
 *       200:
 *         description: Schedule deleted successfully
 *       400:
 *         description: Only the owner can delete the schedule
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Schedule not found
 *       500:
 *         description: Internal server error
 * components:
 *   schemas:
 *     Schedule:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: objectId 
 *           description: 일정 고유 ID
 *         title:
 *           type: string
 *           description: 제목
 *         description:
 *           type: string
 *           description: 설명
 *         location:
 *           type: string
 *           description: 장소
 *         startsAt:
 *           type: string
 *           format: date-time  
 *           description: 시작 시간
 *         endsAt:
 *           type: string
 *           format: date-time
 *           description: 종료 시간
 *         owner:
 *           type: string
 *           format: objectId
 *           description: 소유자 ID
 *         participants:
 *           type: array
 *           items:
 *             type: string
 *             format: objectId
 *             description: 참가자 ID
 *       required:
 *         - title
 *         - startsAt
 *         - endsAt
 *         - owner
 *         - participants
 * */
