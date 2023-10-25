class Api::V1::UsersController < ApplicationController

    def create
        
        user = User.new user_params

        if user.save
            render json: { message: "User Created Successfully.", status: 200 }
        else
            render json: { message: user.errors.full_messages, status: 406 }
        end

    end

    def current
        if session[:user_id].present?
            render json: { id: session[:user_id], name: session[:name], status: 200 }
        else
            render json: { status: 401 }
        end
    end

    private

    def user_params
        params.require(:user).permit(
            :first_name,
            :last_name,
            :email,
            :password,
            :password_confirmation
        )
    end

end
