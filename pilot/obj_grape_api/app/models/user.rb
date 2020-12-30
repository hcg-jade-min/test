class User < ApplicationRecord
  has_many :objective, through: :obj_join
end
