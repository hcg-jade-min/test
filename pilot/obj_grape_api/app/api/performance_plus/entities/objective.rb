module PerformancePlus
  module Entities
    class Objective < Grape::Entity
      expose :id, documentation: { type: 'Integer', desc: 'id', example: 1 }
      expose :name, documentation: { type: 'String', desc: 'objective name', example: '풀스택 개발자 되기' }
      expose :description,
             documentation: { type: 'String', desc: 'objective description',
                              example: '풀스택 개발자가 되기 위해 프론트 엔드와 백엔드 모두 섭렵한다' }
      expose :started_on, documentation: { type: 'Date', desc: 'date objective is started on', example: '2021-01-01' }
      expose :ended_on, documentation: { type: 'Date', desc: 'date objective is ended on', example: '2021-01-31' }
      expose :status, documentation: { type: 'Integer', desc: "status objective's process", example: 1 }
      expose :achievement, documentation: { type: 'Integer', desc: 'percentage of objective is achieved', example: 30 }
      expose :created_at
      expose :updated_at
      expose :key_result, using: PerformancePlus::Entities::KeyResult
    end
  end
end
