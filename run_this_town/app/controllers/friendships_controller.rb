class FriendshipsController < ApplicationController
	def new
	end

	def create
		@user_id = params[:user_id]
		@friend_id = params[:friend_id]

		# TODO: Do other checks for security issues
		unless (@user_id == @friend_id || Friendship.exists?(user_id: @user_id, friend_id: @friend_id))
			Friendship.create(user_id: @user_id, friend_id: @friend_id, state: "requested")
			Friendship.create(user_id: @friend_id, friend_id: @user_id, state: "pending")
		end

		# TODO: Do error messages if friends don't get added
		redirect_to friendships_new_path
	end

	def update
		@user_id = params[:user_id]
		@friend_id = params[:friend_id]

		# TODO: ADD SECURITY CHECK FOR WHO IS ADDING!
		Friendship.accept_one_side(@user_id, @friend_id)
		Friendship.accept_one_side(@friend_id, @user_id)

		redirect_to friendships_new_path
	end

	def destroy
		@user_id = params[:user_id]
		@friend_id = params[:friend_id]

		Friendship.find_by_user_id_and_friend_id(@user_id, @friend_id).destroy
		Friendship.find_by_user_id_and_friend_id(@friend_id, @user_id).destroy

		redirect_to friendships_new_path
	end
end
