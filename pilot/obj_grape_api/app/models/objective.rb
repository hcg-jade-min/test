class Objective < ApplicationRecord
  has_many :key_results
  has_many :obj_joins
  has_many :users, through: :obj_joins
  has_many :boss_join, -> { where(role: 'boss') }, class_name: :ObjJoin
  has_many :boss, through: :boss_join, source: :user
  has_many :assignee_join, -> { where(role: 'assignee') }, class_name: :ObjJoin
  has_many :assignee, through: :assignee_join, source: :user

  enum objective_status: { 'on_going' => 0, 'edit_approve_wait' => 1, 'ended_approve_wait' => 2, 'end' => 3 }

  accepts_nested_attributes_for :key_results
end
