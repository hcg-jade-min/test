class ObjJoin < ApplicationRecord
  belongs_to :objective
  belongs_to :user

  enum role: { 'boss' => 0, 'assignee' => 1 }
end
