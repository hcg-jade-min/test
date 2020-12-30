# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
obj1 = Objective.create(name: 'Objective1', description: 'objective test1')
obj2 = Objective.create(name: 'Objective2', description: 'objective test2')
obj3 = Objective.create(name: 'Objective3', description: 'objective test3')
obj4 = Objective.create(name: 'Objective4', description: 'objective test4')

k_r1 = KeyResult.create(name: 'Key_result1', description: 'key_result test1')
k_r2 = KeyResult.create(name: 'Key_result2', description: 'key_result test2')
k_r3 = KeyResult.create(name: 'Key_result3', description: 'key_result test3')

user1 = User.create(username: 'user1', password: '1')
user2 = User.create(username: 'user2', password: '1')
user3 = User.create(username: 'user3', password: '1')
