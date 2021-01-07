module PerformancePlus
  module Entities
    class Objective < Grape::Entity
      expose :id
      expose :name
      expose :description
      expose :started_on
      expose :ended_on
      expose :status
      expose :achievement
      expose :created_at
      expose :updated_at
      expose :key_result, using: PerformancePlus::Entities::KeyResult
    end
  end
end
