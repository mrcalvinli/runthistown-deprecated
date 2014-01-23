class RoutePlannerController < ApplicationController
	def new
	end

	def create
		respond_to do |format|
			#Build new Route

			@route = RunRoute.new

			#Save info into route
			locDic = params
			@route.user_id = current_user.id
			@route.name = nil #Add name if needed
			(0..(locDic["locations"].size - 1)).each do |i|
				locInfo = locDic["locations"][i.to_s]
				p locInfo
				@route.add_new_loc(locInfo[0], locInfo[1], locInfo[2])
			end
			@route.save
			format.html { redirect_to homepage_path }
			format.json { render json: { :redirect => homepage_url } } 
		end
	end
end
