module PerformancePlus
  module V1
    class Objectives < Grape::API
      version 'v1', using: :path
      format :json
      prefix :api

      resource :objectives do
        desc 'Return list of objectives'
        get do
          objectives = Objective.all
          present objectives
        end
        ###
        desc 'Return a specific objective'
        route_param :id do
          get do
            objective = Objective.find(params[:id])
            present objective, with: PerformancePlus::Entities::Objective
          end
        end
        ###
        resource :key_results do
          desc 'Create a key_results.'
          params do
            requires :key_result, type: Hash do
              requires :name, type: String, desc: 'New Key_result.'
              requires :description, type: String, desc: 'Description Of The New Key_result.'
              requires :manage_style, type: Integer, desc: 'Select The Type Of Managing Key_result'
            end
          end
          post do
            @objective = Objective.find(params[:id])
            @key_result = KeyResult.new(params[:key_result])
            @key_result = @objective.key_results.create!(params[:key_result])
            @Objective.update(achievement + 1)
          end
        end
        ###
      end # end of return a specific book
    end
  end
end
