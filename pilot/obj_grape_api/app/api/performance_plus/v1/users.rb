module PerformancePlus
  module V1
    class Users < Grape::API
      version 'v1', using: :path
      format :json
      prefix :api

      # User : index - 모든 유저의 리스트
      resource :users do
        desc '유저 목록 조회' do
          success PerformancePlus::Entities::User
          failure [
            { code: 400, message: 'Bad Request', model: PerformancePlus::Entities::ApiError },
            { code: 404, message: 'Not Found', model: PerformancePlus::Entities::ApiError }
          ]
        end
        get do
          users = User.all
          present users, with: PerformancePlus::Entities::User
        end
        ###
        # User : show - 특정한 유저
        # desc 'Return a specific user'
        # route_param :id do
        #   get do
        #     user = User.find(params[:id])
        #     present user, with: PerformancePlus::Entities::User
        #   end
        # end
        ###
        # User : create - 새로운 유저 생성
        desc '유저 생성' do
          success PerformancePlus::Entities::User
          failure [
            { code: 400, message: 'Bad request', model: PerformancePlus::Entities::ApiError },
            { code: 404, message: 'Not Found', model: PerformancePlus::Entities::ApiError }
          ]
        end
        params do
          requires :user, type: Hash do
            requires :username, type: String, desc: 'Username Of New User.'
            requires :password, type: String, desc: 'Password Of New User.'
          end
        end
        post do
          # @user = User.create!(params[:user])
          @user = User.new(params[:user])
          cookies[:uid] = @user.id if @user.save
        end
        # User : Login - 아이디, 패스워드 맞으면 통과
        desc '유저 로그인' do
          success PerformancePlus::Entities::User
          failure [
            { code: 400, message: 'Bad request', model: PerformancePlus::Entities::ApiError },
            { code: 404, message: 'Not Found', model: PerformancePlus::Entities::ApiError }
          ]
        end
        params do
          # requires :user, type: Hash do
          requires :username, type: String, desc: 'Check The Username Of User To Login'
          requires :password, type: String, desc: 'Check The Password Of User To Login'
          # end
        end
        post '/login' do
          user = User.find_by!(username: params[:username],
                               password: params[:password])

          cookies[:uid] = {
            value: user.id,
            expires: Time.now + 1.day,
            domain: 'localhost',
            path: '/'
          }
          cookies[:username] = {
            value: user.username,
            expires: Time.now + 1.day,
            domain: 'localhost',
            path: '/'
          }
        end

        desc '유저 로그아웃' do
          success PerformancePlus::Entities::User
          failure [
            { code: 400, message: 'Bad request', model: PerformancePlus::Entities::ApiError },
            { code: 404, message: 'Not Found', model: PerformancePlus::Entities::ApiError }
          ]
        end
        # params do
        #   requires :username, type: String, desc: 'Check The Username Of User To Login'
        #   requires :password, type: String, desc: 'Check The Password Of User To Login'
        # end
        post '/logout' do
          cookies.delete :uid
          cookies.delete :username
        end
      end # end of return a specific user
    end
  end
end
