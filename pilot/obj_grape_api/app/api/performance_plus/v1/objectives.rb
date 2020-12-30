module PerformancePlus
  module V1
    class Objectives < Grape::API
      version 'v1', using: :path
      format :json
      prefix :api

      # Objective : index - 모든 목표의 리스트
      resource :objectives do
        desc 'Return list of objectives'
        get do
          objectives = Objective.all
          present objectives
        end
        ###
        # Objective : show - 특정한 목표
        desc 'Return a specific objective'
        route_param :id do
          get do
            objective = Objective.find(params[:id])
            present objective, with: PerformancePlus::Entities::Objective
          end
        end
        ###
        # Objective : create - 새로운 목표 생성
        desc 'Create New Objective'
        params do
          requires :objective, type: Hash do
            requires :name, type: String, desc: 'Name Of New Objective'
            requires :description, type: String, desc: 'Description Of New Objective'
            requires :started_on, type: Date, desc: "The Date Of New Objective's Start"
            requires :ended_on, type: Date, desc: "The Date Of New Objective's End"
            requires :status, type: Integer, desc: 'Status Of Objective'
            requires :achievement, type: Integer, desc: 'How Much Objective Going Is'
          end
        end
        post do
          @objective = Objective.create!(params[:objective])
        end
        ###
        # Objective : update - 목표 수정하기
        desc 'Update A Specific Objective'
        route_param :id do
          params do
            requires :objective, type: Hash do
              requires :name, type: String, desc: 'Name Of The Specific Objective'
              requires :description, type: String, desc: 'Description Of New Objective'
              requires :started_on, type: Date, desc: "The Date Of New Objective's Start"
              requires :ended_on, type: Date, desc: "The Date Of New Objective's End"
              requires :status, type: Integer, desc: 'Status Of Objective'
              requires :achievement, type: Integer, desc: 'How Much Objective Going Is'
            end
          end
          put do
            @objective = Objective.find(params[:id])
            @objective.update(params[:objective])
          end
        end
        ###
        # Objective : delete - 목표 삭제하기
        desc 'Delete A Specific Objective'
        route_param :id do
          delete do
            @objective = Objective.find(params[:id])
            @objective.destroy
          end
        end
        # KeyResult : create - 새로운 핵심 성과 생성
        resource :key_results do
          desc 'Create a key_results.'
          params do
            requires :key_result, type: Hash do
              requires :name, type: String, desc: 'New Key_result.'
              requires :description, type: String, desc: 'Description Of The New Key_result.'
              requires :manage_style, type: Integer, desc: 'Select The Type Of Managing Key_result'
            end
          end
          # KeyResult : 새로운 핵심성과 생성될 때 연관된 목표에 해당 정보 반영하기
          post do
            @objective = Objective.find(params[:id])
            @key_result = KeyResult.new(params[:key_result])
            @key_result = @objective.key_results.create!(params[:key_result])
            @objective.update(achievement + 1)
          end
        end
        ###
      end # end of return a specific book
    end
  end
end
