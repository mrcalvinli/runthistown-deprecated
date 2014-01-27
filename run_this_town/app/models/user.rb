class User < ActiveRecord::Base
	has_many :run_routes
	has_many :friendships
	has_many :accepted_friendships, :class_name => "Friendship", 
							:conditions => {:state => 'accepted'}
	has_many :requested_friendships, :class_name => "Friendship", 
							:conditions => {:state => 'requested'}
	has_many :pending_friendships, :class_name => "Friendship", 
							:conditions => {:state => 'pending'}
	
	has_many :friends, :through => :accepted_friendships
	has_many :requested_friends, :through => :requested_friendships, :source => :friend
	has_many :pending_friends, :through => :pending_friendships, :source => :friend

	has_attached_file :avatar,
						:url => "/assets/users/:id/:basename.:extension",
						:path => ":rails_root/public/assets/users/:id/:basename.:extension"

	validates_attachment_size :avatar, :less_than => 5.megabytes
	validates_attachment_content_type :avatar, :content_type => ['image/jpeg', 'image/png']

	# Include default devise modules. Others available are:
	# :confirmable, :lockable, :timeoutable and :omniauthable
	devise :database_authenticatable, :registerable,
	     :recoverable, :rememberable, :trackable, :validatable


	def get_name
		return "#{self.first_name} #{self.last_name}"
	end
end
