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
          if cookies['uid']
            user = User.find(cookies['uid'])
            objectives = user.objectives.distinct
            result = []
            objectives.each do |objective|
              result.push(objective) if objective.objective_status != 'end'
            end
            present result, with: PerformancePlus::Entities::Objective
          end
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
          requires :key_result, type: Hash do
            requires :kr_name, type: String, desc: 'New Key_result.'
            requires :kr_description, type: String, desc: 'Description Of The New Key_result.'
            requires :kr_manage_style, type: String, desc: 'Select The Type Of Managing Key_result'
          end
          requires :username1, type: String, desc: '유저1'
          requires :username2, type: String, desc: '유저2'
        end
        post do
          objective = Objective.create!(params[:objective])
          @key_result = objective.key_results.create!(params[:key_result])
          @boss = User.find_by(username: params['username1'])
          @assignee = User.find_by(username: params['username2'])
          objective.obj_joins.create!(role: 0, user_id: @boss.id)
          objective.obj_joins.create!(role: 1, user_id: @assignee.id)
          present objective, with: PerformancePlus::Entities::Objective
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
            requires :key_result, type: Hash do
              requires :kr_name, type: String, desc: 'Key_result to update.'
              requires :kr_description, type: String, desc: 'Description Of The Key_result to update.'
              requires :kr_manage_style, type: String, desc: 'Update The Type Of Managing Key_result'
            end
            # requires :boss, type: Hash do
            #   requires :boss_name, type: String, desc: 'Key_result to update.'
            # end
            # requires :assignee, type: Hash do
            #   requires :assignee_name, type: String, desc: 'Key_result to update.'
            # end
          end
          put do
            objective = Objective.find(params[:id])
            objective.key_results[0].update(params[:key_result])
            objective.update(objective_name: params[:objective][:objective_name],
                             objective_description: params[:objective][:objective_description],
                             started_on: params[:objective][:started_on],
                             ended_on: params[:objective][:ended_on])
            present objective, with: PerformancePlus::Entities::Objective
          end
        end
        # Objective : delete - 목표 아카이브
        desc '목표 아카이브' do
          success PerformancePlus::Entities::Objective
          failure [
            { code: 400, message: 'Bad Request', model: PerformancePlus::Entities::ApiError },
            { code: 404, message: 'Not Found', model: PerformancePlus::Entities::ApiError }
          ]
        end
        route_param :id do
          put '/archives' do
            user = User.find(cookies['uid']) if cookies['uid']
            objective = Objective.find(params[:id])
            boss = objective.boss[0]
            assignee = objective.assignee[0]
            if user.id == boss.id
              objective.update(objective_status: :end)
            elsif user.id == assignee.id
              objective.update(objective_status: :ended_approve_wait)
            end
            present objective, with: PerformancePlus::Entities::Objective
          end
        end
        route_param :id do
          desc '체크인 요청' do
            success PerformancePlus::Entities::CheckIn
            failure [
              { code: 400, message: 'Bad Request', model: PerformancePlus::Entities::ApiError },
              { code: 404, message: 'Not Found', model: PerformancePlus::Entities::ApiError }
            ]
          end
          params do
            requires :objective, type: Hash do
              requires :objective_id, type: Integer, desc: '목표 아이디'
            end
            requires :check_in, type: Hash do
              requires :key_result_id, type: Integer, desc: '핵심성과 아이디'
              requires :ci_value, type: Integer, desc: '체크인 값'
            end
          end
          post '/checkins' do
            user = User.find(cookies['uid']) if cookies['uid']
            @objective = Objective.find(params[:id])
            @key_result = @objective.key_results[0]
            boss = @objective.boss[0]
            assignee = @objective.assignee[0]
            @key_result.check_ins.create!(params[:check_in])
            if user.id == boss.id
              check_in = @key_result.check_ins[0]
              @key_result.update(kr_achievement: check_in.ci_value)
              @objective.update(objective_achievement: check_in.ci_value)
              check_in.destroy
            elsif user.id == assignee.id
              @key_result.check_ins.update(ci_status: :check_in_wait)
              @key_result.update(kr_status: :check_in_approve_wait)
            end
            present check_in, with: PerformancePlus::Entities::CheckIn
          end
          desc '체크인 요청 취소 혹은 체크인 요청 거절' do
            success PerformancePlus::Entities::CheckIn
            failure [
              { code: 400, message: 'Bad Request', model: PerformancePlus::Entities::ApiError },
              { code: 404, message: 'Not Found', model: PerformancePlus::Entities::ApiError }
            ]
          end
          params do
            requires :objective, type: Hash do
              requires :objective_id, type: Integer, desc: '목표 아이디'
            end
          end
          delete '/checkins' do
            @objective = Objective.find(params[:id])
            @key_result = @objective.key_results[0].update(kr_status: :on_going)
            check_in = @objective.key_results[0].check_ins[0]
            check_in.destroy
            present check_in, with: PerformancePlus::Entities::CheckIn
          end
          desc '체크인 승인' do
            success PerformancePlus::Entities::CheckIn
            failure [
              { code: 400, message: 'Bad Request', model: PerformancePlus::Entities::ApiError },
              { code: 404, message: 'Not Found', model: PerformancePlus::Entities::ApiError }
            ]
          end
          params do
            requires :objective, type: Hash do
              requires :objective_id, type: Integer, desc: '목표 아이디'
            end
          end
          put '/checkins/approve' do
            user = User.find(cookies['uid']) if cookies['uid']
            @objective = Objective.find(params[:id])
            @key_result = @objective.key_results[0]
            boss = @objective.boss[0]
            check_in = @key_result.check_ins[0]
            if user.id == boss.id
              @key_result.update(kr_achievement: check_in.ci_value, kr_status: :on_going)
              @objective.update(objective_achievement: check_in.ci_value)
              check_in.destroy
              present check_in, with: PerformancePlus::Entities::CheckIn
            else
              present '권한이 없습니다'
            end
          end
        end
        ###
      end # end of return a specific book
    end
  end
end
