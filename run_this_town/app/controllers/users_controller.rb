class UsersController < ApplicationController
	before_filter :authenticate_user!
	
	def homepage
	end

	def routeplanner
	end
end
