module PerformancePlus
  module Entities
    class KeyResult < Grape::Entity
      expose :name
      expose :description
      expose :manage_style
      expose :achievement
      expose :objective_id
      expose :created_at
      expose :updated_at
    end
  end
end
