class CheckIn < ApplicationRecord
  belongs_to :key_result

  enum ci_status: { 'check_in_wait' => 0 }
end
