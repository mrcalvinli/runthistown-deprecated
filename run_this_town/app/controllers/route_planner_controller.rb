class RoutePlannerController < ApplicationController
	def new
	end

	def create
		respond_to do |format|
			#Build new Route
			@route = RunRoute.new

			locDic = params
			@route.user_id = current_user.id
			@route.name = locDic["name"]
			@route.has_ran = false
			@route.distance = locDic["distance"]
			
			#Add in locations into the route
			(0..(locDic["locations"].size - 1)).each do |i|
				locInfo = locDic["locations"][i.to_s]
				p locInfo
				@route.add_new_loc(locInfo[0], locInfo[1], locInfo[2])
			end

			#Save and redirect page
			@route.save
			format.html { redirect_to homepage_path }
			format.json { render json: { :redirect => homepage_url } } 
		end
	end

	def destroy
		puts "tighttight"
		@route = RunRoute.find(params[:route_id])
		@route.destroy
		redirect_to homepage_path
	end
end
