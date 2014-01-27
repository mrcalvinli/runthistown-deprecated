class FriendshipsController < ApplicationController
	def new
#		p current_user.friends
	end

	def create
		@user_id = params[:user_id]
		@friend_id = params[:friend_id]

		# TODO: Do other checks for security issues
		unless (@user_id == @friend_id)
			Friendship.create(user_id: @user_id, friend_id: @friend_id, state: "requested")
			Friendship.create(user_id: @friend_id, friend_id: @user_id, state: "pending")
			redirect_to friendships_new_path
		end
	end

	def delete
	end
end
