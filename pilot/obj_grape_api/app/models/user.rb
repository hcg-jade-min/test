class User < ApplicationRecord
  has_many :obj_joins
  has_many :objectives, through: :obj_joins
end
