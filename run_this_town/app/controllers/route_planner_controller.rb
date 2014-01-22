class RoutePlannerController < ApplicationController
	def new
	end

	def create
		#Build new Route
		@route = RunRoute.new

		#Save info into route
		locDic = params
		@route.user_id = locDic["user_id"]
		@route.name = locDic["name"]
		locDic["locations"].each do |locInfo|
			puts locInfo
			@route.add_new_loc(locInfo[0], locInfo[1], locInfo[2])
		end
		#@route.save
		redirect_to root_path
	end
end
