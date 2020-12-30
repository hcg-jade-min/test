module PerformancePlus
  module V1
    class Users < Grape::API
      version 'v1', using: :path
      format :json
      prefix :api

      # User : index - 모든 유저의 리스트
      resource :users do
        desc 'Return list of users'
        get do
          users = User.all
          present users, with: PerformancePlus::Entities::User
        end
        ###
        # User : show - 특정한 유저
        desc 'Return a specific user'
        route_param :id do
          get do
            user = User.find(params[:id])
            present user, with: PerformancePlus::Entities::User
          end
        end
        ###
        # User : create - 새로운 유저 생성
        desc 'Create New User'
        params do
          requires :user, type: Hash do
            requires :username, type: String, desc: 'Username Of New User.'
            requires :password, type: String, desc: 'Password Of New User.'
          end
        end
        post do
          @user = User.create!(params[:user])
        end
        # User : Login - 아이디, 패스워드 맞으면 통과
        desc 'Login User'
        params do
          requires :user, type: Hash do
            requires :username, type: String, desc: 'Check The Username Of User To Login'
            requires :password, type: String, desc: 'Check The Password Of User To Login'
          end
        end
        post 'login' do
          username_to_check = params[:user]['username']
          password_to_check = params[:user]['password']
          if User.where('username' => (params[:user]['username']).to_s)
            username_in_db = User.where('username' => (params[:user]['username']).to_s)[0]['username']
            password_in_db = User.where('username' => (params[:user]['username']).to_s)[0]['password']
          else
            present 'There is no Username'
          end
          if username_to_check == username_in_db && password_to_check == password_in_db
            present 'Login Success'
          else
            present 'Login Failed'
          end
          #   present user_to_check[0]['password'] if user_to_check && (user_to_check[0])
          #   Client.where('locked' => true)
          #   Client.where("orders_count = #{params[:orders]}")
          #   Client.where("orders_count = ?", params[:orders])
          #   present 'ok'
          #   user_to_check = User.find(params[:user])
          #   if user_to_check.username == @user.username && user_to_check.password == @user.password
          #     present true
          #   else
          #     present false
          #   end
        end
      end # end of return a specific user
    end
  end
end
