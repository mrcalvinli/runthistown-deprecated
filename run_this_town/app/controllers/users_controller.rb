class UsersController < ApplicationController
	before_filter :authenticate_user!
	
	def homepage
	end

	def routeplanner
	end

	def show
	    sign_out :user
	    redirect_to root_path
	end
end
