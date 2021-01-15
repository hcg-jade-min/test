module PerformancePlus
  module Entities
    class User < Grape::Entity
      expose :id, documentation: { type: 'Integer', desc: 'id', example: 1 }
      expose :username, documentation: { type: 'String', desc: 'user name', example: 'username1' }
      expose :created_at
      expose :updated_at
    end
  end
end
