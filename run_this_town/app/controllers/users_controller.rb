class UsersController < ApplicationController
	before_filter :authenticate_user!
	
	def homepage
	end


	## EDIT THIS! 
	def update_route
		p params[:route_id]
		#RunRoute.delete(id)
		redirect_to homepage_path
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
