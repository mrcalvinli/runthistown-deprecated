class LandingController < ApplicationController

	def home
	end

	private
	#redirects user if they are logged in
	def logged_in
	  if current_user != nil
	    redirect_to homepage
	  end
	end
end
