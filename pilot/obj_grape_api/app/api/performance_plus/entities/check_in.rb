module PerformancePlus
  module Entities
    class CheckIn < Grape::Entity
      expose :id, documentation: { type: 'Integer', desc: 'id', example: 1 }
      expose :ci_status, documentation: { type: 'Integer', desc: '체크인 상태(체크인 대기중, 체크인 완료, 체크인 거절, 체크인 취소)', example: 1 }
      expose :ci_achievement,
             documentation: { type: 'Integer', desc: '체크인 값', example: 30 }
      expose :created_at
      expose :updated_at
    end
  end
end
