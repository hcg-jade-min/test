class KeyResult < ApplicationRecord
  belongs_to :objective
  has_many :check_in
  enum manage_style: { 'abstract' => 0, 'is_achieved' => 1, 'percentage' => 2 }
end
