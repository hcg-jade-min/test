module PerformancePlus
  module Entities
    class ObjJoin < Grape::Entity
      expose :id, documentation: { type: 'Integer', desc: 'id', example: 1 }
      expose :role, documentation: { type: 'Integer', desc: '관련 구성원(담당자, 관리자)', example: 0 }
      expose :objective_id, documentation: { type: 'Integer', desc: '목표 아이디', example: 1 }
      expose :user_id, documentation: { type: 'Integer', desc: '유저 아이디', example: 1 }
      expose :created_at
      expose :updated_at
    end
  end
end
