class Objective < ApplicationRecord
  has_many :key_result
  has_many :user, through: :obj_join

  enum status: { 'default' => 0, 'edit_approve_wait' => 1, 'check_in_approve_wait' => 2, 'end_approve_wait' => 3,
                 'end' => 4 }
end
