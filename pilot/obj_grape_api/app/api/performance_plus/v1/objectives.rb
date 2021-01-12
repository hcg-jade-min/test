module PerformancePlus
  module V1
    class Objectives < Grape::API
      version 'v1', using: :path
      format :json
      prefix :api

      # Objective : index - 모든 목표의 리스트
      resource :objectives do
        desc '목표 목록 리턴' do
          success PerformancePlus::Entities::Objective
          failure [
            { code: 400, message: 'Bad request', model: PerformancePlus::Entities::ApiError },
            { code: 404, message: 'Not Found', model: PerformancePlus::Entities::ApiError }
          ]
          is_array true
        end
        get do
          objectives = Objective.all
          present objectives, with: PerformancePlus::Entities::Objective
        end
        ###
        # Objective : show - 특정한 목표
        desc '목표 상세 정보 리턴' do
          success PerformancePlus::Entities::Objective
          failure [
            { code: 400, message: 'Bad Request', model: PerformancePlus::Entities::ApiError },
            { code: 404, message: 'Not Found', model: PerformancePlus::Entities::ApiError }
          ]
        end
        route_param :id do
          get do
            objective = Objective.find(params[:id])
            present objective, with: PerformancePlus::Entities::Objective
          end
        end
        ###
        # Objective : create - 새로운 목표 생성
        desc '새로운 목표 생성' do
          success PerformancePlus::Entities::Objective
          failure [
            { code: 400, message: 'Bad Request', model: PerformancePlus::Entities::ApiError },
            { code: 404, message: 'Not Found', model: PerformancePlus::Entities::ApiError }
          ]
        end
        params do
          requires :objective, type: Hash do
            requires :objective_name, type: String, desc: 'Name Of New Objective'
            requires :objective_description, type: String, desc: 'Description Of New Objective'
            requires :started_on, type: Date, desc: "The Date Of New Objective's Start"
            requires :ended_on, type: Date, desc: "The Date Of New Objective's End"
          end
        end
        post do
          @objective = Objective.create!(params[:objective])
        end
        ###
        # Objective : update - 목표 수정하기
        desc '목표 정보 수정하기' do
          success PerformancePlus::Entities::Objective
          failure [
            { code: 400, message: 'Bad Request', model: PerformancePlus::Entities::ApiError },
            { code: 404, message: 'Not Found', model: PerformancePlus::Entities::ApiError }
          ]
        end
        route_param :id do
          params do
            requires :objective, type: Hash do
              requires :objective_name, type: String, desc: 'Name Of The Specific Objective'
              requires :objective_description, type: String, desc: 'Description Of New Objective'
              requires :started_on, type: Date, desc: "The Date Of New Objective's Start"
              requires :ended_on, type: Date, desc: "The Date Of New Objective's End"
            end
          end
          put do
            @objective = Objective.find(params[:id])
            @objective.update(params[:objective])
          end
        end
        ###
        # Objective : delete - 목표 삭제하기
        # desc 'Delete A Specific Objective'
        # route_param :id do
        #   delete do
        #     @objective = Objective.find(params[:id])
        #     @objective.destroy
        #   end
        # end
        # KeyResult : create - 새로운 핵심 성과 생성
        route_param :id do
          resource :key_results do
            desc '새로운 핵심 성과 생성' do
              success PerformancePlus::Entities::KeyResult
              failure [
                { code: 400, message: 'Bad Request', model: PerformancePlus::Entities::ApiError },
                { code: 404, message: 'Not Found', model: PerformancePlus::Entities::ApiError }
              ]
            end
            params do
              requires :key_result, type: Hash do
                requires :kr_name, type: String, desc: 'New Key_result.'
                requires :kr_description, type: String, desc: 'Description Of The New Key_result.'
                requires :kr_manage_style, type: String, desc: 'Select The Type Of Managing Key_result'
              end
            end
            # KeyResult : 새로운 핵심성과 생성될 때 연관된 목표에 해당 정보 반영하기
            post do
              @objective = Objective.find(params[:id])
              @key_result = KeyResult.new(params[:key_result])
              @key_result = @objective.key_result.create!(params[:key_result])
            end

            ###
            desc '핵심 성과 상세 정보 리턴' do
              success PerformancePlus::Entities::KeyResult
              failure [
                { code: 400, message: 'Bad Request', model: PerformancePlus::Entities::ApiError },
                { code: 404, message: 'Not Found', model: PerformancePlus::Entities::ApiError }
              ]
            end
            route_param :id do
              get do
                @objective = Objective.find(params[:id][0])
                @key_result = KeyResult.find(params[:id][1])
                present @key_result, with: PerformancePlus::Entities::KeyResult
              end
            end
            ###

            # KeyResult : update - 핵심 성과 수정
            route_param :id do
              desc '핵심 성과 수정' do
                success PerformancePlus::Entities::KeyResult
                failure [
                  { code: 400, message: 'Bad Request', model: PerformancePlus::Entities::ApiError },
                  { code: 404, message: 'Not Found', model: PerformancePlus::Entities::ApiError }
                ]
              end
              params do
                requires :key_result, type: Hash do
                  requires :kr_name, type: String, desc: 'New Key_result.'
                  requires :kr_description, type: String, desc: 'Description Of The New Key_result.'
                  requires :kr_manage_style, type: String, desc: 'Select The Type Of Managing Key_result'
                end
              end
              put do
                @objective = Objective.find(params[:id][0])
                @key_result = KeyResult.find(params[:id][1])
                @key_result = @objective.key_result.update(params[:key_result])
              end
            end
          end
        end
        ###
      end # end of return a specific book
    end
  end
end
