# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
obj1 = Objective.create(objective_name: 'Objective1', objective_description: 'objective test1',
                        started_on: '2021-01-01', ended_on: '2021-01-01')
# objective_status: 'default', objective_achievement: 0
obj2 = Objective.create(objective_name: 'Objective2', objective_description: 'objective test2',
                        started_on: '2021-01-01', ended_on: '2021-01-01')
# objective_status: 'default', objective_achievement: 0
# obj3 = Objective.create(objective_name: 'Objective3', objective_description: 'objective test3',
#                         started_on: '2021-01-01', ended_on: '2021-01-01',
#                         objective_status: 'default', objective_achievement: 0)
# obj4 = Objective.create(objective_name: 'Objective4', objective_description: 'objective test4',
#                         started_on: '2021-01-01', ended_on: '2021-01-01',
# objective_status: 'default', objective_achievement: 0)

k_r1 = KeyResult.create(kr_name: 'Key_result1', kr_description: 'key_result test1',
                        # kr_manage_style: 0, kr_achievement: 0, kr_status: 0
                        objective: obj1)
# k_r2 = KeyResult.create(kr_name: 'Key_result2', kr_description: 'key_result test2',
#                         kr_manage_style: 0, kr_achievement: 0, kr_status: 0
#                         objective: obj1)
k_r2 = KeyResult.create(kr_name: 'Key_result3', kr_description: 'key_result test3',
                        # kr_manage_style: 0, kr_achievement: 0, kr_status: 0
                        objective: obj2)

user1 = User.create(username: 'user1', password: '1')
user2 = User.create(username: 'user2', password: '1')

obj_join1 = ObjJoin.create(
  role: 0,
  objective: obj1, user: user1
)
obj_join2 = ObjJoin.create(
  role: 1,
  objective: obj1, user: user1
)
# obj_join3 = ObjJoin.create(
#   role: 1,
#   objective: obj1, user: user2
# )
obj_join4 = ObjJoin.create(
  role: 0,
  objective: obj2, user: user1
)
obj_join5 = ObjJoin.create(
  role: 1,
  objective: obj2, user: user2
)
