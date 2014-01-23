class RoutePlannerController < ApplicationController
	def new
	end

	def create
		respond_to do |format|
			#Build new Route

			@route = RunRoute.new

			#Save info into route
			locDic = params
			@route.user_id = locDic["user_id"]
			@route.name = locDic["name"]
			locDic["locations"].each do |key, locInfo|
				@route.add_new_loc(locInfo[0], locInfo[1], locInfo[2])
			end
			@route.save
			#format.html { redirect_to root_path }
			#format.json { render json: { :redirect => root_url } }
		end
	end
end
