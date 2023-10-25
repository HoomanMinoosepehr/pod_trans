class Api::V1::SessionsController < ApplicationController

    def create

        user = User.find_by_email(params[:email])
        if user.present?
            if user.authenticate(params[:password])
                session[:user_id] = user.id
                session[:name] = user.full_name
                render json: { message: "Successfull Log In.", name: user.full_name, id: user.id, status: 200 }
            else
                render json: { message: "Wrong Email or Password.", status: 401 }
            end
        else
            render json: { message: "Wrong Email or Password.", status: 401 }
        end

    end

    def destroy

        session[:user_id] = nil
        session[:name] = nil
        if session[:user_id] == nil
            render json: { message: "You've been successfully logged out.", status: 200 }
        else
            render json: { message: "Something went wrong, try again later!", status: 502 }
        end

    end

end
