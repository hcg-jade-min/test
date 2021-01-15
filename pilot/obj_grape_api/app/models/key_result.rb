class KeyResult < ApplicationRecord
  belongs_to :objective
  has_many :check_ins
  enum kr_status: { 'on_going' => 0, 'check_in_approve_wait' => 1 }
end
