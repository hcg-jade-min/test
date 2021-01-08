module PerformancePlus
  module Entities
    class ApiError < Grape::Entity
      class Error < Grape::Entity
        expose :message, documentation: { type: 'String', example: '잘못된 이름입니다.' }
        expose :code, documentation: { type: 'String', example: '001' }
      end

      private_constant :Error

      expose :errors, using: Error
    end
  end
end
