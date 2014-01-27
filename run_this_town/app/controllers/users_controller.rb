class UsersController < ApplicationController
	before_filter :authenticate_user!
	
	def homepage
		@user = current_user
		@routes = @user.run_route.all
	end


	## EDIT THIS! 
	def destroy_route
		puts "tests"
		@user = current_user
		@route = @user.run_routes.find(params[:route_id])
		@route.destroy
		redirect_to homepage
	end

	def show
	    sign_out :user
	    redirect_to root_path
	end

	#Helper methods 
	def resource_name
	   :user
	 end
	
	 def resource
	   @resource ||= User.new
	 end
	
	 def devise_mapping
	   @devise_mapping ||= Devise.mappings[:user]
	 end
	 
	 def edit
	 end
end
