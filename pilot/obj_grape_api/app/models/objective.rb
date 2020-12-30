class Objective < ApplicationRecord
  has_many :key_result
  has_many :user, through: :obj_join

  enum status: { 'ongoing' => 0, 'delay' => 1, 'help' => 2, 'complete' => 3 }
end
