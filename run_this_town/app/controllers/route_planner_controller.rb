class RoutePlannerController < ApplicationController
	def new
	end

	def create
		@route = RunRoute.new
		locDic = params
		p locDic
		@route.user_id = locDic["user_id"]
		@route.name = locDic["name"]
		@route.save
	end
end
