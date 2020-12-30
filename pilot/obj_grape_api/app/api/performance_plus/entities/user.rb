module PerformancePlus
  module Entities
    class User < Grape::Entity
      expose :username
      expose :created_at
      expose :updated_at
    end
  end
end
