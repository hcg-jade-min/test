module PerformancePlus
  module Entities
    class KeyResult < Grape::Entity
      expose :id, documentation: { type: 'Integer', desc: 'id', example: 1 }
      expose :kr_name, documentation: { type: 'String', desc: '핵심 성과명', example: '프론트엔드 개발 이해하기' }
      expose :kr_description, documentation: { type: 'String', desc: '핵심 성과 설명',
                                               example: '풀스택 개발자가 되기 위해 프론트 엔드를 이해한다' }
      expose :kr_manage_style, documentation: { type: 'String', desc: '핵심성과 관리 방식(달성률, 절대값, 여부)', example: 1 }
      expose :kr_achievement, documentation: { type: 'Integer', desc: '핵심성과 관리 값', example: 30 }
      expose :kr_status, documentation: { type: 'Integer', desc: '핵심성과 상태', example: 0 }
      expose :objective_id
      expose :check_ins, using: PerformancePlus::Entities::CheckIn
      expose :created_at
      expose :updated_at
    end
  end
end
